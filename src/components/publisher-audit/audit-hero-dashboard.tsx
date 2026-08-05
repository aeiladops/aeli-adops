'use client';

import { Activity, BarChart3, CheckCircle2, Globe, Layers, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const AUDIT_METRICS = [
  { id: 'revenue', label: 'Revenue Performance', status: 'Analyzing Inventory', icon: BarChart3, color: 'text-primary-600' },
  { id: 'fill', label: 'Fill Rate', status: 'Checking Unfilled Impressions', icon: Activity, color: 'text-emerald-600' },
  { id: 'viewability', label: 'Viewability', status: 'Reviewing Ad Visibility', icon: CheckCircle2, color: 'text-blue-600' },
  { id: 'placement', label: 'Ad Placement', status: 'Evaluating Layout Balance', icon: Layers, color: 'text-indigo-600' },
  { id: 'technical', label: 'Technical Review', status: 'Checking GAM Delivery', icon: Globe, color: 'text-cyan-600' },
];

export default function AuditHeroDashboard() {
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % AUDIT_METRICS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Glow aura */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-500/20 via-primary-400/10 to-primary-600/20 blur-2xl opacity-60 pointer-events-none" />

      {/* Main Dashboard Card */}
      <div className="relative rounded-3xl border border-secondary/10 bg-white p-6 md:p-8 shadow-2xl space-y-6 overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-secondary/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-3 rounded-full bg-red-400" />
            <div className="flex size-3 rounded-full bg-amber-400" />
            <div className="flex size-3 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-xs font-semibold text-secondary/60">
              publisher-site.com/audit-preview
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
            <span className="flex size-2 rounded-full bg-primary-600 animate-pulse" />
            Live Audit Scan
          </div>
        </div>

        {/* Mock Publisher Website Frame */}
        <div className="space-y-4 rounded-2xl border border-secondary/10 bg-secondary/[0.02] p-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 rounded bg-secondary/15 animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-3 w-12 rounded bg-secondary/10" />
              <div className="h-3 w-12 rounded bg-secondary/10" />
            </div>
          </div>

          {/* Ad Slot Mockup 1 */}
          <div className="relative overflow-hidden rounded-xl border border-dashed border-primary-300 bg-primary-50/50 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary-800">
              <Search className="size-3.5 text-primary-600 animate-spin" />
              Top Leaderboard (728x90) — Scanning Placement
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary-600 bg-white px-2 py-0.5 rounded border border-primary-200">
              Active Review
            </span>
          </div>

          {/* Article Content Mockup */}
          <div className="space-y-2 py-1">
            <div className="h-3.5 w-full rounded bg-secondary/10" />
            <div className="h-3.5 w-4/5 rounded bg-secondary/10" />
            <div className="h-3.5 w-3/4 rounded bg-secondary/10" />
          </div>

          {/* Ad Slot Mockup 2 */}
          <div className="relative overflow-hidden rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              In-Article Rectangle (300x250) — Viewability Diagnostic
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-200">
              Verified
            </span>
          </div>
        </div>

        {/* 5 Audit Categories Scan List */}
        <div className="space-y-2.5 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-secondary/50 flex items-center justify-between">
            <span>Audit Scope Breakdown</span>
            <span>5 Core Pillars</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {AUDIT_METRICS.map((metric, idx) => {
              const IconComp = metric.icon;
              const isActive = activeMetric === idx;
              return (
                <div
                  key={metric.id}
                  className={`flex items-center justify-between rounded-xl border p-3 text-xs font-medium transition-all duration-500 ${
                    isActive
                      ? 'border-primary-500 bg-primary-50/90 shadow-xs ring-1 ring-primary-500/30'
                      : 'border-secondary/10 bg-white text-secondary/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-7 items-center justify-center rounded-lg ${
                        isActive ? 'bg-primary-600 text-white' : 'bg-secondary/5 text-secondary/50'
                      }`}
                    >
                      <IconComp className="size-3.5" />
                    </div>
                    <div>
                      <span className={`font-semibold ${isActive ? 'text-primary-950' : 'text-secondary/80'}`}>
                        {metric.label}
                      </span>
                      <p className="text-[11px] text-secondary/50 leading-tight">
                        {metric.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isActive ? (
                      <span className="flex size-2 rounded-full bg-primary-600 animate-ping" />
                    ) : (
                      <CheckCircle2 className="size-3.5 text-secondary/30" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
