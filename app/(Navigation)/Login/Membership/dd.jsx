"use client";

import { useMemo, useState } from "react";
import { Divider, SectionTitle } from "./components/FormUI";
import BackButton from "../../(Members)/UI/BackButton";
import MemberInfoSection from "./components/MemberInfoSection";
import AdditionalInfoSection from "./components/AdditionalInfoSection";
import ConsentSection from "./components/ConsentSection";
import EmailNotificationsSection from "./components/EmailNotificationsSection";
import DependantsSection from "./components/DependantsSection";

import { REQUIRED_FIELDS, initialMembershipForm} from "../../../_utils/membershipFormConfig";
import { sanitizeByKey } from "../../../_utils/membershipFormSanitizers";
import { getPasswordChecks, validateField, validateAll} from "../../../_utils/membershipFormValidators";


export default function MembershipForm() {
  // Convert required fields array into a Set
  const REQUIRED = useMemo(() => new Set(REQUIRED_FIELDS), []);
  // Main form state
  const [form, setForm] = useState(initialMembershipForm);
  // Error state
  const [errors, setErrors] = useState({});
  // Tracks whether user interacted with a field
  const [touched, setTouched] = useState({});
  // Controls incomplete form modal
  const [showErrorModal, setShowErrorModal] = useState(false);
  // Used for password checklist display
  const passwordChecks = getPasswordChecks(form.password);
  // Handles normal field changes
  const setField = (key) => (e) => {
    const isCheckbox = e.target.type === "checkbox";
    const rawValue = isCheckbox ? e.target.checked : e.target.value;
    const value = isCheckbox ? rawValue : sanitizeByKey(key, rawValue);

    setForm((prev) => {
      const nextForm = { ...prev, [key]: value };

      setTouched((t) => ({ ...t, [key]: true }));

      setErrors((errs) => {
        const updatedErrors = {
          ...errs,
          [key]: validateField(key, value, nextForm, REQUIRED),
        };

        if (key === "password") {
          updatedErrors.confirmPassword = validateField(
            "confirmPassword",
            nextForm.confirmPassword,
            nextForm,
            REQUIRED
          );
        }

        if (key === "confirmPassword") {
          updatedErrors.password = validateField(
            "password",
            nextForm.password,
            nextForm,
            REQUIRED
          );
        }

        return updatedErrors;
      });

      if (key === "hasChildren" && value === "no") {
        setErrors((errs) => {
          const copy = { ...errs };
          Object.keys(copy).forEach((k) => {
            if (k.startsWith("dep_")) delete copy[k];
          });
          return copy;
        });

        setTouched((t) => {
          const copy = { ...t };
          Object.keys(copy).forEach((k) => {
            if (k.startsWith("dep_")) delete copy[k];
          });
          return copy;
        });
      }

      return nextForm;
    });
  };

  // Handles dependant field changes
  const updateDependant = (index, field, rawValue) => {
    const value = sanitizeByKey(field === "birthday" ? "birthday" : field, rawValue);

    setForm((prev) => {
      const nextDependants = prev.dependants.map((dependant, i) =>
        i === index ? { ...dependant, [field]: value } : dependant
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

  // Add a new dependant row
  const addDependant = () => {
    setForm((prev) => ({
      ...prev,
      dependants: [
        ...prev.dependants,
        { firstName: "", lastName: "", birthday: "" },
      ],
    }));
  };

  // Remove a dependant row
  const removeDependant = (index) => {
    setForm((prev) => ({
      ...prev,
      dependants: prev.dependants.filter((_, i) => i !== index),
    }));

    setErrors((errs) => {
      const copy = { ...errs };
      Object.keys(copy).forEach((k) => {
        if (k.startsWith(`dep_${index}_`)) delete copy[k];
      });
      return copy;
    });

    setTouched((t) => {
      const copy = { ...t };
      Object.keys(copy).forEach((k) => {
        if (k.startsWith(`dep_${index}_`)) delete copy[k];
      });
      return copy;
    });
  };

  // Runs when user clicks submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const touchThese = {};

    for (const key of REQUIRED) {
      touchThese[key] = true;
    }

    if (form.hasChildren === "yes") {
      form.dependants.forEach((_, i) => {
        touchThese[`dep_${i}_firstName`] = true;
        touchThese[`dep_${i}_lastName`] = true;
        touchThese[`dep_${i}_birthday`] = true;
      });
    }

    setTouched((t) => ({ ...t, ...touchThese }));

    const nextErrors = validateAll(form, REQUIRED);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setShowErrorModal(true);
      return;
    }

    alert("✅ Looks good! Continue to payment.");
  };

  return (
    <main className="min-h-dvh bg-[#F4EFE7] relative overflow-y-auto md:overflow-hidden">
      <BackButton href="/" />

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
              passwordChecks={passwordChecks}
            />

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