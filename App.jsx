import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { fetchNotifications } from "./services/api";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData();
  }, [page]);

  const loadData = async () => {
    try {
      const res = await fetchNotifications({ page, limit: 10 });

      const list =
        res?.data ||
        res?.notifications ||
        res?.result ||
        [];

      setNotifications(Array.isArray(list) ? list : []);
    } catch (err) {
      setNotifications([]);
    }
  };

  const getColor = (type) => {
    if (type === "Placement") return "#22c55e";
    if (type === "Result") return "#3b82f6";
    if (type === "Event") return "#f59e0b";
    return "#64748b";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>All Notifications</h1>

      {notifications.map((item, i) => (
        <div
          key={i}
          style={{
            borderLeft: `6px solid ${getColor(item.Type)}`,
            padding: 12,
            margin: 10,
            background: "#f9fafb",
          }}
        >
          <b>{item.Type}</b> - {item.Message}
        </div>
      ))}

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>

        <span style={{ margin: 10 }}>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetchNotifications({
        notification_type: "Placement",
        limit: 5,
      });

      const list =
        res?.data ||
        res?.notifications ||
        res?.result ||
        [];

      setNotifications(Array.isArray(list) ? list : []);
    } catch (err) {
      setNotifications([]);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Priority Notifications</h1>

      {notifications.map((item, i) => (
        <div
          key={i}
          style={{
            padding: 10,
            margin: 10,
            background: "#fff7ed",
          }}
        >
          {item.Type} - {item.Message}
        </div>
      ))}
    </div>
  );
}

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 10, background: "#111827", color: "white" }}>
      <button onClick={() => navigate("/")} style={{ marginRight: 10 }}>
        All
      </button>
      <button onClick={() => navigate("/priority")}>
        Priority
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<AllNotifications />} />
        <Route path="/priority" element={<PriorityNotifications />} />
      </Routes>
    </>
  );
}

export default App;