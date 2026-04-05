'use server'
import { cookies } from 'next/headers'

export async function setAuthCookie(uid) {
  try {
    const cookieStore = await cookies();
    cookieStore.set('uuid', uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to set cookie:", error);
    return { success: false };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("uuid");
  redirect("/Login");
}