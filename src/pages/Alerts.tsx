import { useState } from 'react';
import { alerts, alertFilters } from '../data/alerts';

const typeColorMap: Record<string, { bg: string; border: string; iconBg: string }> = {
  'danger': { bg: 'rgba(239, 68, 68, 0.06)', border: 'rgba(239, 68, 68, 0.2)', iconBg: 'rgba(239, 68, 68, 0.15)' },
  'warning': { bg: 'rgba(245, 158, 11, 0.06)', border: 'rgba(245, 158, 11, 0.2)', iconBg: 'rgba(245, 158, 11, 0.15)' },
  'error': { bg: 'rgba(239, 68, 68, 0.06)', border: 'rgba(239, 68, 68, 0.2)', iconBg: 'rgba(239, 68, 68, 0.15)' },
  'info': { bg: 'rgba(14, 165, 255, 0.06)', border: 'rgba(14, 165, 255, 0.2)', iconBg: 'rgba(14, 165, 255, 0.15)' },
  'success': { bg: 'rgba(34, 197, 94, 0.06)', border: 'rgba(34, 197, 94, 0.2)', iconBg: 'rgba(34, 197, 94, 0.15)' },
};

export default function Alerts() {
  const [activeFilter, setActiveFilter] = useState('Toutes');

  return (
    <div className="page-enter bg-dark">
      {/* Header - sticky */}
      <div className="sticky top-0 z-20 bg-dark px-5 pt-12 pb-3">
        <h1 className="text-xl font-bold text-white mb-5">Alertes</h1>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scroll-hidden pb-1">
          {alertFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-gold text-dark'
                  : 'bg-dark-card text-gray-text border border-gray-border/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="px-5 pb-8 space-y-3">
        {alerts.map((alert, i) => {
          const colors = typeColorMap[alert.type];
          return (
            <div
              key={alert.id}
              className="rounded-3xl p-4 flex items-start gap-3 transition-all"
              style={{ 
                backgroundColor: colors.bg,
                border: `1px solid ${colors.border}`,
                animationDelay: `${i * 80}ms`, 
                animation: 'fadeInUp 0.4s ease-out forwards', 
                opacity: 0 
              }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg" style={{
                backgroundColor: colors.iconBg,
              }}>
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
