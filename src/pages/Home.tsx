import { Bell, ChevronDown, Presentation, ChevronRight, Menu } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { projects, formatFullAmount, getTotalInvested, getTotalRevenues, getTotalBenefits } from '../data/projects';

const sectorData = [
  { name: 'Agriculture', value: 15, color: '#D4AF37' },
  { name: 'Loisirs', value: 30, color: '#0EA5FF' },
  { name: 'Immobilier', value: 10, color: '#8B5CF6' },
  { name: 'Commerce', value: 10, color: '#22C55E' },
  { name: 'Transport', value: 15, color: '#F59E0B' },
  { name: 'Autres', value: 20, color: '#EF4444' },
];

export default function Home() {
  const totalInvested = getTotalInvested();
  const totalRevenues = getTotalRevenues();
  const totalBenefits = getTotalBenefits();

  return (
    <div className="page-enter" style={{ background: '#05070B' }}>
      {/* Hero skyline */}
      <div className="relative">
        <div className="absolute inset-0 h-[280px]">
          <img src="/images/skyline_bg.png" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.4) contrast(1.2)' }} />
        </div>
        <div className="absolute inset-0 h-[280px]" style={{ background: 'linear-gradient(180deg, rgba(5,7,11,0.1) 0%, rgba(5,7,11,0.8) 60%, #05070B 100%)' }} />

        <div className="relative z-10 px-4 pt-12 pb-2">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-gold/30">
                <img src="/images/md_logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-gold font-bold text-lg">M.Djite</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative">
                <Bell size={20} className="text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-danger rounded-full border border-dark" />
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                <img src="/images/avatar_user.png" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-2">
            <h1 className="text-white font-bold text-[28px] leading-tight">Bonjour</h1>
            <h1 className="text-white font-bold text-[28px] leading-tight">M. Djité 👋</h1>
          </div>
          <p className="text-gray-text text-[13px] mb-4">Voici la vue d'ensemble de<br/>vos projets et investissements.</p>
          
          <div className="flex items-center mb-6">
            <button className="flex items-center justify-between w-[140px] px-3 py-2 rounded-xl text-[13px] text-white" style={{background: 'rgba(5,7,11,0.6)', border: '1px solid rgba(255,255,255,0.1)'}}>
              <span>Vue globale</span>
              <ChevronDown size={14} className="text-gray-text" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 pb-6 space-y-3 -mt-2">
        {/* Total Investi - BLUE CARD */}
        <div className="card-blue">
          <div className="flex items-center gap-2 mb-2">
            <Presentation size={14} className="text-electric-blue" />
            <span className="text-gray-text text-[12px] font-medium">Total Investi</span>
          </div>
          <p className="text-white font-bold text-[26px]">15,250,000,000 <span className="text-[12px] font-normal text-gray-text">FCFA</span></p>
        </div>

        {/* Revenus / Bénéfices - GREEN BORDER CARDS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-green">
            <p className="text-gray-text text-[11px] mb-1.5 font-medium">Revenus Totaux</p>
            <p className="text-white font-bold text-[16px]">25,780,000,000 <span className="text-[10px] font-normal text-gray-text">FCFA</span></p>
          </div>
          <div className="card-green">
            <p className="text-gray-text text-[11px] mb-1.5 font-medium">Bénéfices Totaux</p>
            <p className="text-white font-bold text-[16px]">10,530,000,000 <span className="text-[10px] font-normal text-gray-text">FCFA</span></p>
          </div>
        </div>

        {/* Projets */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-bold text-[16px]">Projets</h2>
            <button className="flex items-center text-gold text-[13px] font-medium">
              Voir <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { v: '12', l: 'Total Projets', c: 'text-gold' },
              { v: '7', l: 'En cours', c: 'text-gold' },
              { v: '3', l: 'Terminés', c: 'text-electric-blue' },
              { v: '2', l: 'Suspendus', c: 'text-danger' },
            ].map(s => (
              <div key={s.l} className="card-dark text-center flex flex-col justify-center items-center">
                <p className={`text-[20px] font-bold ${s.c} leading-tight`}>{s.v}</p>
                <p className="text-[9px] text-gray-text mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Répartition par Secteur */}
        <div className="pt-3">
          <h2 className="text-white font-bold text-[16px] mb-4">Répartition par Secteur</h2>
          <div className="flex items-center gap-4">
            <div style={{ width: 140, height: 140, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sectorData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value" stroke="none">
                    {sectorData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {sectorData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-[12px] text-gray-text">{item.name}</span>
                  </div>
                  <span className="text-[12px] text-gray-text">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
