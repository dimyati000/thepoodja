"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@/components/Icon";

const API_URL = "/api/users";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Master Users</h2>
          <p className="text-gray-500 text-sm">View registered customers and their membership details.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-[#8B6B2E] rounded-full animate-spin" />
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">No users found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Membership</th>
                <th className="px-6 py-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px]">
                          <Icon name="user" size={14} />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">{user.firstName} {user.lastName}</div>
                        <div className="text-gray-500 mt-0.5 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${user.tier === 'Gold' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                      {user.tier}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{user.points} pts</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
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
