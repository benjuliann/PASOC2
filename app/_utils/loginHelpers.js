// Converts Firebase auth codes into user-friendly messages.
export function getFirebaseErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again.";

    case "auth/too-many-requests":
      return "Too many failed login attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";

    case "auth/popup-closed-by-user":
      return "Login popup closed before completing. Please try again.";

    default:
      return "An unexpected error occurred. Please try again.";
  }
}

// Checks if email is valid.
//  - Only allows for common email characters like letters, numbers and . _ or - 
//  - Doesn't allow spaces or weird characters like %,!, *, etc
export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
  return emailRegex.test(email.trim());
}

// Validates login form inputs before sending request to Firebase
export function validateLoginForm(email, password) {
  // Remove any spaces input
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  // Check if either field is empty
  if (!trimmedEmail || !trimmedPassword) {
    return "Please enter both email and password.";
  }

  // Check email format using regex
  if (!isValidEmail(trimmedEmail)) {
    return "Please enter a valid email address.";
  }

  // No validation errors
  return "";
}