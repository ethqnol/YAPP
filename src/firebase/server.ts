import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import firebase from "firebase/compat/app";
import "firebase/functions";
import 'firebase/app-check';

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


