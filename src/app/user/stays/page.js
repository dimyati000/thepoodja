"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { Icon } from "@/components/Icon";
import Image from "next/image";
import { useTheme } from "@/components/ThemeAndLayoutProviders";

export default function StaysPage() {
  const { isDark } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        try {
          const res = await axios.get(`http://localhost:5001/api/bookings/user/${session.user.email}`);
          setBookings(res.data);
        } catch (err) {
          console.error("Failed to fetch bookings");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="text-center p-12 text-sm text-gray-500">Loading stays...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className={`font-serif text-3xl font-bold tracking-wide mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>My Stays</h1>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>View your past and upcoming reservations.</p>
      </div>

      <div className={`rounded-2xl p-8 shadow-sm border min-h-[400px] ${isDark ? "bg-[#0a1e42] border-gray-800" : "bg-white border-gray-100"}`}>
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <h3 className={`font-serif text-xl tracking-wide mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>No booked properties</h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>You haven't made any reservations yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {bookings.map(booking => (
              <div key={booking.id} className={`flex gap-6 p-4 rounded-xl border hover:shadow-md transition-shadow ${isDark ? "border-gray-800 hover:border-gray-700 bg-[#011434]" : "border-gray-100 bg-white"}`}>
                <div className="relative w-48 h-32 rounded-lg overflow-hidden shrink-0">
                  <Image src={booking.villa?.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"} alt="Villa" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${booking.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                        {booking.status}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{booking.villa?.name}</h3>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      <Icon name="calendar" size={12} />
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#8B6B2E]">Rp {booking.totalPrice.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
