import { useEffect, useState } from "react";
import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);  // Holds notifications
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // Controls dropdown visibility

  // Request permission for notifications
  async function requestPermission() {
    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, {
        vapidKey:
          "BGuTOosHebe2VhcdlLjIO7rqaII2nTw29vXh1LZhvB1_2KXDNmzVkyViZxU4O-jo16HgduKyF_zqowFInHYtxA8",
      });
      console.log("✅ FCM Token:", token);
    } else {
      console.warn("❌ Notification permission denied.");
    }
  }

  useEffect(() => {
    requestPermission();

    // Listen to foreground messages
    onMessage(messaging, (payload) => {
      console.log("🔥 Foreground message received:", payload);

      const notification = payload.notification || {
        title: payload.data?.title || "No title",
        body: payload.data?.body || "No body",
      };

      setNotifications((prev) => {
        const newNotifications = [...prev, notification];
        console.log("Updated Notifications:", newNotifications);
        return newNotifications;
      });

      // Show native notification (if permission granted)
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.body,
          icon: notification.image || "/logo.png",
        });
      }
    });
  }, []);

  // Handle dropdown toggle click
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    console.log("Dropdown toggled:", !isDropdownOpen);
  };

  return (
    <div className="App">
      <h1>fcm-bell-app 🔔</h1>

      <div className="bell-container">
        {/* Bell icon */}
        <span
          className="bell-icon"
          onClick={toggleDropdown} // Toggle dropdown visibility
        >
          🔔
        </span>

        {/* Show notification badge */}
        {notifications.length > 0 && (
          <div className="notification-badge">{notifications.length}</div>
        )}

        {/* Notification dropdown */}
        {isDropdownOpen && (
          <div className="notification-dropdown">
            {notifications.length > 0 ? (
              notifications.map((note, index) => (
                <div key={index} className="notification-item">
                  <strong>{note.title}</strong>
                  <p>{note.body}</p>
                </div>
              ))
            ) : (
              <p>No notifications yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
