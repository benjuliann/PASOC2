"use client";
import Link from "next/link";
import { useState } from "react";

function Field({
  label,
  placeholder,
  value,
  onChange,
  className = "",
  type = "text",}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-xs uppercase tracking-wide text-black/80">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
      />
    </div>
  );
}

function Divider({ className = "" }) {
  return <div className={`mx-auto h-px w-full bg-[#556B2F]/60 ${className}`} />;
}

function SectionTitle({ children, underlineWidth = "w-32", className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-[#556B2F] font-serif text-xl">{children}</h2>
      <div className={`mx-auto mt-1 h-[2px] ${underlineWidth} bg-[#556B2F]/60`} />
    </div>
  );
}

export default function MembershipPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    birthday: "",
    address: "",
    city: "",
    postalCode: "",
    email: "",
    phone: "",
    currentOrgInvolvement: "",
    positionsHeld: "",
    addressPhilippines: "",
    hasChildren: "", 
    dependants: [{ firstName: "", lastName: "", birthday: "" }],
    emailNotifications: "", 
    agreedToPrivacy: false,
  });

  const setField = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateDependant = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      dependants: prev.dependants.map((d, i) => (i === index ? { ...d, [field]: value } : d)),
    }));
  };

  const addDependant = () => {
    setForm((prev) => ({
      ...prev,
      dependants: [...prev.dependants, { firstName: "", lastName: "", birthday: "" }],
    }));
  };

  const removeDependant = (index) => {
    setForm((prev) => ({
      ...prev,
      dependants: prev.dependants.filter((_, i) => i !== index),
    }));
  };

  const nameFields = [
    { key: "firstName", label: "First Name", placeholder: "First Name" },
    { key: "lastName", label: "Last Name", placeholder: "Last Name" },
    { key: "preferredName", label: "Preferred Name (Optional)", placeholder: "If different from first name" },
    { key: "birthday", label: "Birthday", placeholder: "MM/DD/YYYY" },
  ];

  const cityFields = [
    { key: "city", label: "City", placeholder: "City" },
    { key: "postalCode", label: "Postal Code", placeholder: "Postal Code (eg. A1A 1A1)" },
  ];

  const contactFields = [
    { key: "email", label: "Email Address", placeholder: "Email Address" },
    { key: "phone", label: "Phone Number", placeholder: "Phone Number" },
  ];

  const additionalFields = [
    {
      key: "currentOrgInvolvement",
      label: "Current Involvement in Organizations (optional)",
      placeholder: "Current Involvement in Organizations",
      className: "sm:col-span-2",
    },
    { key: "positionsHeld", label: "Position(s) Held (optional)", placeholder: "Position(s) Held" },
    { key: "addressPhilippines", label: "Address in the Philippines (optional)", placeholder: "Address (if applicable)" },
  ];

  return (
    <main className="min-h-dvh bg-[#F4EFE7] relative overflow-y-auto md:overflow-hidden">
      <Link href="/" className="absolute left-6 top-6" aria-label="Go back">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#556B2F"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>

      <div className="min-h-dvh px-4 flex justify-center items-start md:items-center py-10">
        <div className="w-full max-w-[640px] bg-white/40 rounded-2xl p-6 sm:p-8 shadow-sm border border-black/10">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#556B2F] tracking-wide text-center">
            Membership Registration
          </h1>

          <p className="text-center text-black mt-2 text-sm sm:text-base max-w-xl mx-auto">
            One-time membership fee of: <br />
            Adults (18+): $5.00 <br />
            Youth (under 18): $2.50 <br />
          </p>

          <form className="mt-8 space-y-4">
            <SectionTitle className="mt-4">Member Information</SectionTitle>

            {/* Names + Birthday */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field 
                label="First Name"
                value={form.firstName}
                onChange={setField("firstName")}
                required
              />

              <Field
                label="Last Name"
                value={form.lastName}
                onChange={setField("lastName")}
                required
              />

              <Field
                label="Preferred Name"
                value={form.preferredName}
                onChange={setField("preferredName")}
                placeholder="if applicable"
              />

              <Field
                label="Birthday"
                value={form.birthday}
                onChange={setField("birthday")}
                required
              />

            </div>

            <Divider />

            {/* Address */}
            <Field
              label="Address"
              value={form.address}
              onChange={setField("address")}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="City"
                value={form.city}
                onChange={setField("city")}
                required
              />

              <Field
                label="Postal Code"
                value={form.postalCode}
                onChange={setField("postalCode")}
                placeholder="eg. A1A 1A1"
                required
              />
            </div>

            <Divider />

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Email Address"
                value={form.email}
                onChange={setField("email")}
                required
              />

              <Field
                label="Phone Number"
                value={form.phone}
                onChange={setField("phone")}
                required
              />
            </div>

            {/* Dependants form*/}
            <div className="space-y-2 rounded-xl border border-black/10 bg-white/50 p-4">
              <p className="text-xs uppercase text-black/80">
                Do you have children to add to the file?
              </p>

              <div className="flex gap-6 text-sm">
                {[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" }
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 text-black/80">
                    <input
                      type="radio"
                      name="hasChildren"
                      value={opt.value}
                      checked={form.hasChildren === opt.value}
                      onChange={setField("hasChildren")}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {form.hasChildren === "yes" && (
                <div className="mt-2 space-y-4">
                  {form.dependants.map((child, i) => (
                    <div key={i} className="space-y-3 rounded-xl border border-black/10 bg-white p-4">
                      <div className="flex items-center justify-between">
                          Child #{i + 1}
                        {form.dependants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDependant(i)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          placeholder="First Name"
                          value={child.firstName}
                          onChange={(e) => updateDependant(i, "firstName", e.target.value)}
                          className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                        />

                        <input
                          placeholder="Last Name"
                          value={child.lastName}
                          onChange={(e) => updateDependant(i, "lastName", e.target.value)}
                          className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                        />

                        <input
                          placeholder="Birthday (MM/DD/YYYY)" 
                          value={child.birthday}
                          onChange={(e) => updateDependant(i, "birthday", e.target.value)}
                          className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30 sm:col-span-2"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addDependant}
                    className="w-full rounded-xl border border-[#556B2F]/40 bg-white px-4 py-3 text-sm text-[#556B2F] hover:bg-[#556B2F]/5 transition">
                    + Add another child
                  </button>
                </div>
              )}
            </div>

            <Divider />

            <SectionTitle underlineWidth="w-60">Additional Information (Optional) </SectionTitle>

            {/* This section is for any additional info we want to collect that doesn't fit into the above categories. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Current Involvement"
                value={form.currentOrgInvolvement}
                onChange={setField("currentOrgInvolvement")}
                className="sm:col-span-2"
              />
              <Field
                label="Positions Held"
                value={form.positionsHeld}
                onChange={setField("positionsHeld")}
              />
              <Field
                label="Philippines Address"
                value={form.addressPhilippines}
                onChange={setField("addressPhilippines")}
              />
            </div>
            
            <Divider />
            
            {/* Informed Consent & Privacy Notice */}
            <SectionTitle underlineWidth="w-32">Informed Consent</SectionTitle>

            <div className="text-xs sm:text-base text-black/80 leading-relaxed space-y-4">
              <p>
                By submitting this membership form, you consent to the collection, use, and storage of your personal information by Pangasinan Society of Calgary (PASOC) for the purpose of managing your membership and providing related services.
              </p>

              <p>
                We are committed to protecting your privacy and handling your personal information in accordance with the Privacy Act and all applicable privacy regulations. Your information will be stored securely and will only be accessed by authorized personnel. It will not be shared with third parties without your consent, except as required by law.
              </p>

              <p>
              You have the right to access, update, or request correction of your personal information at any time by contacting us at{" "}
                <span className="font-medium">[contact email or phone number]</span>.
              </p>

              <p>
                By signing or submitting this form, you acknowledge that you have read and understood this notice and consent to the collection, use, and storage of your personal information as described above.
              </p>
            </div>

              {/* I Agree checkbox */}
              <label className="flex items-center gap-3 text-sm sm:text-base text-black/80 pt-2">
                <input
                  type="checkbox"
                  checked={form.agreedToPrivacy}
                  onChange={setField("agreedToPrivacy")}
                  required
                  className="h-5 w-5 accent-[#7E9A45]"
                />
                I agree to the Privacy Notice and consent to the use of my personal information.
              </label>

              <div className="mx-auto h-px w-full bg-black/40" />

              {/* Email notifications */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6 py-2">
                <p className="text-center text-xs sm:text-base text-black/80">
                  Would you like to receive email notifications?
                </p>

                <div className="flex justify-center gap-10 text-sm">
                  <label className="flex flex-col items-center gap-2 text-black/70">
                    <input
                      type="radio"
                      name="emailNotifications"
                      value="yes"
                      checked={form.emailNotifications === "yes"}
                      onChange={setField("emailNotifications")}
                      required
                      className="h-5 w-5 accent-[#7E9A45]"
                    />
                    Yes
                  </label>

                  <label className="flex flex-col items-center gap-2 text-black/70">
                    <input
                      type="radio"
                      name="emailNotifications"
                      value="no"
                      checked={form.emailNotifications === "no"}
                      onChange={setField("emailNotifications")}
                      required
                      className="h-5 w-5 accent-[#7E9A45]"
                    />
                    No
                  </label>
                </div>
              </div>

            <div className="mx-auto h-px w-full bg-black/40 my-6" />

            <button
              type="submit"
              className="w-full bg-[#7E9A45] text-white py-3 rounded-xl shadow-md hover:brightness-95 transition"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}