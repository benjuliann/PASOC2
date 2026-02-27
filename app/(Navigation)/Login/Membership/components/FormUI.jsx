"use client";

export function Field({
  label,
  placeholder,
  value,
  onChange,
  className = "",
  type = "text",
  required = false,
  error = "",
  errorKey = "",
}) {
  return (
    <div 
      data-error-key={errorKey}
      className={`flex flex-col gap-1 ${className}`}>
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

export function Divider({ className = "" }) {
  return <div className={`mx-auto h-px w-full bg-[#556B2F]/60 ${className}`} />;
}

export function SectionTitle({ children, underlineWidth = "w-32", className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-[#556B2F] font-serif text-xl">{children}</h2>
      <div className={`mx-auto mt-1 h-[2px] ${underlineWidth} bg-[#556B2F]/60`} />
    </div>
  );
}