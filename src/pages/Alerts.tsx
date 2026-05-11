import { useState } from 'react';
import { alerts, alertFilters } from '../data/alerts';

const colorMap: Record<string,{bg:string,border:string,icon:string}> = {
  danger: {bg:'#EF44440F',border:'#EF444440',icon:'#EF444420'},
  warning: {bg:'#F59E0B0F',border:'#F59E0B40',icon:'#F59E0B20'},
  error: {bg:'#EF44440F',border:'#EF444440',icon:'#EF444420'},
  info: {bg:'#0EA5FF0F',border:'#0EA5FF40',icon:'#0EA5FF20'},
  success: {bg:'#22C55E0F',border:'#22C55E40',icon:'#22C55E20'},
};

export default function Alerts() {
  const [filter, setFilter] = useState('Toutes');
  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-3xl font-bold text-white mb-8">Alertes</h1>
        <div className="flex gap-8 overflow-x-auto no-scrollbar border-b border-white/10">
          {alertFilters.map(f=>{
            const active = filter===f;
            return (
              <button key={f} onClick={()=>setFilter(f)} 
                className={`pb-4 text-base font-medium whitespace-nowrap relative transition-colors ${active?'text-white':'text-gray-text hover:text-white'}`}>
                {f}
                {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-t-full" />}
              </button>
            )
          })}
        </div>
      </div>
      <div className="px-5 pb-32 space-y-4 pt-2">
        {alerts.map((a,i) => {
          const c = colorMap[a.type] || colorMap.info;
          return (
            <div key={a.id} className="p-5 rounded-[24px] flex items-start gap-4" style={{background:c.bg,border:`1px solid ${c.border}`,animationDelay:`${i*40}ms`,animation:'fadeInUp 0.3s ease-out forwards',opacity:0}}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl" style={{background:c.icon}}>{a.icon}</div>
              <div className="flex-1 min-w-0 py-0.5">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="text-base font-bold text-white leading-tight">{a.title}</h3>
                  <span className="text-xs font-medium text-gray-text whitespace-nowrap mt-0.5">{a.time}</span>
                </div>
                <p className="text-sm font-medium text-gray-text leading-relaxed">{a.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
