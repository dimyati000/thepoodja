"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { useTheme } from "@/components/ThemeAndLayoutProviders";

export default function BookStayPage() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    dates: "",
    destination: "",
    rooms: "",
    offers: "",
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className={`font-serif text-3xl font-bold tracking-wide mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Book a Stay</h1>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Discover curated stays based on your preferences, favorite destinations, and travel style.</p>
      </div>

      <div className={`rounded-2xl p-8 shadow-sm border flex flex-col gap-6 mt-2 ${isDark ? "bg-[#0a1e42] border-gray-800" : "bg-white border-gray-100"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] tracking-widest uppercase font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Availability</label>
            <div className="relative">
              <input type="text" placeholder="Select dates" className={`px-4 py-3 rounded-lg border text-sm focus:outline-none focus:border-[#8B6B2E] w-full cursor-pointer ${isDark ? "bg-[#011434] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`} readOnly />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="calendar" size={16} />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] tracking-widest uppercase font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Destination</label>
            <div className="relative">
              <select className={`px-4 py-3 rounded-lg border text-sm focus:outline-none focus:border-[#8B6B2E] w-full appearance-none ${isDark ? "bg-[#011434] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-500"}`}>
                <option value="">Select destination</option>
                <option value="canggu">Canggu</option>
                <option value="ubud">Ubud</option>
                <option value="seminyak">Seminyak</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Icon name="chevronDown" size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] tracking-widest uppercase font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>No of Rooms</label>
            <div className="relative">
              <select className={`px-4 py-3 rounded-lg border text-sm focus:outline-none focus:border-[#8B6B2E] w-full appearance-none ${isDark ? "bg-[#011434] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-500"}`}>
                <option value="">Select</option>
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3+ Rooms</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Icon name="chevronDown" size={16} />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className={`text-[10px] tracking-widest uppercase font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Offers</label>
            <div className="relative">
              <select className={`px-4 py-3 pl-10 rounded-lg border text-sm focus:outline-none focus:border-[#8B6B2E] w-full appearance-none ${isDark ? "bg-[#011434] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-500"}`}>
                <option value="">Select offer</option>
                <option value="member">Member Rate</option>
                <option value="early">Early Bird</option>
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6B2E] pointer-events-none">
                <Icon name="gift" size={14} />
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Icon name="chevronDown" size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <button className="px-8 py-2.5 rounded-full bg-[#8B6B2E] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#7a5e28] transition-colors">
            Search
          </button>
          <button className={`px-8 py-2.5 rounded-full border text-xs font-bold tracking-widest uppercase transition-colors ${isDark ? "border-gray-700 text-gray-400 hover:bg-gray-800" : "border-gray-300 text-gray-500 hover:bg-gray-50"}`}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
