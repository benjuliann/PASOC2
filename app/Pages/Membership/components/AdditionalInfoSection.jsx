"use client";

import { Divider, Field, SectionTitle } from "./FormUI";

export default function AdditionalInfoSection({ form, errors, touched, REQUIRED, setField }) {
  const additionalFields = [
    {
      key: "currentOrgInvolvement",
      label: "Current Involvement in Organization",
      className: "sm:col-span-2",
    },
    { key: "positionsHeld", label: "Position(s) Held)" },
    {
      key: "addressPhilippines",
      label: "Address in the Philippines",
      placeholder: "if applicable",
    },
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

  return (
    <>
      <Divider />

      <SectionTitle underlineWidth="w-60">
        Additional Information (Optional)
      </SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderFields(additionalFields)}
      </div>
    </>
  );
}