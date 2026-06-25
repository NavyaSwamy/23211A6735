import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/api";

function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetchNotifications({
      notification_type: "Placement",
      limit: 5,
    });

    const list =
      res?.data || res?.notifications || res?.result || [];

    setNotifications(list);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Priority Notifications</h1>

      {notifications.map((item, index) => (
        <div
          key={index}
          style={{
            padding: 10,
            margin: 10,
            background: "#fff3cd",
          }}
        >
          {item.Type} - {item.Message}
        </div>
      ))}
    </div>
  );
}

export default PriorityNotifications;