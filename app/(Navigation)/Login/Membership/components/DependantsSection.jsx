"use client";

import { Field, Divider } from "./FormUI";

export default function DependantsSection({
  form,
  errors,
  touched,
  setField,
  updateDependant,
  addDependant,
  removeDependant,
}) {
  return (
    <>
      <Divider />

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
                  <span className="text-black/80">Child #{i + 1}</span>

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
                    error={touched[`dep_${i}_firstName`] ? errors[`dep_${i}_firstName`] : ""}
                  />

                  <Field
                    label="Last Name"
                    placeholder="Last Name"
                    value={child.lastName}
                    onChange={(e) => updateDependant(i, "lastName", e.target.value)}
                    required
                    error={touched[`dep_${i}_lastName`] ? errors[`dep_${i}_lastName`] : ""}
                  />

                  <Field
                    label="Birthday"
                    placeholder="MM/DD/YYYY"
                    value={child.birthday}
                    onChange={(e) => updateDependant(i, "birthday", e.target.value)}
                    required
                    className="sm:col-span-2"
                    error={touched[`dep_${i}_birthday`] ? errors[`dep_${i}_birthday`] : ""}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addDependant}
              className="w-full bg-[#7E9A45] text-white py-3 rounded-xl shadow-md hover:brightness-95 transition"
            >
              + Add another child
            </button>
          </div>
        )}
      </div>
    </>
  );
}