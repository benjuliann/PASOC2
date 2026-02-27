"use client";

export default function EmailNotificationsSection({ form, errors, touched, setField }) {
  return (
    <>
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
    </>
  );
}