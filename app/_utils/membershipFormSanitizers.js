// Removes hidden/control characters that users should never really type
const stripControlChars = (s) => {
  return String(s ?? "").replace(/[\u0000-\u001F\u007F]/g, "");
};

// Removes angle brackets to reduce very basic script-like input
const stripDangerous = (s) => {
  return String(s ?? "").replace(/[<>]/g, "");
};

// Replaces repeated spaces with a single space
// Do NOT trim here, or spaces disappear while the user is typing
const normalizeWhitespace = (s) => {
  return String(s ?? "").replace(/\s+/g, " ");
};

// Keeps only digits
export const digitsOnly = (s) => {
  return String(s ?? "").replace(/\D/g, "");
};

// Lowercases email
export const normalizeEmail = (s) => {
  return normalizeWhitespace(s).toLowerCase();
};

// Formats a Canadian postal code nicely. "t2x1v4" -> "T2X 1V4"
export const normalizePostalCodeCA = (s) => {
  const value = normalizeWhitespace(s).toUpperCase().replace(/\s/g, "");

  if (value.length === 6) {
    return `${value.slice(0, 3)} ${value.slice(3)}`;
  }

  return value;
};

// Formats phone number as the user types
export const formatPhone = (value) => {
  const digits = digitsOnly(value).slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

// General text cleaning
// This applies the basic cleanup steps in one place
export const sanitizeText = (s) => {
  return normalizeWhitespace(stripDangerous(stripControlChars(s)));
};

// Turns names into title case. "john doe" -> "John Doe"
export const toTitleCase = (s) => {
  return String(s ?? "")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// This decides how each field should be sanitized
export const sanitizeByKey = (key, rawValue) => {
  const base = sanitizeText(rawValue);

  switch (key) {
    case "email":
      // email should be lowercase
      return normalizeEmail(base);

    case "phone":
      // phone should be formatted with dashes
      return formatPhone(rawValue);

    case "postalCode":
      // postal code should be uppercase and spaced properly
      return normalizePostalCodeCA(base);

    case "firstName":
    case "lastName":
    case "preferredName":
    case "city":
    case "address":
    case "name":
      // should look nicely capitalized
      return toTitleCase(base);

    case "currentOrgInvolvement":
    case "positionsHeld":
    case "addressPhilippines":
    case "birthday":
      // these just get basic text cleanup
      return base;

    default:
      // if we do not have a special rule, return original value
      return rawValue;
  }
};