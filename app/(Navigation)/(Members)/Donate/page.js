

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

const nameOnly = (val) => val.replace(/[^a-zA-Z\s'-]/g, "");
const digitsOnly = (val) => val.replace(/[^0-9]/g, "");
const alphanumericSpace = (val) => val.replace(/[^a-zA-Z0-9\s]/g, "");
const lettersAndSpaces = (val) => val.replace(/[^a-zA-Z\s]/g, "");
const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

const formatCardNumber = (val) => {
  const nums = digitsOnly(val).slice(0, 16);
  return nums.replace(/(.{4})/g, "$1 ").trim();
};
const formatExpiry = (val) => {
  const nums = digitsOnly(val).slice(0, 4);
  if (nums.length > 2) return nums.slice(0, 2) + "/" + nums.slice(2);
  return nums;
};
const formatPhone = (val) => {
  const nums = digitsOnly(val).slice(0, 10);
  if (nums.length > 6) return nums.slice(0, 3) + "-" + nums.slice(3, 6) + "-" + nums.slice(6);
  if (nums.length > 3) return nums.slice(0, 3) + "-" + nums.slice(3);
  return nums;
};

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("paypal");

  // Donor info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Card details
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // PayPal / Interac
  const [paymentEmail, setPaymentEmail] = useState("");

  // Billing address
  const [billingFirst, setBillingFirst] = useState("");
  const [billingLast, setBillingLast] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [cellNumber, setCellNumber] = useState("");

  // Errors
  const [errors, setErrors] = useState({});

  const total = selectedAmount || parseFloat(customAmount) || 0;

  // Handlers
  const handleAmountClick = (amt) => {
    setSelectedAmount(amt === selectedAmount ? null : amt);
    setCustomAmount(amt === selectedAmount ? "" : String(amt));
  };
  const handleCustomAmount = (val) => {
    // Allow only valid positive decimal numbers
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setCustomAmount(val);
      setSelectedAmount(null);
    }
  };

  const validate = () => {
    const errs = {};
    if (total <= 0) errs.amount = "Please enter a donation amount.";
    if (!firstName.trim()) errs.firstName = "First name is required.";
    if (!lastName.trim()) errs.lastName = "Last name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!isValidEmail(email)) errs.email = "Please enter a valid email.";

    if (selectedPayment === "paypal") {
      if (!paymentEmail.trim()) errs.paymentEmail = "PayPal email is required.";
      else if (!isValidEmail(paymentEmail)) errs.paymentEmail = "Please enter a valid PayPal email.";
    } else if (selectedPayment === "interac") {
      if (!paymentEmail.trim()) errs.paymentEmail = "Email or phone is required.";
      else if (!isValidEmail(paymentEmail) && !/^\d{10}$/.test(digitsOnly(paymentEmail))) {
        errs.paymentEmail = "Please enter a valid email or 10-digit phone number.";
      }
    } else {
      if (!cardName.trim()) errs.cardName = "Name on card is required.";
      if (digitsOnly(cardNumber).length < 13) errs.cardNumber = "Please enter a valid card number.";
      if (!/^\d{2}\/\d{2}$/.test(expiry)) errs.expiry = "Expiry must be MM/YY.";
      else {
        const month = parseInt(expiry.slice(0, 2), 10);
        if (month < 1 || month > 12) errs.expiry = "Invalid month.";
      }
      if (cvv.length < 3) errs.cvv = "CVV must be 3 or 4 digits.";
    }

    if (!billingFirst.trim()) errs.billingFirst = "First name is required.";
    if (!billingLast.trim()) errs.billingLast = "Last name is required.";
    if (!street.trim()) errs.street = "Street address is required.";
    if (!city.trim()) errs.city = "City is required.";
    if (!postalCode.trim()) errs.postalCode = "Postal code is required.";
    if (!province.trim()) errs.province = "Province is required.";
    if (!country.trim()) errs.country = "Country is required.";
    if (cellNumber && digitsOnly(cellNumber).length < 10) errs.cellNumber = "Please enter a valid 10-digit phone number.";

    return errs;
  };

  const handleDonate = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    alert(`Thank you for your generous donation of $${total.toFixed(2)} to PASOC!`);
  };

  const errMsg = (field) =>
    errors[field] ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p> : null;

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
              type="text"
              inputMode="decimal"
              min="0"
              placeholder="0"
              value={customAmount}
              onChange={(e) => handleCustomAmount(e.target.value)}
              className="flex-1 px-3 py-2.5 bg-transparent text-sm text-neutral-900 placeholder-neutral-400"
            />
            <span className="px-3 text-neutral-700 text-sm border-l border-gray-300 py-2.5">.00</span>
          </div>
          {errMsg("amount")}
        </div>
        {/* Donor Info */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">Enter your information</h2>
          <div className="mb-3">
            <label className="block text-xs text-neutral-700 mb-1">Name</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input type="text" placeholder="First" value={firstName} onChange={(e) => setFirstName(nameOnly(e.target.value))} className={`border ${errors.firstName ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all w-full`} />
                {errMsg("firstName")}
              </div>
              <div>
                <input type="text" placeholder="Last" value={lastName} onChange={(e) => setLastName(nameOnly(e.target.value))} className={`border ${errors.lastName ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all w-full`} />
                {errMsg("lastName")}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-neutral-700 mb-1">Email</label>
            <input type="email" placeholder="yourname@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full border ${errors.email ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all`} />
            {errMsg("email")}
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
              value={paymentEmail}
              onChange={(e) => setPaymentEmail(e.target.value)}
              className={`w-full border ${errors.paymentEmail ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all`}
            />
            {errMsg("paymentEmail")}
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-900 mb-3">Card Details</h2>
            <div className="mb-3">
              <label className="block text-xs text-neutral-700 mb-1">Name on Card</label>
              <input type="text" placeholder="Name" value={cardName} onChange={(e) => setCardName(nameOnly(e.target.value))} className={`w-full border ${errors.cardName ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all`} />
              {errMsg("cardName")}
            </div>
            <div className="mb-3">
              <label className="block text-xs text-neutral-700 mb-1">Card Number</label>
              <input type="text" inputMode="numeric" placeholder="xxxx xxxx xxxx xxxx" maxLength={19} value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} className={`w-full border ${errors.cardNumber ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all`} />
              {errMsg("cardNumber")}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-700 mb-1">Expiry Date</label>
                <input type="text" inputMode="numeric" placeholder="MM/YY" maxLength={5} value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} className={`w-full border ${errors.expiry ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all`} />
                {errMsg("expiry")}
              </div>
              <div>
                <label className="block text-xs text-neutral-700 mb-1">CVV</label>
                <input type="text" inputMode="numeric" placeholder="xxx" maxLength={4} value={cvv} onChange={(e) => setCvv(digitsOnly(e.target.value).slice(0, 4))} className={`w-full border ${errors.cvv ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white placeholder-neutral-400 transition-all`} />
                {errMsg("cvv")}
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
              <div>
                <input type="text" placeholder="First" value={billingFirst} onChange={(e) => setBillingFirst(nameOnly(e.target.value))} className={`border ${errors.billingFirst ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all w-full`} />
                {errMsg("billingFirst")}
              </div>
              <div>
                <input type="text" placeholder="Last" value={billingLast} onChange={(e) => setBillingLast(nameOnly(e.target.value))} className={`border ${errors.billingLast ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all w-full`} />
                {errMsg("billingLast")}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-xs text-neutral-700 mb-1">Address</label>
            <input type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} className={`w-full border ${errors.street ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all mb-2`} />
            {errMsg("street")}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(lettersAndSpaces(e.target.value))} className={`border ${errors.city ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all w-full`} />
                {errMsg("city")}
              </div>
              <div>
                <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(alphanumericSpace(e.target.value).toUpperCase().slice(0, 7))} className={`border ${errors.postalCode ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all w-full`} />
                {errMsg("postalCode")}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input type="text" placeholder="Province" value={province} onChange={(e) => setProvince(lettersAndSpaces(e.target.value))} className={`border ${errors.province ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all w-full`} />
                {errMsg("province")}
              </div>
              <div>
                <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(lettersAndSpaces(e.target.value))} className={`border ${errors.country ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all w-full`} />
                {errMsg("country")}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-neutral-700 mb-1">Cell Number</label>
            <input type="tel" inputMode="numeric" placeholder="xxx-xxx-xxxx" value={cellNumber} onChange={(e) => setCellNumber(formatPhone(e.target.value))} className={`w-64 border ${errors.cellNumber ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2 text-sm bg-white text-neutral-900 placeholder-neutral-400 transition-all`} />
            {errMsg("cellNumber")}
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
