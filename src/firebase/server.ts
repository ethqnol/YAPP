import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const activeApps = getApps();
const serviceAccount = {
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

export const app = activeApps.length === 0 ? initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
}) : activeApps[0];

export const db = getFirestore(app);

import type { AstroCookies } from 'astro'
import { getAuth } from 'firebase-admin/auth'

export async function getSessionUser(wrapped_cookie: AstroCookies) {
  if(!wrapped_cookie) return null;
  const cookie : string |undefined = wrapped_cookie.get('__session')?.value;
  if(!cookie) return null;
  const auth = getAuth(app);
  try {
    const decodedIdToken = await auth.verifySessionCookie(cookie, true);
    const user = await auth.getUser(decodedIdToken.uid);
    return user;
  } catch (error) {
    return null;
  }
}