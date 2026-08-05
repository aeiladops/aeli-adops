'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import logo from '@/public/images/logo/aeli-logo-icon.png';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  Building2,
  Clock,
  FileCheck,
  Wrench,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Clients', href: '/admin/clients', icon: Building2 },
  { name: 'Follow-ups', href: '/admin/follow-ups', icon: Clock },
  { name: 'Audit Requests', href: '/admin/audit-requests', icon: FileCheck },
  { name: 'Service Requests', href: '/admin/service-requests', icon: Wrench },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    router.push('/admin/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-100 border-r border-slate-800">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <figure className="relative size-9 overflow-hidden rounded-full ring-2 ring-blue-500/30 shadow-md">
            <Image src={logo} alt="Aeli AdOps" fill className="object-cover" priority />
          </figure>
          <div>
            <span className="font-bold text-sm tracking-tight text-white block">Aeli AdOps</span>
            <span className="text-[10px] text-blue-400 font-medium tracking-wider uppercase">Internal CRM Admin</span>
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Management
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-blue-400" />}
            </Link>
          );
        })}
      </div>

      {/* User Info & Logout Footer */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
            AV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">adminvijay</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Authenticated
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen fixed left-0 top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative w-64 max-w-full h-full shadow-2xl z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
