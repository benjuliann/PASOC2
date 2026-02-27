"use client";

import { Field, Divider } from "./FormUI";

export default function MemberInfoSection({ form, errors, touched, REQUIRED, setField }) {
  const nameFields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "preferredName", label: "Preferred Name", placeholder: "If different from first name" },
    { key: "birthday", label: "Birthday", placeholder: "MM/DD/YYYY" },
  ];

  const addressFields = [
    { key: "address", label: "Address", className: "sm:col-span-2" },
    { key: "city", label: "City" },
    { key: "postalCode", label: "Postal Code", placeholder: "eg. A1A 1A1" },
  ];

  const contactFields = [
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Phone Number", placeholder: "XXX-XXX-XXXX" },
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
        errorKey={f.key}
      />
    ));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{renderFields(nameFields)}</div>

      <Divider />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{renderFields(addressFields)}</div>

      <Divider />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{renderFields(contactFields)}</div>
    </>
  );
}