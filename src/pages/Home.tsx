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
    <div className="page-enter bg-dark">
      {/* Hero section with skyline */}
      <div className="relative min-h-[280px]">
        {/* Skyline background */}
        <div className="absolute inset-0">
          <img 
            src="/images/skyline_bg.png" 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.25)' }}
          />
        </div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(5,7,11,0.3) 0%, rgba(5,7,11,0.7) 60%, #05070B 100%)',
        }} />

        {/* Header */}
        <div className="relative z-10 px-5 pt-12 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden" style={{
                border: '1.5px solid rgba(212, 175, 55, 0.5)',
                boxShadow: '0 0 16px rgba(212, 175, 55, 0.15)',
              }}>
                <img src="/images/md_logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-gold font-bold text-lg tracking-wide" style={{
                textShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
              }}>M.Djité</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl" style={{
                background: 'rgba(11, 18, 32, 0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <Bell size={20} className="text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-danger rounded-full border-2 border-dark" style={{
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                }} />
              </button>
              <div className="w-11 h-11 rounded-full overflow-hidden" style={{
                border: '2px solid rgba(212, 175, 55, 0.5)',
                boxShadow: '0 0 16px rgba(212, 175, 55, 0.15)',
              }}>
                <img src="/images/avatar_user.png" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-3">
            <h1 className="text-[22px] font-bold text-white mb-1">
              Bonjour M. Djité 👋
            </h1>
            <p className="text-gray-text text-[13px] leading-relaxed">
              Voici la vue d'ensemble de vos projets et investissements.
            </p>
          </div>

          {/* View selector */}
          <div className="flex items-center gap-2">
            <span className="text-gray-text text-xs">Vue globale</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-white" style={{
              background: 'rgba(11, 18, 32, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.15)',
            }}>
              <span>Année en cours</span>
              <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 pb-8 space-y-4 -mt-4">
        
        {/* Total Investi Card - HERO */}
        <div className="glass-card-gold p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-gold" style={{
              boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)',
            }} />
            <span className="text-gold text-xs font-semibold tracking-wider uppercase">Total Investi</span>
          </div>
          <p className="text-[28px] font-extrabold text-white leading-tight">
            {formatFullAmount(totalInvested)}
          </p>
          <p className="text-xs text-gray-text mt-1">FCFA</p>
        </div>

        {/* Revenue and Benefits - 2 cols */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4">
            <p className="text-gray-text text-[11px] mb-2 uppercase tracking-wide">Revenus Totaux</p>
            <p className="text-[18px] font-bold text-white leading-tight">{formatFullAmount(totalRevenues)}</p>
            <p className="text-[10px] text-gray-text mt-1">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-gray-text text-[11px] mb-2 uppercase tracking-wide">Bénéfices Totaux</p>
            <p className="text-[18px] font-bold text-success leading-tight">{formatFullAmount(totalBenefits)}</p>
            <p className="text-[10px] text-gray-text mt-1">FCFA</p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[14px] font-bold text-white">Projets</h3>
            <span className="text-[11px] text-gray-text">Total : {totalProjects}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: totalProjects, label: 'Total', color: 'text-gold' },
              { value: inProgressProjects, label: 'En cours', color: 'text-electric-blue' },
              { value: activeProjects, label: 'Actifs', color: 'text-success' },
              { value: completedProjects, label: 'Suspendus', color: 'text-warning' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-2 rounded-2xl" style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <p className={`text-[26px] font-extrabold ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-gray-text mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Distribution - Donut Chart */}
        <div className="glass-card p-5">
          <h3 className="text-[14px] font-bold text-white mb-5">Répartition par Secteur</h3>
          <div className="flex items-center">
            <div className="w-[140px] h-[140px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={62}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 ml-4 space-y-2.5">
              {sectorData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ 
                      backgroundColor: item.color,
                      boxShadow: `0 0 6px ${item.color}40`,
                    }} />
                    <span className="text-[12px] text-gray-text">{item.name}</span>
                  </div>
                  <span className="text-[12px] font-semibold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
