'use client';

import React, { useEffect, useState } from 'react';
import {
  FileCheck,
  RefreshCw,
  Search,
  ExternalLink,
  Globe,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { AuditRequestRecord, AuditStatus } from '@/src/lib/supabase';

const AUDIT_STATUSES: AuditStatus[] = [
  'Requested',
  'Reviewing',
  'Report Preparing',
  'Report Ready',
  'Sent',
  'Completed',
];

export default function AdminAuditRequestsPage() {
  const [audits, setAudits] = useState<AuditRequestRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const fetchAudits = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/audits');
      const data = await res.json();
      if (data.success) {
        setAudits(data.audits || []);
      }
    } catch (err) {
      console.error('Error fetching audit requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const handleUpdateAudit = async (id: string, audit_status: AuditStatus, assigned_to?: string) => {
    try {
      const res = await fetch('/api/admin/audits', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, audit_status, assigned_to }),
      });
      const data = await res.json();
      if (data.success && data.audit) {
        setAudits((prev) => prev.map((a) => (a.id === id ? data.audit : a)));
      }
    } catch (err) {
      console.error('Error updating audit request:', err);
    }
  };

  const filteredAudits = audits.filter((a) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      a.publisher_name.toLowerCase().includes(q) ||
      (a.company && a.company.toLowerCase().includes(q)) ||
      a.website.toLowerCase().includes(q) ||
      a.lead_id.toLowerCase().includes(q);

    const matchesStatus = !selectedStatus || a.audit_status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AuditStatus) => {
    switch (status) {
      case 'Requested':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Reviewing':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'Report Preparing':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Report Ready':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'Sent':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileCheck className="w-6 h-6 text-blue-400" />
            Free Publisher Audit Requests
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated workflow for managing publisher site audits and GAM reports.
          </p>
        </div>

        <button
          onClick={fetchAudits}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Audits</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-md">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Publisher, Website, Lead ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Audit Statuses</option>
            {AUDIT_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {(searchQuery || selectedStatus) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('');
              }}
              className="text-xs text-red-400 hover:underline px-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Lead ID</th>
                <th className="px-4 py-3.5">Publisher & Company</th>
                <th className="px-4 py-3.5">Website</th>
                <th className="px-4 py-3.5">Pageviews</th>
                <th className="px-4 py-3.5">Current Setup</th>
                <th className="px-4 py-3.5">Submitted Date</th>
                <th className="px-4 py-3.5">Audit Status</th>
                <th className="px-4 py-3.5">Assignee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAudits.map((audit) => (
                <tr key={audit.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-400">{audit.lead_id}</td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-white">{audit.publisher_name}</div>
                    <div className="text-[11px] text-slate-400">{audit.company || '—'}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <a
                      href={audit.website.startsWith('http') ? audit.website : `https://${audit.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span className="truncate max-w-[150px]">{audit.website.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300">{audit.monthly_pageviews}</td>
                  <td className="px-4 py-3.5 text-slate-300 max-w-[150px] truncate">{audit.ad_platform}</td>
                  <td className="px-4 py-3.5 text-slate-400">
                    {new Date(audit.submitted_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <select
                      value={audit.audit_status}
                      onChange={(e) =>
                        handleUpdateAudit(audit.id, e.target.value as AuditStatus, audit.assigned_to)
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${getStatusBadge(
                        audit.audit_status
                      )} bg-slate-950`}
                    >
                      {AUDIT_STATUSES.map((st) => (
                        <option key={st} value={st} className="bg-slate-900 text-slate-200">
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3.5">
                    <input
                      type="text"
                      defaultValue={audit.assigned_to || 'Vijay'}
                      onBlur={(e) => handleUpdateAudit(audit.id, audit.audit_status, e.target.value)}
                      className="w-24 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    />
                  </td>
                </tr>
              ))}

              {filteredAudits.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                    No free publisher audit requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
