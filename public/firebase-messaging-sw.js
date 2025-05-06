importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyA48KcKhZ1YdZyOYxri_gtbNLK7hVB_9Zo",
    authDomain: "fcm-bell-app3.firebaseapp.com",
    projectId: "fcm-bell-app3",
    storageBucket: "fcm-bell-app3.firebasestorage.app",
    messagingSenderId: "688915007858",
    appId: "1:688915007858:web:409b564d76b88cbff1f5eb",
    measurementId: "G-09DTE1DJJN"
  };
  

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});