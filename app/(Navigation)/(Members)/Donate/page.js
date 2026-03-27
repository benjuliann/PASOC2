"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const PRESET_AMOUNTS = [5, 10, 20, 50, 100, 150];

// Separated into its own component because useSearchParams needs Suspense
function DonateContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const cancelled = searchParams.get("cancelled");
  const paidAmount = searchParams.get("amount");

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const total = selectedAmount || parseFloat(customAmount) || 0;

  const handleAmountClick = (amt) => {
    setSelectedAmount(amt === selectedAmount ? null : amt);
    setCustomAmount(amt === selectedAmount ? "" : String(amt));
  };

  const handleCustomAmount = (val) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (total <= 0) {
      alert("Please enter a donation amount.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          type: "donation",
          metadata: { donor_email: "" },
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10 bg-white text-neutral-900 min-h-screen font-sans">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-gray-300"></div>
        <h1 className="font-serif text-[2rem] italic font-normal text-[#556B2F] tracking-wide">DONATE</h1>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* ✅ Thank You Banner */}
      {success && (
        <div className="bg-green-50 border border-green-300 rounded-xl p-6 mb-8 text-center shadow-sm">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-xl font-bold text-green-800 mb-1">Thank You for Your Donation!</h2>
          <p className="text-sm text-green-700">
            Your generous donation of{" "}
            <span className="font-bold">${parseFloat(paidAmount).toFixed(2)}</span>{" "}
            has been received. We truly appreciate your support!
          </p>
        </div>
      )}

      {/* ❌ Cancelled Banner */}
      {cancelled && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6 text-center shadow-sm">
          <p className="text-sm text-yellow-800 font-medium">
            Your payment was cancelled. You can try again below.
          </p>
        </div>
      )}

      <form className="bg-gray-50 border border-gray-300 rounded-xl p-6 shadow-sm" onSubmit={handleDonate}>
        {/* Amount */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">Enter your donation</h2>
          <p className="text-xs text-neutral-700 mb-3">Choose from the pre-selected amount or enter the amount you would like to donate</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                type="button"
                key={amt}
                onClick={() => handleAmountClick(amt)}
                className={`amount-btn px-4 py-1.5 rounded-full border border-gray-300 text-sm font-semibold text-neutral-700 bg-white hover:border-[#556B2F] hover:text-[#556B2F] transition-all ${selectedAmount === amt ? "bg-[#556B2F] text-neutral-700 border-[#556B2F]" : ""}`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
            <span className="px-3 text-neutral-700 text-sm font-semibold border-r border-gray-300 py-2.5">$</span>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={customAmount}
              onChange={(e) => handleCustomAmount(e.target.value)}
              className="flex-1 px-3 py-2.5 bg-transparent text-sm text-neutral-900 placeholder-neutral-400"
            />
            <span className="px-3 text-neutral-700 text-sm border-l border-gray-300 py-2.5">.00</span>
          </div>
        </div>

        {/* Donor Info */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">Enter your information</h2>
          <div className="mb-3">
            <label className="block text-xs text-neutral-700 mb-1">Name</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="First" className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
              <input type="text" placeholder="Last" className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-neutral-700 mb-1">Email</label>
            <input type="email" placeholder="yourname@email.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
          </div>
        </div>

        {/* Total & Submit */}
        <div className="border-t border-gray-300 pt-5 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="text-neutral-700 font-semibold">Donation Total:</span>
            <span className="text-neutral-900 font-bold text-lg">
              ${total > 0 ? total.toFixed(2) : "0.00"}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#556B2F] hover:bg-[#6b7d45] disabled:opacity-60 text-white font-semibold text-sm px-10 py-2.5 rounded-lg transition-all hover:shadow-md active:scale-95"
          >
            {loading ? "Redirecting to Stripe..." : "Donate Now"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default function Donate() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-neutral-500">Loading...</div>}>
      <DonateContent />
    </Suspense>
  );
}