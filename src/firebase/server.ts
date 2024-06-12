import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const ACTIVE_APPS = getApps();
const SERVICE_ACCOUNT = {
  type: "service_account",
  project_id: import.meta.env.FB_PROJECT_ID,
  private_key_id: import.meta.env.FB_PRIVATE_KEY_ID,
  private_key: import.meta.env.FB_PRIVATE_KEY,
  client_email: import.meta.env.FB_CLIENT_EMAIL,
  client_id: import.meta.env.FB_CLIENT_ID,
  auth_uri: import.meta.env.FB_AUTH_URI,
  token_uri: import.meta.env.FB_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FB_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FB_CLIENT_CERT_URL,
};

export const app = ACTIVE_APPS.length === 0 ? initializeApp({
  credential: cert(SERVICE_ACCOUNT as ServiceAccount),
}) : ACTIVE_APPS[0];

export const db = getFirestore(app);

import type { AstroCookies } from 'astro'
import { getAuth } from 'firebase-admin/auth'

export async function get_user_session(wrapped_cookie: AstroCookies) {
  if(!wrapped_cookie) return null;
  const COOKIE : string |undefined = wrapped_cookie.get('__session')?.value;
  if(!COOKIE) return null;
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