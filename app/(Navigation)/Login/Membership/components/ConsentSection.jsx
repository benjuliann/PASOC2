"use client";

import { Divider, SectionTitle } from "./FormUI";

export default function ConsentSection({ form, errors, touched, setField }) {
  return (
    <>
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
    </>
  );
}