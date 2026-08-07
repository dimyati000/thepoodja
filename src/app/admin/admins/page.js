"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@/components/Icon";
import { Modal } from "@/components/admin/Modal";

const API_URL = "http://localhost:5001/api/admins";

export default function AdminsAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  
  const [formData, setFormData] = useState({
    email: "", password: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(API_URL);
      setAdmins(res.data);
    } catch (err) {
      console.error("Failed to fetch admins", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentAdmin) {
        await axios.put(`${API_URL}/${currentAdmin.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setIsModalOpen(false);
      fetchAdmins();
    } catch (err) {
      console.error("Failed to save admin", err);
      alert(err.response?.data?.error || "Failed to save admin");
    }
  };

  const openAddModal = () => {
    setCurrentAdmin(null);
    setFormData({ email: "", password: "" });
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const openEditModal = (admin) => {
    setCurrentAdmin(admin);
    setFormData({ email: admin.email, password: "" });
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, email) => {
    if (confirm(`Are you sure you want to delete admin ${email}?`)) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchAdmins();
      } catch (err) {
        console.error("Failed to delete admin", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Master Admins</h2>
          <p className="text-gray-500 text-sm">Manage user accounts with dashboard access.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm bg-[#8B6B2E] text-white hover:bg-[#7a5e28] hover:shadow-md flex items-center gap-2"
        >
          <Icon name="plus" size={16} /> Add New Admin
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-[#8B6B2E] rounded-full animate-spin" />
            Loading admins...
          </div>
        ) : admins.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">No admins found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Added On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {admins.map(admin => (
                <tr key={admin.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(admin.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => openEditModal(admin)} className="px-3 py-1.5 text-xs font-medium text-[#8B6B2E] hover:text-white bg-[#8B6B2E]/10 hover:bg-[#8B6B2E] rounded-md transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(admin.id, admin.email)} className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-500 rounded-md transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentAdmin ? "Edit Admin" : "Add New Admin"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input 
              required 
              type="email"
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" 
              placeholder="e.g. admin@poodja.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {currentAdmin ? "New Password (Optional)" : "Password"}
            </label>
            <div className="relative">
              <input 
                required={!currentAdmin}
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm pr-10" 
                placeholder={currentAdmin ? "Leave blank to keep unchanged" : "••••••••"} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {currentAdmin && (
              <p className="text-xs text-gray-400 mt-1">If you are only using Google Login for this user, leave the password blank.</p>
            )}
          </div>
          
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#8B6B2E] text-white hover:bg-[#7a5e28] shadow-sm transition-all">
              {currentAdmin ? "Save Changes" : "Create Admin"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
