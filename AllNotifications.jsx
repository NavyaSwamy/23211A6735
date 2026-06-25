import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/api";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [page]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetchNotifications({
        page,
        limit: 10,
      });

      // safe API handling (handles all response shapes)
      const list =
        res?.data ||
        res?.notifications ||
        res?.result ||
        [];

      setNotifications(Array.isArray(list) ? list : []);
    } catch (err) {
      setError("Failed to load notifications");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (type) => {
    if (type === "Placement") return "#22c55e";
    if (type === "Result") return "#3b82f6";
    if (type === "Event") return "#f59e0b";
    return "#64748b";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "25px",
          fontSize: "2.5rem",
        }}
      >
        All Notifications
      </h1>

      {/* LOADING */}
      {loading && (
        <p style={{ color: "white", textAlign: "center" }}>
          Loading notifications...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading && notifications.length === 0 && (
        <p style={{ color: "white", textAlign: "center" }}>
          No notifications found
        </p>
      )}

      {/* CARDS */}
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          display: "grid",
          gap: "15px",
        }}
      >
        {notifications.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderLeft: `8px solid ${getColor(item.Type)}`,
              borderRadius: "15px",
              padding: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              transition: "0.3s",
              cursor: "pointer",
            }}
          >
            <h3 style={{ margin: 0 }}>
              #{(page - 1) * 10 + index + 1} • {item.Type}
            </h3>

            <p
              style={{
                marginTop: "8px",
                color: "#475569",
                fontSize: "16px",
              }}
            >
              {item.Message}
            </p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "25px",
          gap: "15px",
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#334155",
            color: "white",
            cursor: "pointer",
          }}
        >
          Prev
        </button>

        <span style={{ color: "white", paddingTop: "8px" }}>
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#334155",
            color: "white",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllNotifications;