'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Building2,
  FileCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Mail,
  Plus,
  RefreshCw,
  Search,
} from 'lucide-react';
import { LeadRecord, ClientRecord, AuditRequestRecord, FollowUpRecord } from '@/src/lib/supabase';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [audits, setAudits] = useState<AuditRequestRecord[]>([]);
  const [followUps, setFollowUps] = useState<FollowUpRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resLeads, resClients, resAudits, resFollowUps] = await Promise.all([
        fetch('/api/admin/leads').then((r) => r.json()),
        fetch('/api/admin/clients').then((r) => r.json()),
        fetch('/api/admin/audits').then((r) => r.json()),
        fetch('/api/admin/followups').then((r) => r.json()),
      ]);

      if (resLeads.success) setLeads(resLeads.leads || []);
      if (resClients.success) setClients(resClients.clients || []);
      if (resAudits.success) setAudits(resAudits.audits || []);
      if (resFollowUps.success) setFollowUps(resFollowUps.followUps || []);
    } catch (err) {
      console.error('Error loading CRM dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const activeClients = clients.filter((c) => c.status === 'Active').length;
  const pendingAudits = audits.filter((a) => a.audit_status !== 'Completed').length;
  const dueFollowups = followUps.filter((f) => !f.completed).length;

  const todayStr = new Date().toISOString().split('T')[0];

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'Medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'New':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Reviewing':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'Contacted':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'Audit In Progress':
      case 'Audit Sent':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Converted':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Closed':
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry and lead pipeline stats for Aeli AdOps.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
          <Link
            href="/admin/leads"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Pipeline</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Leads</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{totalLeads}</span>
            <span className="text-[11px] text-slate-400">records</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">New Leads</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-400">{newLeads}</span>
            <span className="text-[11px] text-blue-400/80 font-medium">needs review</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Clients</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">{activeClients}</span>
            <span className="text-[11px] text-emerald-400/80 font-medium">active partners</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pending Audits</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400">{pendingAudits}</span>
            <span className="text-[11px] text-amber-400/80 font-medium">in progress</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Follow-ups Due</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-purple-400">{dueFollowups}</span>
            <span className="text-[11px] text-purple-400/80 font-medium">pending</span>
          </div>
        </div>
      </div>

      {/* Content Section: Recent Leads & Upcoming Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads Table (Span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Recent Publisher Leads
            </h2>
            <Link
              href="/admin/leads"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
            >
              <span>View all leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3.5">Lead ID</th>
                    <th className="px-4 py-3.5">Publisher</th>
                    <th className="px-4 py-3.5">Website</th>
                    <th className="px-4 py-3.5">Form Source</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Priority</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3.5 font-mono font-semibold text-blue-400 whitespace-nowrap">
                        {lead.id}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-white">{lead.full_name}</div>
                        <div className="text-[11px] text-slate-400">{lead.company || 'Individual'}</div>
                      </td>
                      <td className="px-4 py-3.5 max-w-[150px] truncate">
                        {lead.website ? (
                          <a
                            href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-300 hover:text-blue-400 flex items-center gap-1 truncate"
                          >
                            <span className="truncate">{lead.website.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-400">
                        {lead.form_source}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${getStatusColor(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getPriorityColor(
                            lead.priority
                          )}`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hello ${lead.full_name}, following up from Aeli AdOps regarding your publisher inquiry.`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              title="Chat on WhatsApp"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <a
                            href={`mailto:${lead.email}`}
                            title="Send Email"
                            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && !loading && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                        No publisher leads recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Follow-ups Widget (Span 1) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Upcoming Follow-ups
            </h2>
            <Link
              href="/admin/follow-ups"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              View all
            </Link>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 space-y-3 shadow-lg min-h-[300px]">
            {followUps.filter((f) => !f.completed).length === 0 ? (
              <div className="text-center py-10 space-y-2 text-slate-500">
                <Clock className="w-8 h-8 mx-auto opacity-40 text-purple-400" />
                <p className="text-xs">No pending follow-ups due.</p>
              </div>
            ) : (
              followUps
                .filter((f) => !f.completed)
                .slice(0, 5)
                .map((fu) => {
                  const isToday = fu.date === todayStr;
                  const isOverdue = fu.date < todayStr;
                  return (
                    <div
                      key={fu.id}
                      className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-white truncate">{fu.lead_name}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isToday
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : isOverdue
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}
                        >
                          {isToday ? 'Due Today' : isOverdue ? 'Overdue' : fu.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {fu.note || 'Scheduled follow-up contact.'}
                      </p>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-800/60">
                        <span className="font-mono">{fu.lead_id}</span>
                        <span>{fu.time || '10:00 AM'}</span>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
