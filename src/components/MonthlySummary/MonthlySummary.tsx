import React from 'react';
import { ExpenseCategory } from '../ExpenseCategories/ExpenseCategories';
import './MonthlySummary.css';

interface Props {
  categories: ExpenseCategory[];
}

const COLORS = ['#4fd1c5', '#2563eb', '#f7c59f', '#b08968', '#ff6b6b', '#ffe5b4', '#e6f6fb'];

function getPieSegments(data: { label: string; value: number }[]) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  return data.map((d, i) => {
    const startAngle = cumulative;
    const angle = (d.value / total) * 360;
    cumulative += angle;
    return {
      ...d,
      color: COLORS[i % COLORS.length],
      startAngle,
      endAngle: cumulative,
      percent: total ? Math.round((d.value / total) * 100) : 0,
    };
  });
}

const MonthlySummary: React.FC<Props> = ({ categories }) => {
  // Group by type
  const grouped = categories.reduce<Record<string, number>>((acc, cat) => {
    const value = parseFloat(cat.cost.replace('£', ''));
    if (!acc[cat.type]) acc[cat.type] = 0;
    acc[cat.type] += isNaN(value) ? 0 : value;
    return acc;
  }, {});

  const total = Object.values(grouped).reduce((sum, v) => sum + v, 0);

  // Pie chart data
  const pieData = Object.entries(grouped).map(([label, value]) => ({ label, value }));
  const segments = getPieSegments(pieData);

  // Pie chart rendering (SVG)
  const radius = 60;
  const viewBox = 2 * radius + 10;
  let lastAngle = 0;
  const center = radius + 5;

  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return [
      "M", start.x, start.y,
      "A", r, r, 0, largeArcFlag, 0, end.x, end.y,
      "L", cx, cy,
      "Z"
    ].join(" ");
  }

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + (r * Math.cos(rad)),
      y: cy + (r * Math.sin(rad))
    };
  }

  return (
    <div>
      <div className="monthly-summary-total">
        <span style={{ marginRight: 12, fontWeight: 400, color: '#b08968' }}>
          Total Spending This Month:
        </span>
        <span data-testid="monthly-total">£{total.toFixed(2)}</span>
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
        <svg
          data-testid="spending-pie-chart"
          width={viewBox}
          height={viewBox}
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          style={{ background: '#fff', borderRadius: '50%', boxShadow: '0 2px 8px rgba(38,99,235,0.06)' }}
        >
          {segments.map((seg, i) => {
            const path = describeArc(center, center, radius, seg.startAngle, seg.endAngle);
            return (
              <path
                key={seg.label}
                d={path}
                fill={seg.color}
                stroke="#fff"
                strokeWidth={2}
              />
            );
          })}
        </svg>
        <div>
          {segments.map(seg => (
            <div key={seg.label} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
              <span style={{
                display: 'inline-block',
                width: 16,
                height: 16,
                background: seg.color,
                borderRadius: '50%',
                marginRight: 8,
                border: '1px solid #eee'
              }} />
              <span style={{ fontWeight: 600, marginRight: 6 }}>{seg.label}</span>
              <span style={{ color: '#b08968', fontWeight: 500 }}>{seg.percent}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="category-cards">
        {Object.entries(grouped).map(([type, sum]) => (
          <div className="category-card" key={type}>
            <span className="category-title">{type}</span>
            <span className="category-amount" data-testid={`category-total-${type}`}>
              £{sum.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySummary;