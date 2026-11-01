function RecentStats({ records, onEdit, onDelete }) {
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="recent">
      <h2 className="section-title title-dot">Recent Health Statistics</h2>
      {sorted.length === 0 ? (
        <p className="muted">No Progress to show!</p>
      ) : (
        <ul className="stats-list">
          {sorted.map((r) => (
            <li key={r.id} className="stat-card">
              <div>
                <p className="muted">{r.description}</p>                
                <p>Calories Intake: {r.intake} kcal | Calories Burned: {r.burned} kcal</p>
              </div>
              <div className="card-actions">
                <strong>{r.date}</strong>
                <button onClick={() => onEdit(r)}>Edit</button>
                <button className="danger" onClick={() => onDelete(r.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RecentStats;