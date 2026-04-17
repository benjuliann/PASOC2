import { isValidEmail } from "./loginHelpers";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// This is for your live password checklist UI, returns true/false for each rule
export const getPasswordChecks = (password) => {
  const value = String(password || "");

  return {
    minLength: value.length >= 8,
    hasUpper: /[A-Z]/.test(value),
    hasLower: /[a-z]/.test(value),
    hasNumber: /\d/.test(value),
    hasSpecial: /[@$!%*?&]/.test(value),
  };
};

// Validates a single field
// key = which field we are checking
// value = current value for that field
// currentForm = whole form, needed for things like confirm password
// requiredFields = Set of required field names
export const validateField = (key, value, currentForm, requiredFields) => {
  const v = typeof value === "string" ? value.trim() : value;

  // Step 1: required field check
  if (requiredFields.has(key)) {
    if (key === "agreedToPrivacy") {
      // checkbox must be checked
      if (!value) {
        return "You must agree to continue.";
      }
    } else if (!v) {
      return "Required";
    }
  }

  // Step 2: name validation
  // only letters, spaces, apostrophe, hyphen
  if (
    (key === "firstName" || key === "lastName" || key === "preferredName") &&
    v
  ) {
    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (!nameRegex.test(v)) {
      return "Name can only contain letters.";
    }
  }

  // Step 3: email validation
  if (key === "email" && v) {
    if (!isValidEmail(v)) {
      return "Enter a valid email.";
    }
  }

  // Step 4: password validation
  if (key === "password" && v) {
    if (!passwordRegex.test(v)) {
      return "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
  }

  // Step 5: confirm password must match password
  if (key === "confirmPassword" && v) {
    if (v !== currentForm.password) {
      return "Passwords do not match.";
    }
  }

  // Step 6: phone number must be 10 digits
  if (key === "phone" && v) {
    const digits = String(v).replace(/\D/g, "");

    if (digits.length !== 10) {
      return "Enter a valid 10 digit phone number.";
    }
  }

  // Step 7: Canadian postal code format
  if (key === "postalCode" && v) {
    const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    if (!postalRegex.test(v)) {
      return "Enter a valid postal code (ex: T2X 1V4).";
    }
  }

  // No validation errors
  return "";
};

// Validates the entire form on submit
export const validateAll = (form, requiredFields) => {
  const nextErrors = {};

  const fieldsToValidate = new Set([
    ...requiredFields,
    "firstName",
    "lastName",
    "preferredName",
    "birthday",
    "address",
    "city",
    "postalCode",
    "email",
    "phone",
    "password",
    "confirmPassword",
    "currentOrgInvolvement",
    "positionsHeld",
    "addressPhilippines",
    "hasChildren",
  ]);

  // Validate every required top-level field
  for (const key of fieldsToValidate) {
    const message = validateField(key, form[key], form, requiredFields);

    if (message) {
      nextErrors[key] = message;
    }
  }

  // If the user said they have children, then each dependant must also be filled in
  if (form.hasChildren === "yes") {
    form.dependants.forEach((dependant, index) => {
      if (!String(dependant.firstName).trim()) {
        nextErrors[`dep_${index}_firstName`] = "Required";
      }

      if (!String(dependant.lastName).trim()) {
        nextErrors[`dep_${index}_lastName`] = "Required";
      }

      if (!String(dependant.birthday).trim()) {
        nextErrors[`dep_${index}_birthday`] = "Required";
      }
    });
  }

  return nextErrors;
};