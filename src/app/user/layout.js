"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { Icon } from "@/components/Icon";
import { useTheme } from "@/components/ThemeAndLayoutProviders";

const SIDEBAR_ITEMS = [
  { label: "Home", href: "/user/overview", icon: "home" },
  { label: "My Stays", href: "/user/stays", icon: "briefcase" }, // Reusing an icon for stays
  { label: "Rewards", href: "/user/rewards", icon: "gift" },
  { label: "My Account", href: "/user/account", icon: "user" },
  { label: "Book a Stay", href: "/user/book", icon: "calendar" },
];

export default function UserLayout({ children }) {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const pathname = usePathname();
  const router = useRouter();
  const { isDark } = useTheme();

  const fetchProfile = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/users/${email}`);
      setUserProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
      } else {
        setSession(session);
        fetchProfile(session.user.email);
      }
    };
    checkSession();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading || !session) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-24 pb-12 ${isDark ? "bg-[#011434]" : "bg-[#F9F8F6]"}`}>
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#8B6B2E] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#011434]" : "bg-[#F9F8F6]"} pt-[120px] pb-24 px-6`}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-[280px] shrink-0">
          <div className={`rounded-xl shadow-sm border p-6 flex flex-col gap-8 ${isDark ? "bg-[#0a1e42] border-gray-800" : "bg-white border-gray-100"}`}>
            
            {/* User Info Header */}
            <div className="flex items-center gap-4">
              {userProfile?.avatarUrl ? (
                <img src={userProfile.avatarUrl} alt="Avatar" className="w-14 h-14 rounded-full border border-gray-100 object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#011434] flex items-center justify-center text-white">
                  <Icon name="user" size={24} />
                </div>
              )}
              <div>
                <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                  {userProfile?.firstName} {userProfile?.lastName}
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{userProfile?.points} pts</p>
              </div>
            </div>
            
            {/* Tier Badge */}
            <div className={`w-full py-2 text-center rounded-md border ${isDark ? "bg-[#8B6B2E]/20 text-[#FCD57B] border-[#8B6B2E]/30" : "bg-[#F9F8F6] text-[#8B6B2E] border-[#E9E4D9]"}`}>
              <span className="text-[10px] font-bold tracking-widest uppercase">
                {userProfile?.tier || "Silver"}
              </span>
            </div>
            
            <div className={`w-full h-px ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />
            
            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
              {SIDEBAR_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#8B6B2E] text-white"
                        : (isDark ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")
                    }`}
                  >
                    <Icon name={item.icon} size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className={`w-full h-px mt-2 ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />
            
            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-medium rounded-lg transition-colors text-left ${isDark ? "text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
            
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
        
      </div>
    </div>
  );
}
