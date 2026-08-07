"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { Icon } from "@/components/Icon";
import { useTheme } from "@/components/ThemeAndLayoutProviders";

export default function OverviewPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const res = await axios.get(`http://localhost:5001/api/users/${session.user.email}`);
        setUserProfile(res.data);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading || !userProfile) return null;

  const joinDate = new Date(userProfile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const validUntil = new Date(new Date(userProfile.createdAt).setFullYear(new Date(userProfile.createdAt).getFullYear() + 5)).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div>
        <h1 className={`text-2xl font-serif ${isDark ? "text-white" : "text-[#011434]"}`}>Home</h1>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>Welcome back. Here&apos;s a summary of your membership.</p>
      </div>

      {/* Membership Card */}
      <div className="bg-[#011434] rounded-2xl p-8 text-white shadow-md relative overflow-hidden">
        {/* Subtle background pattern/gradient could go here */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/70 mb-1">MEMBER NUMBER</p>
            <h2 className="text-2xl tracking-widest font-mono mb-4 text-[#FCD57B]">NKL-{userProfile.id.substring(0,8).toUpperCase()}</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCD57B]" />
              <span className="text-xs">{userProfile.tier}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-4">
              <p className="text-[10px] tracking-widest uppercase text-white/70 mb-1">MEMBER SINCE</p>
              <p className="text-sm">{joinDate}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-white/70 mb-1">STATUS VALID UNTIL</p>
              <p className="text-sm">{validUntil}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10 relative z-10 px-8">
          <div className="text-center">
            <p className="text-3xl font-light mb-1">{userProfile.bookings?.length || 0}</p>
            <p className="text-[10px] tracking-widest uppercase text-white/70">Total Stays</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-light mb-1">{userProfile.points}</p>
            <p className="text-[10px] tracking-widest uppercase text-white/70">Lifetime Points</p>
          </div>
        </div>
      </div>

      {/* Year-to-Date Progress */}
      <div className={`rounded-2xl p-8 border ${isDark ? "bg-[#0a1e42] border-gray-800" : "bg-white border-gray-100"}`}>
        <h2 className={`text-center text-xl font-bold tracking-[0.2em] mb-12 uppercase ${isDark ? "text-white" : "text-[#011434]"}`}>
          Your Year-to-Date Progress
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
          {/* Circular Progress Mockup */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#F9F8F6" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E9E4D9" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <p className={`text-xs font-medium ${isDark ? "text-white" : "text-gray-900"}`}>You're on your way to <span className="font-bold">Gold</span></p>
            </div>
            {/* Badges on circle */}
            <div className="absolute -left-2 bottom-6 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
              <Icon name="check" size={14} />
            </div>
            <div className="absolute -right-2 bottom-6 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center shadow-sm">
              <Icon name="lock" size={14} />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center shadow-sm">
              <Icon name="gift" size={14} />
            </div>
          </div>
          
          {/* Qualifying Nights */}
          <div className="border border-gray-200 rounded-xl p-6 w-64 shadow-sm border-t-2 border-t-[#8B6B2E]">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-8 h-8 rounded-full bg-[#F9F8F6] text-[#8B6B2E] flex items-center justify-center mb-3">
                <Icon name="moon" size={14} />
              </div>
              <h3 className={`text-3xl font-serif ${isDark ? "text-white" : "text-[#011434]"}`}>0</h3>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Qualifying Nights</p>
            </div>
            
            <div className={`w-full flex justify-between items-center text-xs pt-4 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}>
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>Progress to next tier</span>
              <span className="font-bold">0%</span>
            </div>
          </div>
        </div>

        {/* Next Tier Banner */}
        <div className={`rounded-xl p-6 border ${isDark ? "bg-[#011434] border-gray-800" : "bg-[#FAF9F7] border-[#E9E4D9]"} flex flex-col gap-4`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> WHAT&apos;S NEXT?
              </p>
              <h4 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Unlock <span className="text-[#8B6B2E]">Gold</span> Privileges</h4>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>You&apos;re on your way. <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>30 more</span> qualifying nights to unlock new experiences, rewards and save more with Gold title.</p>
            </div>
            <div className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center ${isDark ? "bg-[#0a1e42] text-gray-400" : "bg-white text-gray-400"}`}>
              <Icon name="lock" size={16} />
            </div>
          </div>
          
          <div className={`rounded-lg p-4 border shadow-sm flex items-center gap-4 mt-2 ${isDark ? "bg-[#0a1e42] border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="w-10 h-10 rounded-full bg-[#F9F8F6] flex items-center justify-center text-[#8B6B2E]">
              <Icon name="star" size={16} />
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-0.5">FEATURED BENEFIT</p>
              <p className={`text-sm font-bold mb-0.5 ${isDark ? "text-white" : "text-gray-900"}`}>Gold Point 8%</p>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Exclusive benefit available for Gold members.</p>
            </div>
          </div>
          
          <div className={`flex justify-between items-center mt-2 border-t pt-4 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>You&apos;re closer than ever to premium experiences and exclusive rewards.</p>
            <button className="px-5 py-2 rounded-lg bg-[#8B6B2E] text-white text-[10px] font-bold tracking-widest uppercase hover:bg-[#7a5e28] transition-colors">
              See Other Benefits &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
