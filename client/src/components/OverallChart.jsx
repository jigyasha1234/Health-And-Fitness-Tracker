import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#9b30ff", "#ff8c00"]; // Intake purple, Burned orange

function OverallChart({ records }) {
  const totalIntake = records.reduce((s, r) => s + Number(r.intake), 0);
  const totalBurned = records.reduce((s, r) => s + Number(r.burned), 0);

  const data = [
    { name: "Intake", value: totalIntake },
    { name: "Burned", value: totalBurned },
  ];

  return (
    <section className="overall">
      <h2 className="section-title title-colon">Overall Data</h2>
      <div className="pie-wrap">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Legend verticalAlign="bottom" align="right" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default OverallChart;