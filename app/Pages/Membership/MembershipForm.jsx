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

  /* Field setters */
  const setField = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

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

  const updateDependant = (index, field, value) => {
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

  /* Submit */
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