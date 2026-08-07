"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@/components/Icon";
import { Modal } from "@/components/admin/Modal";

const API_URL = "http://localhost:5001/api/sliders";

export default function SlidersAdmin() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlider, setCurrentSlider] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "", tag: "", price: "", imageUrl: "", order: 0
  });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await axios.get(API_URL);
      setSliders(res.data);
    } catch (err) {
      console.error("Failed to fetch sliders", err);
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
      if (currentSlider) {
        await axios.put(`${API_URL}/${currentSlider.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setIsModalOpen(false);
      fetchSliders();
    } catch (err) {
      console.error("Failed to save slider", err);
      alert("Failed to save slider");
    }
  };

  const openAddModal = () => {
    setCurrentSlider(null);
    setFormData({ title: "", tag: "", price: "", imageUrl: "", order: 0 });
    setIsModalOpen(true);
  };

  const openEditModal = (slider) => {
    setCurrentSlider(slider);
    setFormData({
      title: slider.title,
      tag: slider.tag || "",
      price: slider.price || "",
      imageUrl: slider.imageUrl,
      order: slider.order
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this slider?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchSliders();
      } catch (err) {
        console.error("Failed to delete slider", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Master Sliders</h2>
          <p className="text-gray-500 text-sm">Manage hero banner images and overlay text.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm bg-[#8B6B2E] text-white hover:bg-[#7a5e28] hover:shadow-md flex items-center gap-2"
        >
          <Icon name="plus" size={16} /> Add New Slider
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-[#8B6B2E] rounded-full animate-spin" />
            Loading sliders...
          </div>
        ) : sliders.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">No sliders found. Create your first slider above.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sliders.map(slider => (
                <tr key={slider.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-28 h-16 rounded-lg overflow-hidden relative bg-gray-100 shadow-sm">
                      <img src={slider.imageUrl} alt={slider.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 line-clamp-1">{slider.title}</div>
                    <div className="text-gray-500 mt-1 text-xs">{slider.tag} &bull; {slider.price}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{slider.order}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => openEditModal(slider)} className="px-3 py-1.5 text-xs font-medium text-[#8B6B2E] hover:text-white bg-[#8B6B2E]/10 hover:bg-[#8B6B2E] rounded-md transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(slider.id)} className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-500 rounded-md transition-colors">
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
        title={currentSlider ? "Edit Slider" : "Add New Slider"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
            <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" placeholder="Find your own self in vintage lake house" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tag (e.g. CONDOMINIUM)</label>
              <input name="tag" value={formData.tag} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price Text</label>
              <input name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" placeholder="Rp 11.250.000.000" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image URL</label>
            <input required name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Order Number</label>
            <input type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8B6B2E] focus:ring-1 focus:ring-[#8B6B2E] transition-shadow text-sm" />
          </div>
          
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#8B6B2E] text-white hover:bg-[#7a5e28] shadow-sm transition-all">
              Save Slider
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
