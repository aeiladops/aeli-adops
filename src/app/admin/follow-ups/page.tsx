'use client';

import React, { useEffect, useState } from 'react';
import {
  Clock,
  RefreshCw,
  MessageSquare,
  Mail,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Users,
} from 'lucide-react';
import { FollowUpRecord } from '@/src/lib/supabase';

export default function AdminFollowUpsPage() {
  const [followUps, setFollowUps] = useState<FollowUpRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'overdue' | 'completed'>('today');

  const fetchFollowUps = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/followups');
      const data = await res.json();
      if (data.success) {
        setFollowUps(data.followUps || []);
      }
    } catch (err) {
      console.error('Error fetching follow-ups:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  const dueToday = followUps.filter((f) => !f.completed && f.date === todayStr);
  const upcoming = followUps.filter((f) => !f.completed && f.date > todayStr);
  const overdue = followUps.filter((f) => !f.completed && f.date < todayStr);
  const completed = followUps.filter((f) => f.completed);

  const getActiveList = () => {
    switch (activeTab) {
      case 'today':
        return dueToday;
      case 'upcoming':
        return upcoming;
      case 'overdue':
        return overdue;
      case 'completed':
        return completed;
    }
  };

  const activeList = getActiveList();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-purple-400" />
            Follow-up System
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track and manage publisher follow-up schedules.
          </p>
        </div>

        <button
          onClick={fetchFollowUps}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'today'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <span>Due Today</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 text-[10px]">
            {dueToday.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <span>Upcoming</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300 text-[10px]">
            {upcoming.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('overdue')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'overdue'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <span>Overdue</span>
          <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 text-[10px]">
            {overdue.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'completed'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <span>Completed</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px]">
            {completed.length}
          </span>
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeList.map((fu) => (
          <div
            key={fu.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-blue-400 text-xs">{fu.lead_id}</span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                {fu.date} {fu.time && `@ ${fu.time}`}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-white">{fu.lead_name}</h3>
              <p className="text-xs text-slate-400">{fu.lead_company || 'Individual Publisher'}</p>
            </div>

            <p className="p-3 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-300">
              {fu.note || 'Scheduled follow-up contact.'}
            </p>
          </div>
        ))}

        {activeList.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500/40" />
            <p className="text-xs">No follow-ups in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
