import { useState, useEffect } from "react";
import HealthForm from "./components/HealthForm";
import RecentStats from "./components/RecentStats";
import OverallChart from "./components/OverallChart";
import WeeklyChart from "./components/WeeklyChart";
import "./App.css";
import "./App.css";

const STORAGE_KEY = "healthAndFitness";

// Read once, at startup
const loadRecords = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

function App() {
  const [records, setRecords] = useState(loadRecords);   // all health records
  const [isModalOpen, setIsModalOpen] = useState(false); // modal open/close
  const [mode, setMode] = useState("add");               // "add" | "edit"
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Save whenever records change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const openAddForm = () => {
    setMode("add");
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const openEditForm = (record) => {
    setMode("edit");
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (formData) => {
    if (mode === "add") {
      setRecords((prev) => [...prev, { id: Date.now(), ...formData }]);
    } else {
      setRecords((prev) =>
        prev.map((r) => (r.id === selectedRecord.id ? { ...r, ...formData } : r))
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

    return (
    <div className="app">
      <h1>Health And Fitness Tracker</h1>

      <div className="top-panel">
        <div className="add-card">
          <h3>Update Today's Data</h3>
          <button className="add-btn" onClick={openAddForm}>+ Add data</button>
        </div>
        <div className="weekly-area">
          {records.length > 0 ? (
            <WeeklyChart records={records} />
          ) : (
            <p className="muted">No data available</p>
          )}
        </div>
      </div>

      <div className="bottom">
        <RecentStats records={records} onEdit={openEditForm} onDelete={handleDelete} />
        <OverallChart records={records} />
      </div>

      {isModalOpen && (
        <HealthForm
          mode={mode}
          record={selectedRecord}
          onSubmit={handleSave}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default App;