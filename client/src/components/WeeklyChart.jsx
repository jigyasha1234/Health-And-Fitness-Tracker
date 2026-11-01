import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from "recharts";

function WeeklyChart({ records }) {

  return (
    <div className="weekly">
      <h2 className="weekly-title">Weekly Health Trends</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={records}>
          <CartesianGrid strokeDasharray="3 3" stroke="#888" />
          <XAxis dataKey="date" stroke="#eee" tick={{ fontSize: 11 }} />
          <YAxis stroke="#eee" tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="intake" name="Intake" fill="#9b30ff" />
          <Bar dataKey="burned" name="Burned" fill="#ff8c00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyChart;