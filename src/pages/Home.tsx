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
    <div className="h-full scroll-hidden page-enter">
      {/* Hero section with skyline */}
      <div className="relative">
        <div 
          className="absolute inset-0 h-64"
          style={{
            backgroundImage: 'url(/images/skyline_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            filter: 'brightness(0.3)',
          }}
        />
        <div className="absolute inset-0 h-64" style={{
          background: 'linear-gradient(to bottom, rgba(5,7,11,0.4) 0%, rgba(5,7,11,0.95) 90%, rgba(5,7,11,1) 100%)',
        }} />

        {/* Header */}
        <div className="relative z-10 px-5 pt-12 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden" style={{
                border: '1.5px solid rgba(212, 175, 55, 0.4)',
              }}>
                <img src="/images/md_logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-gold font-bold text-lg tracking-wide">M.Djité</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl bg-dark-card/50">
                <Bell size={20} className="text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-dark" />
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden" style={{
                border: '2px solid rgba(212, 175, 55, 0.4)',
              }}>
                <img src="/images/avatar_user.png" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white mb-1">Bonjour M. Djité 👋</h1>
            <p className="text-gray-text text-sm">Voici la vue d'ensemble de vos projets et investissements.</p>
          </div>

          {/* View selector */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-gray-text text-xs">Vue globale</span>
            <button className="flex items-center gap-1 glass-card-sm px-3 py-1.5 text-xs text-white">
              <span>Année en cours</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 -mt-2 pb-6 space-y-5">
        {/* Total Investi Card */}
        <div className="glass-card p-5" style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(11, 18, 32, 0.9))',
          border: '1px solid rgba(212, 175, 55, 0.25)',
        }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-wide">Total Investi</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatFullAmount(totalInvested)} <span className="text-sm text-gray-text font-normal">FCFA</span>
          </p>
        </div>

        {/* Revenue and Benefits */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <p className="text-gray-text text-xs mb-1">Revenus Totaux</p>
            <p className="text-lg font-bold text-white">{formatFullAmount(totalRevenues)}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-gray-text text-xs mb-1">Bénéfices Totaux</p>
            <p className="text-lg font-bold text-success">{formatFullAmount(totalBenefits)}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Projets</h3>
            <span className="text-xs text-gray-text">Total : {totalProjects}</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">{totalProjects}</p>
              <p className="text-[10px] text-gray-text mt-1">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-electric-blue">{inProgressProjects}</p>
              <p className="text-[10px] text-gray-text mt-1">En cours</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{activeProjects}</p>
              <p className="text-[10px] text-gray-text mt-1">Actifs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{completedProjects}</p>
              <p className="text-[10px] text-gray-text mt-1">Suspendus</p>
            </div>
          </div>
        </div>

        {/* Sector Distribution - Donut Chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Répartition par Secteur</h3>
          <div className="flex items-center gap-4">
            <div className="w-36 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
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
            <div className="flex-1 space-y-2">
              {sectorData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-text">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
