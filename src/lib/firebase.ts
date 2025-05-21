import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

let auth: Auth | null = null;

if(typeof window !== "undefined"){
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  };

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { auth };
