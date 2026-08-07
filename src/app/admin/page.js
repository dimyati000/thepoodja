"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVillas: 0,
    activeSliders: 0,
    pendingBookings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admins/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-[#8B6B2E] pointer-events-none">
          <Icon name="home" size={120} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Welcome to Poodja Portal</h2>
          <p className="text-gray-500 text-sm max-w-md leading-relaxed">
            Manage your premium properties, hero sliders, and oversee booking activities from this centralized dashboard.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B6B2E]/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Total Users</h3>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-black text-gray-900">{stats.totalUsers}</p>
            <Link href="/admin/users" className="text-sm font-medium text-[#8B6B2E] hover:underline flex items-center gap-1">
              Manage <Icon name="chevronRight" size={14} />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B6B2E]/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Total Villas</h3>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-black text-gray-900">{stats.totalVillas}</p>
            <Link href="/admin/villas" className="text-sm font-medium text-[#8B6B2E] hover:underline flex items-center gap-1">
              Manage <Icon name="chevronRight" size={14} />
            </Link>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B6B2E]/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Active Sliders</h3>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-black text-gray-900">{stats.activeSliders}</p>
            <Link href="/admin/sliders" className="text-sm font-medium text-[#8B6B2E] hover:underline flex items-center gap-1">
              Manage <Icon name="chevronRight" size={14} />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B6B2E]/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pending Bookings</h3>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-black text-gray-900">{stats.pendingBookings}</p>
            <Link href="/admin/bookings" className="text-sm font-medium text-[#8B6B2E] hover:underline flex items-center gap-1">
              Manage <Icon name="chevronRight" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
