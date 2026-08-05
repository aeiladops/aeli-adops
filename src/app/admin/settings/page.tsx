'use client';

import React from 'react';
import {
  Settings,
  ShieldCheck,
  Database,
  Mail,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  Server,
  Key,
} from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-slate-400" />
          CRM System Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Infrastructure health, database configuration, security policies, and integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security & Authentication */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Security & Authentication</h3>
              <p className="text-[11px] text-slate-400">HTTP-Only JWT Cookie & Server Auth</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">Session Cookie:</span>
              <span className="font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> admin_crm_session (HTTP-Only)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">JWT Algorithm:</span>
              <span className="font-mono text-slate-200">HS256 (jose library)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">Admin User:</span>
              <span className="font-mono text-blue-400">adminvijay</span>
            </div>
          </div>
        </div>

        {/* Database & Storage */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Database & Persistence</h3>
              <p className="text-[11px] text-slate-400">Supabase & Fallback Server Memory</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">Primary Store:</span>
              <span className="font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Supabase Client
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">Tables Configured:</span>
              <span className="font-mono text-slate-200">leads, clients, notes, followups</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">Lead ID Counter:</span>
              <span className="font-mono text-blue-400">AELI-2026-XXXX (Thread-Safe)</span>
            </div>
          </div>
        </div>

        {/* Email Integration */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Email Service (Resend)</h3>
              <p className="text-[11px] text-slate-400">Transactional notifications</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">Resend Status:</span>
              <span className="font-mono text-purple-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active API Key
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">Admin Notification Target:</span>
              <span className="font-mono text-slate-200">admin@aeliadops.com</span>
            </div>
          </div>
        </div>

        {/* Google Sheets Backup */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Google Sheets Backup Sync</h3>
              <p className="text-[11px] text-slate-400">Secondary spreadsheet webhook</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">Webhook Endpoint:</span>
              <span className="font-mono text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Connected (Soft-fail)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-medium">Primary Data Source:</span>
              <span className="font-mono text-emerald-400">Internal CRM Database</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
