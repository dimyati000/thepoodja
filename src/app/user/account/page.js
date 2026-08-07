"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { useTheme } from "@/components/ThemeAndLayoutProviders";

export default function AccountPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    nationality: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const res = await axios.get(`/api/users/${session.user.email}`);
        setUserProfile(res.data);
        setFormData({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          dob: res.data.dob ? new Date(res.data.dob).toISOString().split('T')[0] : "",
          gender: res.data.gender || "",
          nationality: res.data.nationality || "",
          phone: res.data.phone || "",
        });
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/users/${userProfile.email}`, formData);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile) return null;

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div>
        <h1 className={`text-2xl font-serif ${isDark ? "text-white" : "text-[#011434]"}`}>My Account</h1>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>Manage your personal information and preferences.</p>
      </div>

      {/* Navigation Tabs */}
      <div className={`flex gap-6 mt-2 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
        <button className={`pb-3 border-b-2 text-sm font-bold ${isDark ? "border-white text-white" : "border-gray-900 text-gray-900"}`}>Personal Information</button>
        <button className={`pb-3 border-b-2 border-transparent text-sm font-medium text-gray-400 ${isDark ? "hover:text-gray-200" : "hover:text-gray-600"}`}>Point Transaction</button>
        <button className={`pb-3 border-b-2 border-transparent text-sm font-medium text-gray-400 ${isDark ? "hover:text-gray-200" : "hover:text-gray-600"}`}>Session History</button>
        <button className={`pb-3 border-b-2 border-transparent text-sm font-medium text-gray-400 ${isDark ? "hover:text-gray-200" : "hover:text-gray-600"}`}>Support</button>
      </div>

      {/* Profile Header */}
      <div className={`rounded-2xl p-6 shadow-sm border flex justify-between items-center mt-2 ${isDark ? "bg-[#0a1e42] border-gray-800" : "bg-white border-gray-100"}`}>
        <div className="flex items-center gap-4">
          {userProfile.avatarUrl ? (
            <img src={userProfile.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full border border-gray-100 object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#011434] flex items-center justify-center text-white">
              <span className="text-2xl font-bold">{userProfile.firstName?.[0] || "U"}</span>
            </div>
          )}
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{userProfile.firstName} {userProfile.lastName}</h2>
        </div>
        <button className="px-6 py-2 rounded-full bg-[#8B6B2E] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#7a5e28] transition-colors cursor-pointer">
          Edit
        </button>
      </div>

      {/* Basic Information Form */}
      <div className={`rounded-2xl p-8 shadow-sm border flex flex-col gap-8 ${isDark ? "bg-[#0a1e42] border-gray-800" : "bg-white border-gray-100"}`}>
        <h2 className={`text-lg font-bold border-b pb-4 ${isDark ? "text-white border-gray-800" : "text-gray-900 border-gray-100"}`}>Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#8B6B2E] transition-colors text-sm ${isDark ? "bg-[#011434] border-gray-700 text-white" : "bg-[#FAFAFA] border-gray-200 text-gray-900"}`} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#8B6B2E] transition-colors text-sm ${isDark ? "bg-[#011434] border-gray-700 text-white" : "bg-[#FAFAFA] border-gray-200 text-gray-900"}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#8B6B2E] transition-colors text-sm ${isDark ? "bg-[#011434] border-gray-700 text-white" : "bg-[#FAFAFA] border-gray-200 text-gray-900"}`} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Gender</label>
            <div className="flex gap-2">
              {["Male", "Female", "Other"].map(g => (
                <button
                  key={g}
                  onClick={() => setFormData({ ...formData, gender: g })}
                  className={`px-4 py-2.5 rounded-full border text-xs font-medium transition-colors flex-1 ${formData.gender === g ? 'border-[#8B6B2E] text-[#8B6B2E] bg-[#8B6B2E]/5' : (isDark ? 'border-gray-700 text-gray-400 hover:border-gray-500' : 'border-gray-200 text-gray-500 hover:border-gray-300')}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Nationality</label>
            <select name="nationality" value={formData.nationality} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#8B6B2E] transition-colors text-sm ${isDark ? "bg-[#011434] border-gray-700 text-white" : "bg-[#FAFAFA] border-gray-200 text-gray-900"}`}>
              <option value="">Select nationality</option>
              <option value="ID">Indonesia</option>
              <option value="SG">Singapore</option>
              <option value="AU">Australia</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>
        </div>

        <div className={`w-full h-px my-2 ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />

        <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Email</label>
            <input type="email" value={userProfile.email} disabled className={`w-full px-4 py-3 rounded-lg border cursor-not-allowed text-sm ${isDark ? "bg-gray-800 border-gray-700 text-gray-500" : "bg-gray-100 border-gray-200 text-gray-500"}`} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-[#8B6B2E] transition-colors text-sm ${isDark ? "bg-[#011434] border-gray-700 text-white" : "bg-[#FAFAFA] border-gray-200 text-gray-900"}`} />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button onClick={handleSave} disabled={loading} className="px-8 py-3 rounded-full bg-[#8B6B2E] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#7a5e28] transition-colors disabled:opacity-50">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
