"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "home" },
  { label: "Master Users", href: "/admin/users", icon: "users" },
  { label: "Master Bookings", href: "/admin/bookings", icon: "calendar" },
  { label: "Master Admins", href: "/admin/admins", icon: "users" },
  { label: "Master Villas", href: "/admin/villas", icon: "home" },
  { label: "Master Sliders", href: "/admin/sliders", icon: "image" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  const isLoginPage = pathname === '/admin/login';

  const checkAuth = async (currentSession) => {
    try {
      // 1. Check local token first (Email/Password)
      const localToken = localStorage.getItem("admin_token");
      const localEmail = localStorage.getItem("admin_email");
      
      if (localToken && localEmail) {
        setSession({ type: 'local' });
        setAdminEmail(localEmail);
        setLoading(false);
        if (isLoginPage) router.push('/admin');
        return;
      }

      // 2. If no local token, check Supabase session (Google OAuth)
      if (currentSession) {
        // Intercept: Verify with backend
        try {
          await axios.post("http://localhost:5001/api/auth/verify-google", { 
            email: currentSession.user.email 
          });
          setSession(currentSession);
          setAdminEmail(currentSession.user.email);
          setLoading(false);
          if (isLoginPage) router.push('/admin');
        } catch (err) {
          // Unauthorized email
          alert("This Google account is not registered as an Admin.");
          await supabase.auth.signOut();
          setSession(null);
          setLoading(false);
          if (!isLoginPage) router.push('/admin/login');
        }
        return;
      }

      // No auth at all
      setSession(null);
      setLoading(false);
      if (!isLoginPage) router.push('/admin/login');

    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAuth(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAuth(session);
    });

    return () => subscription.unsubscribe();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    await supabase.auth.signOut();
    setSession(null);
    router.push('/admin/login');
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  if (!session && !isLoginPage) return null; 
  if (isLoginPage) return <>{children}</>;

  const displayEmail = adminEmail ? adminEmail.split('@')[0] : "Admin";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
        <div className="p-6 pb-2">
          <Link href="/">
            <img src="/logo-black2.png" alt="Poodja Admin" className="h-8 object-contain" />
          </Link>
        </div>

        {/* Profile Section like in reference */}
        <div className="px-6 py-6 border-b border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#8B6B2E]/10 flex items-center justify-center text-[#8B6B2E]">
            <Icon name="user" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Hi!</span>
            <span className="text-sm font-bold text-gray-900 truncate w-32" title={adminEmail}>
              {displayEmail}
            </span>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</span>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
                  isActive 
                    ? "bg-[#8B6B2E] text-white font-medium shadow-md shadow-[#8B6B2E]/20" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden flex flex-col">
        {/* Page Content */}
        <div className="p-6 md:p-10 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
