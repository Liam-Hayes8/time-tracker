import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import type { ServiceAccount } from "firebase-admin";

// We’ll cache our initialized Auth instance here:
let cachedAuth: Auth | null = null;

function getAdminAuth(): Auth {
  if (cachedAuth) return cachedAuth;

  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!key) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY not set");
  }

  // Only parse when we actually need it at request time:
  const serviceAccount = JSON.parse(key) as ServiceAccount;

  const app = getApps().length > 0 ? getApp() : initializeApp({ credential: cert(serviceAccount) });
  cachedAuth = getAuth(app);
  return cachedAuth;
}

export { getAdminAuth };
