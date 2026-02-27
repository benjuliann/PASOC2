"use client";

import Link from "next/link";
import { useMemo,useState } from "react";
import { Divider, SectionTitle } from "./components/FormUI";
import MemberInfoSection from "./components/MemberInfoSection";
import AdditionalInfoSection from "./components/AdditionalInfoSection";
import ConsentSection from "./components/ConsentSection";
import EmailNotificationsSection from "./components/EmailNotificationsSection";
import DependantsSection from "./components/DependantsSection";


export default function MembershipForm() {
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

  // Validation 
  const validateField = (key, value) => {
    const v = typeof value === "string" ? value.trim() : value;

    if (REQUIRED.has(key)) {
      if (key === "agreedToPrivacy") {
        if (!value) return "You must agree to continue.";
      } else if (!v) {
        return "Required";
      }
    }

    // Name validation (letters, spaces, hyphen, apostrophe only)
    if (
      (key === "firstName" || key === "lastName" || key === "preferredName") &&
      v
    ) {
      const nameRegex = /^[A-Za-z\s'-]+$/;
      if (!nameRegex.test(v)) {
        return "Name can only contain letters.";
      }
    }

    // Email validation
    if (key === "email" && v) {
      if (!v.includes("@") || !v.includes(".")) {
        return "Enter a valid email.";
      }
    }

    // Phone validation (10 digits)
    if (key === "phone" && v) {
      const digits = v.replace(/\D/g, "");
      if (digits.length !== 10) {
        return "Enter a valid 10 digit phone number.";
      }
    }

    // Canadian postal code validation (ex: T2X 1V4)
    if (key === "postalCode" && v) {
      const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      if (!postalRegex.test(v)) {
        return "Enter a valid postal code (ex: T2X 1V4).";
      }
    }

  return "";
};

  const validateAll = (nextForm) => {
    const nextErrors = {};

    for (const key of REQUIRED) {
      const msg = validateField(key, nextForm[key]);
      if (msg) nextErrors[key] = msg;
    }

    if (nextForm.hasChildren === "yes") {
      nextForm.dependants.forEach((d, i) => {
        if (!String(d.firstName).trim()) nextErrors[`dep_${i}_firstName`] = "Required";
        if (!String(d.lastName).trim()) nextErrors[`dep_${i}_lastName`] = "Required";
        if (!String(d.birthday).trim()) nextErrors[`dep_${i}_birthday`] = "Required";
      });
    }

    return nextErrors;
  };

  const [showErrorModal, setShowErrorModal] = useState(false);

  // input normalization / sanitization helpers 
const stripControlChars = (s) => s.replace(/[\u0000-\u001F\u007F]/g, "");

// removes obvious script-y characters; keeps normal punctuation
const stripDangerous = (s) => s.replace(/[<>]/g, "");

const normalizeWhitespace = (s) => s.replace(/\s+/g, " ").trim();

const digitsOnly = (s) => s.replace(/\D/g, "");

const normalizeEmail = (s) => normalizeWhitespace(s).toLowerCase();

const normalizePostalCodeCA = (s) => {
  // "t2x1v4" -> "T2X 1V4"
  const v = normalizeWhitespace(s).toUpperCase().replace(/\s/g, "");
  if (v.length === 6) return `${v.slice(0, 3)} ${v.slice(3)}`;
  return v;
};

const normalizePhone = (s) => {
  // "403.123.4567" -> "403-123-4567" (if 10 digits)
  const d = digitsOnly(s);
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return d; // keep digits only if incomplete
};

const sanitizeText = (s) =>
  normalizeWhitespace(stripDangerous(stripControlChars(String(s ?? ""))));

const toTitleCase = (s) =>
  s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

const formatPhone = (value) => {
  const digits = String(value).replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

// Map per-field rules
const sanitizeByKey = (key, raw) => {
  const base = sanitizeText(raw);

  switch (key) {
    case "email":
      return normalizeEmail(base);
    case "phone":
      return formatPhone(raw);
    case "postalCode":
      return normalizePostalCodeCA(base);
    case "firstName":
    case "lastName":
    case "preferredName":
      return toTitleCase(base);
    case "city":
    case "address":
    case "currentOrgInvolvement":
    case "positionsHeld":
    case "addressPhilippines":
      return base;
    case "birthday":
      return base;
    default:
      return raw; 
  }
};
  // Field setters
  const setField = (key) => (e) => {
    const isCheckbox = e.target.type === "checkbox";
    const rawValue = isCheckbox ? e.target.checked : e.target.value;

    const value = isCheckbox ? rawValue : sanitizeByKey(key, rawValue);

    setForm((prev) => {
      const nextForm = { ...prev, [key]: value };

      setTouched((t) => ({ ...t, [key]: true }));
      setErrors((errs) => ({ ...errs, [key]: validateField(key, value) }));

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

  const updateDependant = (index, field, rawValue) => {
  const value = sanitizeByKey(field === "birthday" ? "birthday" : field, rawValue);

  setForm((prev) => {
    const nextDependants = prev.dependants.map((d, i) =>
      i === index ? { ...d, [field]: value } : d
    );
    const nextForm = { ...prev, dependants: nextDependants };

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

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

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

    if (Object.keys(nextErrors).length > 0) {
      setShowErrorModal(true);
      return; 
    }

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

      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg border border-black/10">
            <h2 className="font-serif text-2xl text-[#556B2F]">
              Form is incomplete!
            </h2>

            <p className="mt-2 text-sm text-black/70">
              Some required fields are missing or invalid.
              <br /> Go back and complete the fields marked in red.
            </p>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowErrorModal(false)}
                className="rounded-xl bg-[#7E9A45] px-4 py-2 text-white hover:brightness-95"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

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

            <MemberInfoSection
              form={form}
              errors={errors}
              touched={touched}
              REQUIRED={REQUIRED}
              setField={setField}
            />

            {/* Dependants */}
            <DependantsSection
              form={form}
              errors={errors}
              touched={touched}
              setField={setField}
              updateDependant={updateDependant}
              addDependant={addDependant}
              removeDependant={removeDependant}
            />

            <AdditionalInfoSection
              form={form}
              errors={errors}
              touched={touched}
              REQUIRED={REQUIRED}
              setField={setField}
            />

            <ConsentSection
              form={form}
              errors={errors}
              touched={touched}
              setField={setField}
            />

            <EmailNotificationsSection
              form={form}
              errors={errors}
              touched={touched}
              setField={setField}
            />

            <Divider className="bg-black/40" />

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