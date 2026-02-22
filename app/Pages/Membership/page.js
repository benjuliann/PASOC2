"use client";
import Link from "next/link";
import { useState } from "react";

export default function MembershipPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [hasChildren, setHasChildren] = useState("");
  const [dependants, setDependants] = useState([
    { firstName: "", lastName: "", birthday: "" },
  ]);

  const updateDependant = (index, field, value) => {
    setDependants((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  };

  const addDependant = () => {
    setDependants((prev) => [
      ...prev,
      { firstName: "", lastName: "", birthday: "" },
    ]);
  };

  const removeDependant = (index) => {
    setDependants((prev) => prev.filter((_, i) => i !== index));
  };

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

          <h2 className="text-center text-[#556B2F] font-serif text-xl mt-4">
            Member Information
          </h2>

          <div className="mx-auto h-[2px] w-32 bg-[#556B2F]/60" />

          <form className="mt-8 space-y-4">
            {/* Names + Birthday */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-black/80">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-black/80">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-black/80">
                  Preferred Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="If different from first name"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-black/80">
                  Birthday
                </label>
                <input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>
            </div>

            <div className="mx-auto h-px w-full bg-[#556B2F]/60" />

            {/* Address */}
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide text-black/80">
                Address
              </label>
              <input
                type="text"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-black/80">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-black/80">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="Postal Code (eg. A1A 1A1)"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>
            </div>

            <div className="mx-auto h-px w-full bg-[#556B2F]/60" />

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-black/80">
                  Email Address
                </label>
                <input
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-black/80">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>

              {/* Dependants form*/}
              <div className="sm:col-span-2 flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wide text-black/80">
                  Do you have children to add to the file?
                </label>

                <div className="flex gap-6 text-sm">
                  <label className="flex items-center gap-2 text-black/80">
                    <input
                      type="radio"
                      name="hasChildren"
                      value="yes"
                      checked={hasChildren === "yes"}
                      onChange={(e) => setHasChildren(e.target.value)}
                    />
                    Yes
                  </label>

                  <label className="flex items-center gap-2 text-black/80">
                    <input
                      type="radio"
                      name="hasChildren"
                      value="no"
                      checked={hasChildren === "no"}
                      onChange={(e) => setHasChildren(e.target.value)}
                    />
                    No
                  </label>
                </div>

                {hasChildren === "yes" && (
                  <div className="space-y-4 rounded-xl border border-black/10 bg-white/50 p-4">
                    <h3 className="text-center text-[#556B2F] font-serif text-lg">
                      Dependants
                    </h3>

                    {dependants.map((child, index) => (
                      <div
                        key={index}
                        className="space-y-3 rounded-xl border border-black/10 bg-white p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-neutral-800">
                            Child #{index + 1}
                          </p>

                          {dependants.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDependant(index)}
                              className="text-sm text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            value={child.firstName}
                            onChange={(e) =>
                              updateDependant(
                                index,
                                "firstName",
                                e.target.value
                              )
                            }
                            className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                          />

                          <input
                            type="text"
                            placeholder="Last Name"
                            value={child.lastName}
                            onChange={(e) =>
                              updateDependant(index, "lastName", e.target.value)
                            }
                            className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                          />

                          <input
                            type="text"
                            placeholder="Birthday (MM/DD/YYYY)"
                            value={child.birthday}
                            onChange={(e) =>
                              updateDependant(index, "birthday", e.target.value)
                            }
                            className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30 sm:col-span-2"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addDependant}
                      className="w-full rounded-xl border border-[#556B2F]/40 bg-white px-4 py-3 text-sm text-[#556B2F] hover:bg-[#556B2F]/5 transition"
                    >
                      + Add another child
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7E9A45] text-white py-3 rounded-xl shadow-md hover:brightness-95 transition"
            >
              Submit Membership Info
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}