import { useState } from 'react';
import { alerts, alertFilters } from '../data/alerts';

const colorMap: Record<string,{bg:string,border:string,icon:string}> = {
  danger: {bg:'#EF44440A',border:'#EF444430',icon:'#EF444415'},
  warning: {bg:'#F59E0B0A',border:'#F59E0B30',icon:'#F59E0B15'},
  error: {bg:'#EF44440A',border:'#EF444430',icon:'#EF444415'},
  info: {bg:'#0EA5FF0A',border:'#0EA5FF30',icon:'#0EA5FF15'},
  success: {bg:'#22C55E0A',border:'#22C55E30',icon:'#22C55E15'},
};

export default function Alerts() {
  const [filter, setFilter] = useState('Toutes');
  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-2">
        <h1 className="text-lg font-bold text-white mb-4">Alertes</h1>
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {alertFilters.map(f=>(
            <button key={f} onClick={()=>setFilter(f)} className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${filter===f?'bg-gold text-dark':'text-gray-text'}`}
              style={filter!==f?{background:'#0C1422',border:'1px solid #1C2A3A'}:{}}>{f}</button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-6 space-y-2.5">
        {alerts.map((a,i) => {
          const c = colorMap[a.type] || colorMap.info;
          return (
            <div key={a.id} className="p-3.5 rounded-xl flex items-start gap-3" style={{background:c.bg,border:`1px solid ${c.border}`,animationDelay:`${i*50}ms`,animation:'fadeInUp 0.35s ease-out forwards',opacity:0}}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm" style={{background:c.icon}}>{a.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <h3 className="text-[13px] font-semibold text-white">{a.title}</h3>
                  <span className="text-[9px] text-gray-text whitespace-nowrap">{a.time}</span>
                </div>
                <p className="text-[11px] text-gray-text leading-relaxed">{a.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
