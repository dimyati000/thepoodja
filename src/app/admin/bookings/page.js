"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@/components/Icon";

const API_URL = "http://localhost:5001/api/bookings";

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_URL);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}/status`, { status: newStatus });
      fetchBookings();
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-orange-100 text-orange-600';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-600';
      case 'COMPLETED': return 'bg-green-100 text-green-600';
      case 'CANCELLED': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Master Bookings</h2>
          <p className="text-gray-500 text-sm">Manage all property reservations and their statuses.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-[#8B6B2E] rounded-full animate-spin" />
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">No bookings found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Property & Dates</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {bookings.map(booking => (
                <tr key={booking.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{booking.user?.firstName} {booking.user?.lastName}</div>
                    <div className="text-gray-500 mt-1 text-xs">{booking.user?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{booking.villa?.name}</div>
                    <div className="text-gray-500 mt-1 text-xs flex items-center gap-1">
                      <Icon name="calendar" size={12} />
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">Rp {booking.totalPrice.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select 
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md focus:outline-none focus:border-[#8B6B2E] bg-white cursor-pointer"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
