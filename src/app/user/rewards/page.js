"use client";

import { Icon } from "@/components/Icon";
import { useTheme } from "@/components/ThemeAndLayoutProviders";

export default function RewardsPage() {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className={`font-serif text-3xl font-bold tracking-wide mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Rewards</h1>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Redeem points for exclusive benefits.</p>
      </div>

      <div className={`rounded-2xl p-8 shadow-sm border flex flex-col items-center justify-center min-h-[400px] text-center ${isDark ? "bg-[#0a1e42] border-gray-800" : "bg-white border-gray-100"}`}>
        <div className={`w-16 h-16 rounded-full text-[#8B6B2E] flex items-center justify-center mb-4 ${isDark ? "bg-[#8B6B2E]/10" : "bg-[#F9F8F6]"}`}>
          <Icon name="gift" size={24} />
        </div>
        <h3 className={`font-serif text-xl tracking-wide mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Rewards Coming Soon</h3>
        <p className={`text-sm max-w-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>We are preparing exciting rewards and benefits for our loyal members. Stay tuned!</p>
      </div>
    </div>
  );
}
