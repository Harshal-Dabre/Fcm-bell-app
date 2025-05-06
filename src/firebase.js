import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA48KcKhZ1YdZyOYxri_gtbNLK7hVB_9Zo",
  authDomain: "fcm-bell-app3.firebaseapp.com",
  projectId: "fcm-bell-app3",
  storageBucket: "fcm-bell-app3.firebasestorage.app",
  messagingSenderId: "688915007858",
  appId: "1:688915007858:web:409b564d76b88cbff1f5eb",
  measurementId: "G-09DTE1DJJN",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
