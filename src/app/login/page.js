"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [view, setView] = useState("default"); // 'default' | 'email'
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // Will redirect back and Navbar syncs the user
      },
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      setMessage("Check your email for the login link!");
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#011434]">
      {/* Left Side - Visual & Copy */}
      <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex flex-col justify-center px-12 md:px-24 py-12 z-10 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000"
            alt="Villa Pool"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#011434]/95 via-[#011434]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-lg text-white">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 tracking-wide">Poodja Rewards</h1>
          <h2 className="text-3xl md:text-4xl font-serif text-[#FCD57B] italic mb-8">
            Member rates start<br />the moment you sign in
          </h2>
          <p className="text-sm text-gray-300 mb-10 leading-relaxed font-light">
            Create your account to start enjoying exclusive member rates and rewards from your very first stay
          </p>

          <ul className="space-y-5 mb-16">
            {[
              "Complimentary Breakfast",
              "1x Free Airport Pick-up (Min 4 Nights, IDR 20M)",
              "Best Rate Guaranteed",
              "Flexible Rewards Redemption",
              "Exclusive Member Rewards",
            ].map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-[#FCD57B] mt-1">✦</span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="pl-4 border-l border-[#FCD57B]/30">
            <p className="text-xs text-gray-400 italic">"Your journey with Poodja starts here."</p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10 bg-[#f9f8f6] md:bg-transparent md:backdrop-blur-sm">
        <div className="bg-[#f9f8f6] w-full max-w-md rounded-[2rem] p-10 md:p-12 shadow-2xl relative">
          
          {view === "default" ? (
            <div className="flex flex-col text-center transition-all duration-300">
              <h2 className="text-3xl font-serif text-[#011434] mb-3">Welcome</h2>
              <p className="text-xs text-gray-500 mb-10">Sign in to access exclusive benefits</p>

              <button
                onClick={handleGoogleLogin}
                className="w-full py-4 px-6 flex items-center justify-center gap-4 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm mb-4 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
                <span className="absolute right-12 text-[9px] font-bold tracking-widest text-[#8B6B2E] uppercase bg-[#8B6B2E]/10 px-2 py-0.5 rounded">Quick</span>
              </button>

              <button
                onClick={() => setView("email")}
                className="w-full py-4 px-6 flex items-center justify-center gap-3 bg-transparent border border-gray-200 rounded-xl text-gray-700 text-sm font-semibold hover:bg-black/5 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email
              </button>

              <p className="text-[10px] text-gray-400 mt-8 leading-relaxed max-w-[280px] mx-auto">
                Lower price and rewards are waiting. Unlock them by logging in!
              </p>

              <div className="w-full h-px bg-gray-200 my-8" />
              
              <div className="text-center">
                <p className="text-[9px] text-gray-400 max-w-[250px] mx-auto mb-6">
                  By continuing, you agree to our Terms & Conditions and acknowledge our Privacy Notice.
                </p>
                <Link href="/" className="text-xs font-bold text-[#8B6B2E] tracking-widest uppercase hover:text-[#7a5e28] transition-colors cursor-pointer">
                  Browse as a guest
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col transition-all duration-300">
              <button 
                onClick={() => { setView("default"); setMessage(null); }}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 mb-8 w-fit transition-colors cursor-pointer"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <h2 className="text-2xl font-serif text-[#011434] mb-2">Enter Details</h2>
              <p className="text-xs text-gray-500 mb-8">Enter your email to receive a secure login link</p>

              <form onSubmit={handleEmailLogin} className="flex flex-col gap-8">
                <div className="relative border-b border-gray-300 focus-within:border-[#8B6B2E] transition-colors pb-2">
                  <label className="text-[9px] font-bold tracking-widest uppercase text-[#8B6B2E] mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-transparent text-sm text-[#011434] focus:outline-none placeholder-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#d9cbb2] hover:bg-[#c9b798] text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {loading ? "Sending..." : "Continue"}
                </button>
              </form>

              {message && (
                <div className={`mt-6 p-4 rounded-lg text-xs font-medium text-center ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                  {message}
                </div>
              )}

              <p className="text-[10px] text-gray-400 mt-8 leading-relaxed text-center">
                We'll send you a verification link to confirm your identity.
              </p>

              <div className="w-full h-px bg-gray-200 my-8" />
              
              <div className="text-center">
                <p className="text-[9px] text-gray-400 max-w-[250px] mx-auto mb-6">
                  By continuing, you agree to our Terms & Conditions and acknowledge our Privacy Notice.
                </p>
                <Link href="/" className="text-xs font-bold text-[#8B6B2E] tracking-widest uppercase hover:text-[#7a5e28] transition-colors cursor-pointer">
                  Browse as a guest
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
