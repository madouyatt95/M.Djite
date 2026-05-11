import { Bell, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { projects, formatFullAmount, getTotalInvested, getTotalRevenues, getTotalBenefits } from '../data/projects';

const sectorData = [
  { name: 'Agriculture', value: 15, color: '#D4AF37' },
  { name: 'Loisirs', value: 30, color: '#0EA5FF' },
  { name: 'Immobilier', value: 20, color: '#8B5CF6' },
  { name: 'Commerce', value: 10, color: '#22C55E' },
  { name: 'Transport', value: 15, color: '#F59E0B' },
  { name: 'Autres', value: 10, color: '#EF4444' },
];

export default function Home() {
  const totalInvested = getTotalInvested();
  const totalRevenues = getTotalRevenues();
  const totalBenefits = getTotalBenefits();
  
  const activeProjects = projects.filter(p => p.status === 'Actif').length;
  const inProgressProjects = projects.filter(p => p.status === 'En cours').length;
  const completedProjects = projects.filter(p => p.status === 'Terminé').length;
  const totalProjects = projects.length;

  return (
    <div className="page-enter">
      {/* Hero with skyline */}
      <div className="relative">
        <div className="absolute inset-0 h-[260px]">
          <img src="/images/skyline_bg.png" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3)' }} />
        </div>
        <div className="absolute inset-0 h-[260px]" style={{
          background: 'linear-gradient(to bottom, rgba(5,7,11,0.2) 0%, rgba(5,7,11,0.8) 60%, #05070B 100%)',
        }} />

        <div className="relative z-10 px-5 pt-12 pb-2">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-gold/40">
                <img src="/images/md_logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-gold font-bold text-lg">M.Djité</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl bg-dark-card">
                <Bell size={20} className="text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-dark" />
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold/40">
                <img src="/images/avatar_user.png" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <h1 className="text-xl font-bold text-white mb-1">Bonjour M. Djité 👋</h1>
          <p className="text-gray-text text-sm mb-3">Vue d'ensemble de vos investissements.</p>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-text text-xs">Vue globale</span>
            <button className="flex items-center gap-1 glass-card-sm px-3 py-1.5 text-xs text-white">
              <span>Année en cours</span>
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 pb-6 space-y-4 -mt-2">
        {/* Total Investi */}
        <div className="glass-card-gold p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">Total Investi</span>
          </div>
          <p className="text-3xl font-extrabold text-white">{formatFullAmount(totalInvested)}</p>
          <p className="text-xs text-gray-text mt-1">FCFA</p>
        </div>

        {/* Revenue / Benefits */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4">
            <p className="text-gray-text text-[10px] uppercase tracking-wider mb-2">Revenus Totaux</p>
            <p className="text-lg font-bold text-white">{formatFullAmount(totalRevenues)}</p>
            <p className="text-[10px] text-gray-text mt-0.5">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-gray-text text-[10px] uppercase tracking-wider mb-2">Bénéfices Totaux</p>
            <p className="text-lg font-bold text-success">{formatFullAmount(totalBenefits)}</p>
            <p className="text-[10px] text-gray-text mt-0.5">FCFA</p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Projets</h3>
            <span className="text-xs text-gray-text">Total : {totalProjects}</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: totalProjects, label: 'Total', color: 'text-gold' },
              { value: inProgressProjects, label: 'En cours', color: 'text-electric-blue' },
              { value: activeProjects, label: 'Actifs', color: 'text-success' },
              { value: completedProjects, label: 'Suspendus', color: 'text-warning' },
            ].map(stat => (
              <div key={stat.label} className="text-center py-3 rounded-2xl bg-dark/60 border border-white/5">
                <p className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-gray-text mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Donut */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-4">Répartition par Secteur</h3>
          <div className="flex items-center gap-4">
            <div style={{ width: 130, height: 130, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sectorData} cx="50%" cy="50%" innerRadius={36} outerRadius={58} paddingAngle={3} dataKey="value" stroke="none">
                    {sectorData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2.5">
              {sectorData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-text">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
