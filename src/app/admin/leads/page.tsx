'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Kanban,
  List,
  Plus,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Mail,
  Calendar,
  Clock,
  Building2,
  FileText,
  UserCheck,
  X,
  CheckCircle2,
  AlertCircle,
  Tag,
  Send,
  Globe,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import { LeadRecord, LeadStatus, LeadPriority, FormSource } from '@/src/lib/supabase';

const STATUSES: LeadStatus[] = [
  'New',
  'Reviewing',
  'Contacted',
  'Audit In Progress',
  'Audit Sent',
  'Follow-up',
  'Converted',
  'Closed',
];

const PRIORITIES: LeadPriority[] = ['Low', 'Medium', 'High'];

const SOURCES: FormSource[] = ['Free Publisher Audit', 'Contact Form', 'Service Request'];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('');

  // Selected Lead Modal Drawer
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  // New Note State
  const [newNoteText, setNewNoteText] = useState('');
  const [noteLoading, setNoteLoading] = useState(false);

  // Follow-up Form State inside Drawer
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpTime, setFollowUpTime] = useState('11:00');
  const [followUpNote, setFollowUpNote] = useState('');
  const [followUpLoading, setFollowUpLoading] = useState(false);

  // Convert to Client State
  const [converting, setConverting] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        if (selectedLead?.id === leadId) setSelectedLead(data.lead);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleUpdatePriority = async (leadId: string, newPriority: LeadPriority) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        if (selectedLead?.id === leadId) setSelectedLead(data.lead);
      }
    } catch (err) {
      console.error('Error updating priority:', err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    setNoteLoading(true);

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_note', noteText: newNoteText.trim(), author: 'adminvijay' }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? data.lead : l)));
        setSelectedLead(data.lead);
        setNewNoteText('');
      }
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setNoteLoading(false);
    }
  };

  const handleSetFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !followUpDate) return;
    setFollowUpLoading(true);

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          next_follow_up: {
            date: followUpDate,
            time: followUpTime,
            note: followUpNote,
          },
          status: selectedLead.status === 'New' ? 'Contacted' : selectedLead.status,
        }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? data.lead : l)));
        setSelectedLead(data.lead);
        alert('Follow-up scheduled successfully!');
      }
    } catch (err) {
      console.error('Error setting follow-up:', err);
    } finally {
      setFollowUpLoading(false);
    }
  };

  const handleConvertToClient = async () => {
    if (!selectedLead) return;
    if (!confirm(`Are you sure you want to convert ${selectedLead.full_name} (${selectedLead.company || 'Lead'}) to an active client?`))
      return;

    setConverting(true);
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'convert_to_client' }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? data.lead : l)));
        setSelectedLead(data.lead);
        alert(`Successfully converted into Client Record: ${data.client.id}!`);
      }
    } catch (err) {
      console.error('Error converting lead:', err);
    } finally {
      setConverting(false);
    }
  };

  // Drag and Drop handlers for Kanban
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: LeadStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      handleUpdateStatus(leadId, targetStatus);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      lead.full_name.toLowerCase().includes(q) ||
      (lead.company && lead.company.toLowerCase().includes(q)) ||
      lead.website.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.id.toLowerCase().includes(q);

    const matchesStatus = !selectedStatus || lead.status === selectedStatus;
    const matchesPriority = !selectedPriority || lead.priority === selectedPriority;
    const matchesSource = !selectedSource || lead.form_source === selectedSource;

    return matchesSearch && matchesStatus && matchesPriority && matchesSource;
  });

  const getPriorityBadgeClass = (p: string) => {
    switch (p) {
      case 'High':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'Medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-blue-400" />
            Lead Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage incoming publisher inquiries across Kanban and List views.
          </p>
        </div>

        {/* View Toggle & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'kanban'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          <button
            onClick={fetchLeads}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search & Filtering Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name, Company, Website, Email, Lead ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Priorities</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p} Priority
              </option>
            ))}
          </select>

          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Sources</option>
            {SOURCES.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>

          {(searchQuery || selectedStatus || selectedPriority || selectedSource) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('');
                setSelectedPriority('');
                setSelectedSource('');
              }}
              className="text-xs text-red-400 hover:underline px-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main View: Kanban or List */}
      {viewMode === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-6 min-h-[600px] scrollbar-thin">
          {STATUSES.map((status) => {
            const statusLeads = filteredLeads.filter((l) => l.status === status);
            return (
              <div
                key={status}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
                className="w-72 shrink-0 flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800/80 p-3 space-y-3"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="font-bold text-xs text-slate-200">{status}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold border border-slate-700">
                    {statusLeads.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[700px] pr-1">
                  {statusLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      onClick={() => {
                        setSelectedLead(lead);
                        setFollowUpDate(lead.next_follow_up?.date || '');
                        setFollowUpTime(lead.next_follow_up?.time || '11:00');
                        setFollowUpNote(lead.next_follow_up?.note || '');
                      }}
                      className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-blue-500/50 shadow-md cursor-pointer transition-all space-y-3 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-blue-400 text-[11px]">{lead.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-semibold border ${getPriorityBadgeClass(
                            lead.priority
                          )}`}
                        >
                          {lead.priority}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-xs text-white group-hover:text-blue-300 transition-colors">
                          {lead.full_name}
                        </h3>
                        <p className="text-[11px] text-slate-400 truncate">{lead.company || 'Individual Publisher'}</p>
                      </div>

                      {lead.website && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
                          <Globe className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{lead.website.replace(/^https?:\/\//, '')}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                        <span>{lead.form_source}</span>
                        <span>{new Date(lead.date_created).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}

                  {statusLeads.length === 0 && (
                    <div className="h-28 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-600 text-xs">
                      Drop lead here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Lead ID</th>
                  <th className="px-4 py-3.5">Publisher Name</th>
                  <th className="px-4 py-3.5">Company / Website</th>
                  <th className="px-4 py-3.5">Form Source</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Priority</th>
                  <th className="px-4 py-3.5">Created Date</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => {
                      setSelectedLead(lead);
                      setFollowUpDate(lead.next_follow_up?.date || '');
                      setFollowUpTime(lead.next_follow_up?.time || '11:00');
                      setFollowUpNote(lead.next_follow_up?.note || '');
                    }}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3.5 font-mono font-bold text-blue-400">{lead.id}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-white">{lead.full_name}</div>
                      <div className="text-[11px] text-slate-400">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-slate-200">{lead.company || '—'}</div>
                      <div className="text-[11px] text-blue-400/80 truncate max-w-[160px]">{lead.website}</div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-400">{lead.form_source}</td>
                    <td className="px-4 py-3.5">
                      <select
                        value={lead.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-950 border border-slate-800 text-slate-200"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={lead.priority}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleUpdatePriority(lead.id, e.target.value as LeadPriority)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getPriorityBadgeClass(
                          lead.priority
                        )} bg-transparent`}
                      >
                        {PRIORITIES.map((p) => (
                          <option key={p} value={p} className="bg-slate-900 text-slate-200">
                            {p} Priority
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3.5 text-slate-400">
                      {new Date(lead.date_created).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                          setFollowUpDate(lead.next_follow_up?.date || '');
                          setFollowUpTime(lead.next_follow_up?.time || '11:00');
                          setFollowUpNote(lead.next_follow_up?.note || '');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-500/20 text-xs font-medium transition-colors"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                      No leads matching filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD PROFILE DRAWER / MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedLead(null)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-2xl h-full bg-slate-950 border-l border-slate-800 shadow-2xl z-10 flex flex-col overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-lg text-blue-400">{selectedLead.id}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${getPriorityBadgeClass(
                    selectedLead.priority
                  )}`}
                >
                  {selectedLead.priority} Priority
                </span>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {selectedLead.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto text-xs text-slate-300">
              {/* Quick Actions Bar */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <p className="font-semibold text-white">Quick Actions</p>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Publisher</span>
                  </a>

                  {selectedLead.phone && (
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${selectedLead.full_name}, following up from Aeli AdOps regarding your publisher inquiry (Ref: ${selectedLead.id}).`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {selectedLead.website && (
                    <a
                      href={
                        selectedLead.website.startsWith('http')
                          ? selectedLead.website
                          : `https://${selectedLead.website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Visit Website</span>
                    </a>
                  )}

                  {selectedLead.status !== 'Converted' && (
                    <button
                      onClick={handleConvertToClient}
                      disabled={converting}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Convert to Client</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Publisher & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-white flex items-center gap-2 text-xs">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" /> Publisher Profile
                  </h4>
                  <div className="space-y-1 text-slate-300">
                    <p>
                      <strong className="text-slate-400">Name:</strong> {selectedLead.full_name}
                    </p>
                    <p>
                      <strong className="text-slate-400">Company:</strong>{' '}
                      {selectedLead.company || 'Not Specified'}
                    </p>
                    <p>
                      <strong className="text-slate-400">Website:</strong>{' '}
                      <a
                        href={
                          selectedLead.website?.startsWith('http')
                            ? selectedLead.website
                            : `https://${selectedLead.website}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline"
                      >
                        {selectedLead.website}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-white flex items-center gap-2 text-xs">
                    <Mail className="w-3.5 h-3.5 text-purple-400" /> Contact Details
                  </h4>
                  <div className="space-y-1 text-slate-300">
                    <p>
                      <strong className="text-slate-400">Email:</strong> {selectedLead.email}
                    </p>
                    <p>
                      <strong className="text-slate-400">Phone:</strong> {selectedLead.phone || 'N/A'}
                    </p>
                    <p>
                      <strong className="text-slate-400">Preferred Method:</strong>{' '}
                      {selectedLead.preferred_contact_method || 'Email'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Publisher Metrics & Request Info */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="font-semibold text-white text-xs flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-amber-400" /> Request Details & Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Form Source</span>
                    <span className="font-medium text-white">{selectedLead.form_source}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Monthly Pageviews</span>
                    <span className="font-medium text-white">
                      {selectedLead.monthly_pageviews || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Category</span>
                    <span className="font-medium text-white">
                      {selectedLead.website_category || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Current Ad Platform</span>
                    <span className="font-medium text-white">
                      {selectedLead.current_ad_platform || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Audience Geo</span>
                    <span className="font-medium text-white">
                      {selectedLead.audience_geography || 'Global'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Service Requested</span>
                    <span className="font-medium text-white">
                      {selectedLead.service_requested || 'General'}
                    </span>
                  </div>
                </div>

                {selectedLead.requirements && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-500 block mb-1">Requirements / Areas to Improve</span>
                    <p className="p-2.5 rounded-lg bg-slate-950 text-slate-200">
                      {selectedLead.requirements}
                    </p>
                  </div>
                )}

                {selectedLead.additional_info && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-500 block mb-1">Additional Information</span>
                    <p className="p-2.5 rounded-lg bg-slate-950 text-slate-200">
                      {selectedLead.additional_info}
                    </p>
                  </div>
                )}
              </div>

              {/* Follow-Up Scheduling */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="font-semibold text-white text-xs flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Schedule Follow-up
                </h4>
                <form onSubmit={handleSetFollowUp} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Date</label>
                      <input
                        type="date"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Time</label>
                      <input
                        type="time"
                        value={followUpTime}
                        onChange={(e) => setFollowUpTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Follow-up Note</label>
                    <input
                      type="text"
                      value={followUpNote}
                      onChange={(e) => setFollowUpNote(e.target.value)}
                      placeholder="e.g. Call publisher to discuss audit proposal..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={followUpLoading}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Save Follow-up
                  </button>
                </form>
              </div>

              {/* Private Internal Notes */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h4 className="font-semibold text-white text-xs flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-purple-400" /> Private Internal Notes
                </h4>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add private note (e.g. Reviewed website. GAM floor rules need optimization)..."
                    className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={noteLoading || !newNoteText.trim()}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Add Note
                  </button>
                </form>

                {/* Notes History */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {selectedLead.notes && selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((note) => (
                      <div key={note.id} className="p-3 rounded-lg bg-slate-950 border border-slate-900 space-y-1">
                        <p className="text-slate-200">{note.text}</p>
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>Author: {note.author}</span>
                          <span>{new Date(note.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-xs text-center py-2">No internal notes yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
