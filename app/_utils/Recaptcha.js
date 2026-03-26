// Takes token from the front end (the checkbox)
export async function verifyRecaptchaToken(token) {
  // Calls API route
  const res = await fetch("/api/recaptcha", {
    // Sends the token to /api/recaptcha
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  
  // Returns result (pass or fail)
  return res.json();
}