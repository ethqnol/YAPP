import { app } from "../firebase/server"
import { getAuth } from 'firebase-admin/auth'
import type { AstroCookies } from "astro";

export default async function get_user_session(wrapped_cookie: AstroCookies) {
  if (!wrapped_cookie) return null;
  const COOKIE: string | undefined = wrapped_cookie.get('__session')?.value;
  if (!COOKIE) return null;
  const AUTH = getAuth(app);
  try {
    const decodedIdToken = await AUTH.verifySessionCookie(COOKIE, true);
    const user = await AUTH.getUser(decodedIdToken.uid);
    return user;
  } catch (error) {
    console.log(error)
    return null;
  }
}