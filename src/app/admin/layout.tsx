'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/src/components/admin/admin-sidebar';
import { Menu, ShieldCheck } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Login page has its own standalone layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased font-sans">
      {/* Sidebar for Desktop & Drawer for Mobile */}
      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-slate-800 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center p-1.5 rounded-lg bg-blue-600 text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight">Aeli AdOps CRM</span>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
