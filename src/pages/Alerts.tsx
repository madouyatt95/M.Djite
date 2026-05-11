import { useState } from 'react';
import { alerts, alertFilters } from '../data/alerts';

const colors: Record<string, { bg: string; border: string; iconBg: string }> = {
  danger:  { bg: '#EF44440A', border: '#EF444433', iconBg: '#EF444420' },
  warning: { bg: '#F59E0B0A', border: '#F59E0B33', iconBg: '#F59E0B20' },
  error:   { bg: '#EF44440A', border: '#EF444433', iconBg: '#EF444420' },
  info:    { bg: '#0EA5FF0A', border: '#0EA5FF33', iconBg: '#0EA5FF20' },
  success: { bg: '#22C55E0A', border: '#22C55E33', iconBg: '#22C55E20' },
};

export default function Alerts() {
  const [activeFilter, setActiveFilter] = useState('Toutes');

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-2">
        <h1 className="text-xl font-bold text-white mb-4">Alertes</h1>
        <div className="flex gap-2 mb-4 overflow-x-auto scroll-hidden">
          {alertFilters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${activeFilter === f ? 'bg-gold text-dark' : 'bg-dark-card text-gray-text border border-gray-border/40'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-6 space-y-3">
        {alerts.map((alert, i) => {
          const c = colors[alert.type] || colors.info;
          return (
            <div key={alert.id} className="rounded-2xl p-4 flex items-start gap-3"
              style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, animationDelay: `${i * 60}ms`, animation: 'fadeInUp 0.4s ease-out forwards', opacity: 0 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base" style={{ backgroundColor: c.iconBg }}>
                {alert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">{alert.title}</h3>
                  <span className="text-[10px] text-gray-text whitespace-nowrap">{alert.time}</span>
                </div>
                <p className="text-xs text-gray-text leading-relaxed">{alert.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
