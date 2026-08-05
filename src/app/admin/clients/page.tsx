'use client';

import React, { useEffect, useState } from 'react';
import {
  Building2,
  Search,
  RefreshCw,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  Globe,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  FileText,
} from 'lucide-react';
import { ClientRecord, ClientStatus } from '@/src/lib/supabase';

const CLIENT_STATUSES: ClientStatus[] = ['Active', 'On Hold', 'Completed', 'Inactive'];

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/clients');
      const data = await res.json();
      if (data.success) {
        setClients(data.clients || []);
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleUpdateStatus = async (clientId: string, newStatus: ClientStatus) => {
    try {
      const res = await fetch(`/api/admin/clients/${clientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.client) {
        setClients((prev) => prev.map((c) => (c.id === clientId ? data.client : c)));
        if (selectedClient?.id === clientId) setSelectedClient(data.client);
      }
    } catch (err) {
      console.error('Error updating client status:', err);
    }
  };

  const filteredClients = clients.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      c.company.toLowerCase().includes(q) ||
      c.primary_contact.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.website.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q);

    const matchesStatus = !selectedStatus || c.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ClientStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'On Hold':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Completed':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Inactive':
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-emerald-400" />
            Client Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage active publisher partners and converted clients.
          </p>
        </div>

        <button
          onClick={fetchClients}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Clients</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-md">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Company, Contact, Email, Website, Client ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Statuses</option>
            {CLIENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
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

      {/* Clients Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Client ID</th>
                <th className="px-4 py-3.5">Company & Website</th>
                <th className="px-4 py-3.5">Primary Contact</th>
                <th className="px-4 py-3.5">Services</th>
                <th className="px-4 py-3.5">Start Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3.5 font-mono font-bold text-emerald-400">{client.id}</td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-white">{client.company}</div>
                    {client.website && (
                      <a
                        href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>{client.website.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-slate-200 font-medium">{client.primary_contact}</div>
                    <div className="text-[11px] text-slate-400">{client.email}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {client.services.map((svc, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400">{client.start_date}</td>
                  <td className="px-4 py-3.5">
                    <select
                      value={client.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleUpdateStatus(client.id, e.target.value as ClientStatus)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${getStatusBadge(
                        client.status
                      )} bg-slate-950`}
                    >
                      {CLIENT_STATUSES.map((st) => (
                        <option key={st} value={st} className="bg-slate-900 text-slate-200">
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 text-xs font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    No client records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedClient(null)} />

          <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl z-10 p-6 space-y-6 text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-lg text-emerald-400">{selectedClient.id}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${getStatusBadge(
                    selectedClient.status
                  )}`}
                >
                  {selectedClient.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-white">{selectedClient.company}</h3>
                <p className="text-slate-400">{selectedClient.website}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Primary Contact</span>
                  <span className="font-semibold text-white">{selectedClient.primary_contact}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email</span>
                  <span className="font-medium text-blue-400">{selectedClient.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone</span>
                  <span className="font-medium text-white">{selectedClient.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Start Date</span>
                  <span className="font-medium text-white">{selectedClient.start_date}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block mb-2 font-semibold">Active Services</span>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.services.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {selectedClient.original_lead_id && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                  Linked Lead History: <strong className="text-blue-400">{selectedClient.original_lead_id}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
