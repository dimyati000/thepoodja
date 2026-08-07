"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@/components/Icon";
import { Modal } from "@/components/admin/Modal";

const API_URL = "http://localhost:5001/api/villas";

export default function VillasAdmin() {
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVilla, setCurrentVilla] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "", location: "", description: "", basePrice: "", imageUrl: ""
  });

  useEffect(() => {
    fetchVillas();
  }, []);

  const fetchVillas = async () => {
    try {
      const res = await axios.get(API_URL);
      setVillas(res.data);
    } catch (err) {
      console.error("Failed to fetch villas", err);
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
      if (currentVilla) {
        await axios.put(`${API_URL}/${currentVilla.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setIsModalOpen(false);
      fetchVillas();
    } catch (err) {
      console.error("Failed to save villa", err);
      alert("Failed to save villa");
    }
  };

  const openAddModal = () => {
    setCurrentVilla(null);
    setFormData({ name: "", location: "", description: "", basePrice: "", imageUrl: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (villa) => {
    setCurrentVilla(villa);
    setFormData({
      name: villa.name,
      location: villa.location,
      description: villa.description || "",
      basePrice: villa.basePrice || "",
      imageUrl: villa.imageUrl || ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this villa?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchVillas();
      } catch (err) {
        console.error("Failed to delete villa", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Master Villas</h2>
          <p className="text-gray-500 text-sm">Manage core property listings and details.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm bg-[#8B6B2E] text-white hover:bg-[#7a5e28] hover:shadow-md flex items-center gap-2"
        >
          <Icon name="plus" size={16} /> Add New Villa
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-[#8B6B2E] rounded-full animate-spin" />
            Loading villas...
          </div>
        ) : villas.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">No villas found. Create your first listing above.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Name & Location</th>
                <th className="px-6 py-4">Base Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {villas.map(villa => (
                <tr key={villa.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{villa.name}</div>
                    <div className="text-gray-500 mt-1 text-xs">{villa.location}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">Rp {Number(villa.basePrice).toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => openEditModal(villa)} className="px-3 py-1.5 text-xs font-medium text-[#8B6B2E] hover:text-white bg-[#8B6B2E]/10 hover:bg-[#8B6B2E] rounded-md transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(villa.id)} className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-500 rounded-md transition-colors">
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
        title={currentVilla ? "Edit Villa" : "Add New Villa"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Villa Name</label>
              <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" placeholder="e.g. Villa Poodja" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
              <input required name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" placeholder="e.g. Seminyak, Bali" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea rows="3" name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm resize-none" placeholder="A luxury sanctuary..." />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Base Price (Rp)</label>
              <input required type="number" name="basePrice" value={formData.basePrice} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cover Image URL</label>
              <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" placeholder="https://..." />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#8B6B2E] text-white hover:bg-[#7a5e28] shadow-sm transition-all">
              Save Villa
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
