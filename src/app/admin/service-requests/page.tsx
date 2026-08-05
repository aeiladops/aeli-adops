'use client';

import React, { useEffect, useState } from 'react';
import { Wrench, RefreshCw, Search, ExternalLink, Globe, Calendar } from 'lucide-react';
import { LeadRecord } from '@/src/lib/supabase';

export default function AdminServiceRequestsPage() {
  const [serviceLeads, setServiceLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchServiceLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads?source=Service Request');
      const data = await res.json();
      if (data.success) {
        setServiceLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Error fetching service requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceLeads();
  }, []);

  const filtered = serviceLeads.filter((l) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      l.full_name.toLowerCase().includes(q) ||
      l.website.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q) ||
      (l.service_requested && l.service_requested.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Wrench className="w-6 h-6 text-indigo-400" />
            Service Inquiries
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publisher requests submitted for yield optimization, GAM setups, and tech support.
          </p>
        </div>

        <button
          onClick={fetchServiceLeads}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Publisher, Website, Service, Lead ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Lead ID</th>
                <th className="px-4 py-3.5">Publisher Name</th>
                <th className="px-4 py-3.5">Website</th>
                <th className="px-4 py-3.5">Service Requested</th>
                <th className="px-4 py-3.5">Ad Platform</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-indigo-400">{lead.id}</td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-white">{lead.full_name}</div>
                    <div className="text-[11px] text-slate-400">{lead.email}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <a
                      href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span className="truncate max-w-[150px]">{lead.website.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="px-4 py-3.5 text-white font-medium">{lead.service_requested}</td>
                  <td className="px-4 py-3.5 text-slate-400">{lead.current_ad_platform || 'N/A'}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400">
                    {new Date(lead.date_created).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    No service requests found.
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
