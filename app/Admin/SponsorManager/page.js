"use client";
import React, { useState } from "react";
import { Header } from "../../(Navigation)/(Admin)/UI/Header";
import { Footer } from "../../(Navigation)/(Admin)/UI/Footer";

export default function SponsorManagerPage() {
  const [currentSponsors, setCurrentSponsors] = useState([
    { id: 1, name: "GreenLeaf Corp", event: "Annual Gala", about: "Major supporter of PASOC events." },
    { id: 2, name: "Sunrise Foundation", event: "Scholarship Night", about: "Provides scholarships for students." },
  ]);
  const [previousSponsors, setPreviousSponsors] = useState([
    { id: 3, name: "BlueSky Ltd." },
    { id: 4, name: "EcoFriends" },
    { id: 5, name: "FutureTech" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [formData, setFormData] = useState({ name: "", event: "", about: "" });

  // Add/Edit sponsor logic
  const handleAddSponsor = () => {
    setFormData({ name: "", event: "", about: "" });
    setEditingSponsor(null);
    setShowForm(true);
  };
  const handleEditSponsor = (sponsor) => {
    setFormData({ name: sponsor.name, event: sponsor.event, about: sponsor.about });
    setEditingSponsor(sponsor);
    setShowForm(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSponsor) {
      setCurrentSponsors(currentSponsors.map(s => s.id === editingSponsor.id ? { ...editingSponsor, ...formData } : s));
    } else {
      setCurrentSponsors([...currentSponsors, { id: Date.now(), ...formData }]);
    }
    setShowForm(false);
  };
  const handleCancel = () => {
    setShowForm(false);
  };
  // Move to previous
  const handleMoveToPrevious = (sponsor) => {
    setCurrentSponsors(currentSponsors.filter(s => s.id !== sponsor.id));
    setPreviousSponsors([...previousSponsors, { id: sponsor.id, name: sponsor.name }]);
  };

  return (
    <div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center py-12">
        {/* Section Header */}
        <div className="w-full max-w-4xl mx-auto mb-8 flex flex-col items-center">
          <div className="flex items-center w-full justify-between mb-2">
            <hr className="flex-1 border-t border-[#556B2F] mx-4" />
            <span className="text-3xl font-serif font-bold text-[#556B2F] tracking-wide">SPONSOR MANAGER</span>
            <hr className="flex-1 border-t border-[#556B2F] mx-4" />
          </div>
          <div className="flex items-center w-full justify-center mt-2">
            <span className="text-xl font-serif font-semibold text-[#2a2420] underline mr-2">Current Sponsors</span>
            <button
              className="rounded-full bg-[#556B2F] hover:bg-[#6b8e23] text-white w-8 h-8 flex items-center justify-center text-xl shadow transition ml-2"
              title="Add Sponsor"
              onClick={handleAddSponsor}
            >
              +
            </button>
          </div>
        </div>
        {/* Current Sponsors Cards */}
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          {currentSponsors.map(sponsor => (
            <div key={sponsor.id} className="flex items-start gap-6 bg-white border-2 border-[#556B2F] rounded-xl shadow-md p-6 relative">
              {/* Photo/Logo Placeholder */}
              <div className="flex flex-col items-center mr-2">
                <div className="w-32 h-32 border-2 border-[#556B2F] rounded-xl flex items-center justify-center bg-[#f0ece1]">
                  <img src="/pasoc_logo.png" alt="PASOC Logo" className="w-28 h-28 object-contain" />
                </div>
                <span className="mt-2 text-xs text-[#2a2420]">Photo or Logo</span>
              </div>
              {/* Sponsor Info */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold text-[#2a2420]">{sponsor.name}</span>
                  <span className="text-md text-[#2a2420] font-medium">{sponsor.event ? <>&nbsp;<span className="text-sm">Event Sponsored:</span> {sponsor.event}</> : null}</span>
                </div>
                <div className="mt-2">
                  <div className="bg-[#f7f7d6] rounded p-3 text-[#2a2420] text-md font-serif min-h-[60px]">
                    {sponsor.about}
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    className="bg-[#6b8e23] text-white font-semibold px-4 py-2 rounded transition text-sm"
                    onClick={() => handleMoveToPrevious(sponsor)}
                  >
                    Move to Previous
                  </button>
                  <button
                    className="bg-[#556B2F] text-white font-semibold px-4 py-2 rounded transition text-sm"
                    onClick={() => handleEditSponsor(sponsor)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Sponsor Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <form className="bg-white border-2 border-[#556B2F] rounded-xl shadow-lg p-8 flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold text-[#556B2F] mb-2">{editingSponsor ? "Edit Sponsor" : "Add Sponsor"}</h2>
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                placeholder="Sponsor Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                placeholder="Event Name"
                value={formData.event}
                onChange={e => setFormData({ ...formData, event: e.target.value })}
                required
              />
              <textarea
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                placeholder="About Sponsor"
                value={formData.about}
                onChange={e => setFormData({ ...formData, about: e.target.value })}
                rows={3}
                required
              />
              <div className="flex gap-4 mt-2">
                <button
                  type="submit"
                  className="bg-[#556B2F] hover:bg-[#6b8e23] text-white font-semibold px-4 py-2 rounded transition"
                >
                  {editingSponsor ? "Save" : "Add"}
                </button>
                <button
                  type="button"
                  className="bg-[#f0ece1] border border-[#556B2F] text-[#556B2F] font-semibold px-4 py-2 rounded transition hover:bg-[#e6e2d3]"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Previous Sponsors Section */}
        <div className="w-full max-w-4xl mx-auto mt-12 flex flex-col items-center">
          <hr className="w-full border-t border-[#556B2F] my-6" />
          <span className="text-xl font-serif font-semibold text-[#2a2420] underline mb-4">Previous Sponsors</span>
          <div className="flex gap-8 justify-center">
            {previousSponsors.map(sponsor => (
              <div key={sponsor.id} className="flex flex-col items-center">
                <div className="w-20 h-20 border-2 border-[#556B2F] rounded-xl flex items-center justify-center bg-[#f0ece1]">
                  <img src="/pasoc_logo.png" alt="PASOC Logo" className="w-16 h-16 object-contain" />
                </div>
                <span className="mt-2 text-xs text-[#2a2420]">{sponsor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
