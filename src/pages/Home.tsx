import { Bell, ChevronDown } from 'lucide-react';
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
  const activeProjects = projects.filter(p => p.status === 'Actif').length;
  const inProgressProjects = projects.filter(p => p.status === 'En cours').length;
  const suspendedProjects = projects.filter(p => p.status === 'Terminé').length;
  const totalProjects = projects.length;

  return (
    <div className="page-enter" style={{ background: '#05070B' }}>
      {/* Hero skyline */}
      <div className="relative">
        <div className="absolute inset-0 h-[240px]">
          <img src="/images/skyline_bg.png" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3)' }} />
        </div>
        <div className="absolute inset-0 h-[240px]" style={{ background: 'linear-gradient(180deg, rgba(5,7,11,0.2) 0%, rgba(5,7,11,0.85) 70%, #05070B 100%)' }} />

        <div className="relative z-10 px-4 pt-12 pb-2">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-gold/40">
                <img src="/images/md_logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-gold font-bold text-base">M.Djité</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="relative p-2 rounded-lg" style={{ background: '#0C1422' }}>
                <Bell size={18} className="text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-danger rounded-full border border-dark" />
              </button>
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gold/40">
                <img src="/images/avatar_user.png" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-1">
            <p className="text-white font-bold text-lg">Bonjour</p>
            <p className="text-white font-bold text-lg">M. Djité 👋</p>
          </div>
          <p className="text-gray-text text-xs mb-3">Voici la vue d'ensemble de vos projets et investissements.</p>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-text text-[11px]">Vue globale</span>
            <button className="flex items-center gap-1 card-sm px-2.5 py-1 text-[11px] text-white">
              <span>Année en cours</span>
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 pb-6 space-y-3 -mt-1">
        {/* Total Investi */}
        <div className="card-gold">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-gold text-[11px] font-semibold">Total Investi</span>
          </div>
          <p className="text-white font-extrabold text-2xl">{formatFullAmount(totalInvested)} <span className="text-sm font-normal text-gray-text">FCFA</span></p>
        </div>

        {/* Revenus / Bénéfices */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card">
            <p className="text-gray-text text-[10px] mb-1">Revenus Totaux</p>
            <p className="text-white font-bold text-sm">{formatFullAmount(totalRevenues)} <span className="text-[10px] font-normal text-gray-text">FCFA</span></p>
          </div>
          <div className="card">
            <p className="text-gray-text text-[10px] mb-1">Bénéfices Totaux</p>
            <p className="text-success font-bold text-sm">{formatFullAmount(totalBenefits)} <span className="text-[10px] font-normal text-gray-text">FCFA</span></p>
          </div>
        </div>

        {/* Projets */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-bold text-sm">Projets</p>
            <p className="text-gray-text text-[11px]">Total : {totalProjects}</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { v: totalProjects, l: 'Total', c: 'text-gold' },
              { v: inProgressProjects, l: 'En cours', c: 'text-electric-blue' },
              { v: activeProjects, l: 'Actifs', c: 'text-success' },
              { v: suspendedProjects, l: 'Suspendus', c: 'text-warning' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <p className={`text-2xl font-extrabold ${s.c}`}>{s.v}</p>
                <p className="text-[9px] text-gray-text mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Répartition par Secteur */}
        <div className="card">
          <p className="text-white font-bold text-sm mb-3">Répartition par Secteur</p>
          <div className="flex items-center gap-3">
            <div style={{ width: 120, height: 120, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sectorData} cx="50%" cy="50%" innerRadius={32} outerRadius={52} paddingAngle={2} dataKey="value" stroke="none">
                    {sectorData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5">
              {sectorData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-[11px] text-gray-text">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
