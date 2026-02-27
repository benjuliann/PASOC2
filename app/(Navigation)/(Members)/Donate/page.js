
"use client";
import { useState } from "react";

const PRESET_AMOUNTS = [5, 10, 20, 50, 100, 150];
const PAYMENT_METHODS = [
  { id: "paypal", label: "PayPal", logo: "/paypal.svg" },
  { id: "visa", label: "Visa", logo: "/visa.svg" },
  { id: "mastercard", label: "MasterCard", logo: "/mastercard.svg" },
  { id: "amex", label: "American Express", logo: "/amex.svg" },
  { id: "interac", label: "Interac", logo: "/interac.svg" },
];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("paypal");

  const total = selectedAmount || parseFloat(customAmount) || 0;

  // Handlers
  const handleAmountClick = (amt) => {
    setSelectedAmount(amt === selectedAmount ? null : amt);
    setCustomAmount(amt === selectedAmount ? "" : String(amt));
  };
  const handleCustomAmount = (val) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };
  const handleDonate = (e) => {
    e.preventDefault();
    if (total <= 0) {
      alert("Please enter a donation amount.");
      return;
    }
    alert(`Thank you for your generous donation of $${total.toFixed(2)} to PASOC!`);
  };

  // Render
  return (
    <main className="max-w-2xl mx-auto px-6 py-10 bg-white text-neutral-900 min-h-screen font-sans">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-gray-300"></div>
        <h1 className="font-serif text-[2rem] italic font-normal text-[#556B2F] tracking-wide">DONATE</h1>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
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
                className={`amount-btn px-4 py-1.5 rounded-full border border-gray-300 text-sm font-semibold text-neutral-700 bg-white hover:border-[#556B2F] hover:text-[#556B2F] transition-all ${selectedAmount === amt ? "bg-[#556B2F] text-white border-[#556B2F]" : ""}`}
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
        <div className="mb-6">
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
        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">Payment Method</h2>
          <div className="flex flex-col gap-2">
            {PAYMENT_METHODS.map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2.5 bg-white cursor-pointer hover:border-[#556B2F] transition-all ${selectedPayment === m.id ? "border-[#556B2F] bg-green-50" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={selectedPayment === m.id}
                  onChange={() => setSelectedPayment(m.id)}
                  className="mt-0.5 shrink-0"
                />
                <img src={m.logo} alt={m.label + " logo"} className="h-6 w-8 object-contain mr-2" />
                <span className="text-sm text-neutral-900">{m.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Payment Details Section */}
        {selectedPayment === "paypal" || selectedPayment === "interac" ? (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-900 mb-3">{selectedPayment === "paypal" ? "PayPal Email" : "Interac Email or Phone"}</h2>
            <input
              type={selectedPayment === "paypal" ? "email" : "text"}
              placeholder={selectedPayment === "paypal" ? "PayPal Email" : "Email or Phone Number"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all"
              required
            />
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-900 mb-3">Card Details</h2>
            <div className="mb-3">
              <label className="block text-xs text-neutral-700 mb-1">Name on Card</label>
              <input type="text" placeholder="Name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all" />
            </div>
            <div className="mb-3">
              <label className="block text-xs text-neutral-700 mb-1">Card Number</label>
              <input type="text" placeholder="xxxx xxxx xxxx xxxx" maxLength={19} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-700 mb-1">Expiry Date</label>
                <input type="text" placeholder="MM/YY" maxLength={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-neutral-700 mb-1">CVV</label>
                <input type="text" placeholder="xxx" maxLength={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all" />
              </div>
            </div>
          </div>
        )}
        {/* Billing Address */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">Billing Address</h2>
          <div className="mb-3">
            <label className="block text-xs text-neutral-700 mb-1">Name</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="First" className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
              <input type="text" placeholder="Last" className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-xs text-neutral-700 mb-1">Address</label>
            <input type="text" placeholder="Street" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all mb-2" />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="text" placeholder="City" className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
              <input type="text" placeholder="Postal Code" className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Province" className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
              <input type="text" placeholder="Country" className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-neutral-700 mb-1">Cell Number</label>
            <input type="tel" placeholder="xxx-xxx-xxxx" className="w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all" />
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
            className="bg-[#556B2F] hover:bg-[#6b7d45] text-white font-semibold text-sm px-10 py-2.5 rounded-lg transition-all hover:shadow-md active:scale-95"
          >
            Donate Now
          </button>
        </div>
      </form>
    </main>
  );
}
