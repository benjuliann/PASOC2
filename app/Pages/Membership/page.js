"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

function Field({
  label,
  placeholder,
  value,
  onChange,
  className = "",
  type = "text",
  required = false,
  error = "",
}) {
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
        required={required}
        className={`w-full rounded-xl bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30 ${
          error ? "border border-red-500" : "border border-black/25"
        }`}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
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
  const REQUIRED = useMemo(
    () =>
      new Set([
        "firstName",
        "lastName",
        "birthday",
        "address",
        "city",
        "postalCode",
        "email",
        "phone",
        "emailNotifications",
        "agreedToPrivacy",
        "hasChildren",
      ]),
    []
  );

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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* Validation */
  const validateField = (key, value) => {
    const v = typeof value === "string" ? value.trim() : value;

    if (REQUIRED.has(key)) {
      if (key === "agreedToPrivacy") {
        if (!value) return "You must agree to continue.";
      } else if (!v) {
        return "Required";
      }
    }

    if (key === "email" && v) {
      if (!v.includes("@") || !v.includes(".")) return "Enter a valid email.";
    }

    return "";
  };

  const validateAll = (nextForm) => {
    const nextErrors = {};

    // validate required + email format
    for (const key of REQUIRED) {
      const msg = validateField(key, nextForm[key]);
      if (msg) nextErrors[key] = msg;
    }

    // if children = yes, dependant fields required
    if (nextForm.hasChildren === "yes") {
      nextForm.dependants.forEach((d, i) => {
        if (!String(d.firstName).trim()) nextErrors[`dep_${i}_firstName`] = "Required";
        if (!String(d.lastName).trim()) nextErrors[`dep_${i}_lastName`] = "Required";
        if (!String(d.birthday).trim()) nextErrors[`dep_${i}_birthday`] = "Required";
      });
    }

    return nextErrors;
  };

  /* Field setters */
  const setField = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((prev) => {
      const nextForm = { ...prev, [key]: value };

      setTouched((t) => ({ ...t, [key]: true }));
      setErrors((errs) => ({ ...errs, [key]: validateField(key, value) }));

      // If they switch to "no", clear dependant errors/touched (clean UI)
      if (key === "hasChildren" && value === "no") {
        setErrors((errs) => {
          const copy = { ...errs };
          Object.keys(copy).forEach((k) => k.startsWith("dep_") && delete copy[k]);
          return copy;
        });
        setTouched((t) => {
          const copy = { ...t };
          Object.keys(copy).forEach((k) => k.startsWith("dep_") && delete copy[k]);
          return copy;
        });
      }

      return nextForm;
    });
  };

  const updateDependant = (index, field, value) => {
    setForm((prev) => {
      const nextDependants = prev.dependants.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      );
      const nextForm = { ...prev, dependants: nextDependants };

      // live validation for dependant fields only when hasChildren=yes
      if (nextForm.hasChildren === "yes") {
        const errorKey = `dep_${index}_${field}`;
        setTouched((t) => ({ ...t, [errorKey]: true }));
        setErrors((errs) => ({
          ...errs,
          [errorKey]: String(value).trim() ? "" : "Required",
        }));
      }

      return nextForm;
    });
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

    //clear errors/touched for that removed dependant index
    setErrors((errs) => {
      const copy = { ...errs };
      Object.keys(copy).forEach((k) => k.startsWith(`dep_${index}_`) && delete copy[k]);
      return copy;
    });
    setTouched((t) => {
      const copy = { ...t };
      Object.keys(copy).forEach((k) => k.startsWith(`dep_${index}_`) && delete copy[k]);
      return copy;
    });
  };

  /* Field configs */
  const nameFields = [
    { key: "firstName", label: "First Name"},
    { key: "lastName", label: "Last Name"},
    { key: "preferredName", label: "Preferred Name", placeholder: "If different from first name" },
    { key: "birthday", label: "Birthday", placeholder: "MM/DD/YYYY" },
  ];

  const addressFields = [
    { key: "address", label: "Address", className: "sm:col-span-2" },
    { key: "city", label: "City"},
    { key: "postalCode", label: "Postal Code", placeholder: "eg. A1A 1A1" },
  ];

  const contactFields = [
    { key: "email", label: "Email Address"},
    { key: "phone", label: "Phone Number", placeholder: "XXX-XXX-XXXX" },
  ];

  const additionalFields = [
    {
      key: "currentOrgInvolvement",
      label: "Current Involvement in Organization",
      className: "sm:col-span-2",
    },
    { key: "positionsHeld", label: "Position(s) Held)"},
    { key: "addressPhilippines", label: "Address in the Philippines", placeholder: "if applicable" },
  ];

  const renderFields = (fields) =>
    fields.map((f) => (
      <Field
        key={f.key}
        label={f.label}
        placeholder={f.placeholder}
        value={form[f.key]}
        onChange={setField(f.key)}
        required={REQUIRED.has(f.key)}
        className={f.className || ""}
        type={f.type || "text"}
        error={touched[f.key] ? errors[f.key] : ""}
      />
    ));

  /* Submit */
  const handleSubmit = (e) => {
    e.preventDefault();

    // touch required fields so errors show
    const touchThese = {};
    for (const key of REQUIRED) touchThese[key] = true;

    if (form.hasChildren === "yes") {
      form.dependants.forEach((_, i) => {
        touchThese[`dep_${i}_firstName`] = true;
        touchThese[`dep_${i}_lastName`] = true;
        touchThese[`dep_${i}_birthday`] = true;
      });
    }

    setTouched((t) => ({ ...t, ...touchThese }));

    const nextErrors = validateAll(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    alert("✅ Looks good! Continue to payment.");
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

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <SectionTitle className="mt-4">Member Information</SectionTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderFields(nameFields)}
            </div>

            <Divider />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderFields(addressFields)}
            </div>

            <Divider />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderFields(contactFields)}
            </div>

            {/* Dependants */}
            <div className="space-y-2 rounded-xl border border-black/10 bg-white/50 p-4">
              <p className="text-xs uppercase text-black/80">
                Do you have children to add to the file?
              </p>

              <div className="flex gap-6 text-sm">
                {[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 text-black/80">
                    <input
                      type="radio"
                      name="hasChildren"
                      value={opt.value}
                      checked={form.hasChildren === opt.value}
                      onChange={setField("hasChildren")}
                      required
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {touched.hasChildren && errors.hasChildren ? (
                <p className="text-xs text-red-600">{errors.hasChildren}</p>
              ) : null}

              {form.hasChildren === "yes" && (
                <div className="mt-2 space-y-4">
                  {form.dependants.map((child, i) => (
                    <div
                      key={i}
                      className="space-y-3 rounded-xl border border-black/10 bg-white p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span>Child #{i + 1}</span>

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
                        <Field
                          label="First Name"
                          placeholder="First Name"
                          value={child.firstName}
                          onChange={(e) => updateDependant(i, "firstName", e.target.value)}
                          required
                          error={
                            touched[`dep_${i}_firstName`]
                              ? errors[`dep_${i}_firstName`]
                              : ""
                          }
                        />

                        <Field
                          label="Last Name"
                          placeholder="Last Name"
                          value={child.lastName}
                          onChange={(e) => updateDependant(i, "lastName", e.target.value)}
                          required
                          error={
                            touched[`dep_${i}_lastName`]
                              ? errors[`dep_${i}_lastName`]
                              : ""
                          }
                        />

                        <Field
                          label="Birthday"
                          placeholder="MM/DD/YYYY"
                          value={child.birthday}
                          onChange={(e) => updateDependant(i, "birthday", e.target.value)}
                          required
                          className="sm:col-span-2"
                          error={
                            touched[`dep_${i}_birthday`]
                              ? errors[`dep_${i}_birthday`]
                              : ""
                          }
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

            <Divider />

            <SectionTitle underlineWidth="w-60">
              Additional Information (Optional)
            </SectionTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderFields(additionalFields)}
            </div>

            <Divider />

            <SectionTitle underlineWidth="w-32">Informed Consent</SectionTitle>

            <div className="text-xs sm:text-base text-black/80 leading-relaxed space-y-4">
              <p>
                By submitting this membership form, you consent to the collection, use,
                and storage of your personal information by Pangasinan Society of Calgary
                (PASOC) for the purpose of managing your membership and providing related
                services.
              </p>

              <p>
                We are committed to protecting your privacy and handling your personal
                information in accordance with the Privacy Act and all applicable privacy
                regulations. Your information will be stored securely and will only be
                accessed by authorized personnel. It will not be shared with third parties
                without your consent, except as required by law.
              </p>

              <p>
                You have the right to access, update, or request correction of your
                personal information at any time by contacting us at{" "}
                <span className="font-medium">[contact email or phone number]</span>.
              </p>

              <p>
                By signing or submitting this form, you acknowledge that you have read and
                understood this notice and consent to the collection, use, and storage of
                your personal information as described above.
              </p>
            </div>

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

            {touched.agreedToPrivacy && errors.agreedToPrivacy ? (
              <p className="text-xs text-red-600">{errors.agreedToPrivacy}</p>
            ) : null}

            <div className="mx-auto h-px w-full bg-black/40" />

            {/* Email notifications */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6 py-2">
              <p className="text-center text-xs sm:text-base text-black/80">
                Would you like to receive email notifications?
              </p>

              <div className="flex justify-center gap-10 text-sm">
                {[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex flex-col items-center gap-2 text-black/70"
                  >
                    <input
                      type="radio"
                      name="emailNotifications"
                      value={opt.value}
                      checked={form.emailNotifications === opt.value}
                      onChange={setField("emailNotifications")}
                      required
                      className="h-5 w-5 accent-[#7E9A45]"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {touched.emailNotifications && errors.emailNotifications ? (
                <p className="text-xs text-red-600 text-center">{errors.emailNotifications}</p>
              ) : null}
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