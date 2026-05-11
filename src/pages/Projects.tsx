import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { projects, formatFullAmount } from '../data/projects';

const filters = ['Tous', 'En cours', 'Actifs', 'Terminés'];

const statusStyles: Record<string, string> = {
  'En cours': 'badge-encours',
  'Actif': 'badge-actif',
  'Terminé': 'badge-termine',
  'Idée': 'badge-termine',
};

export default function Projects() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => {
    const matchesFilter = activeFilter === 'Tous' || 
      (activeFilter === 'Actifs' && p.status === 'Actif') ||
      (activeFilter === 'Terminés' && p.status === 'Terminé') ||
      (activeFilter === 'En cours' && p.status === 'En cours');
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-enter bg-dark">
      {/* Header */}
      <div className="sticky top-0 z-20 px-5 pt-12 pb-3" style={{
        background: 'linear-gradient(to bottom, #05070B 80%, rgba(5,7,11,0.95))',
      }}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[20px] font-bold text-white">Mes Projets</h1>
          <button 
            onClick={() => navigate('/add-project')}
            className="w-9 h-9 rounded-full bg-gold flex items-center justify-center"
            style={{ boxShadow: '0 4px 16px rgba(212, 175, 55, 0.35)' }}
          >
            <Plus size={18} className="text-dark" strokeWidth={3} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-[14px] text-white placeholder:text-gray-text/40 focus:outline-none transition-colors"
            style={{
              background: 'rgba(11, 18, 32, 0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scroll-hidden pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-gold text-dark'
                  : 'text-gray-text'
              }`}
              style={activeFilter !== filter ? {
                background: 'rgba(11, 18, 32, 0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
              } : {
                boxShadow: '0 2px 12px rgba(212, 175, 55, 0.3)',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Project List */}
      <div className="px-5 pb-8 space-y-3 pt-2">
        {filteredProjects.map((project, i) => (
          <button
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="w-full glass-card p-3.5 flex items-center gap-3.5 text-left transition-all active:scale-[0.98]"
            style={{ animationDelay: `${i * 80}ms`, animation: 'fadeInUp 0.4s ease-out forwards', opacity: 0 }}
          >
            <div className="w-[64px] h-[64px] rounded-2xl overflow-hidden flex-shrink-0" style={{
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-[14px] font-bold text-white truncate">{project.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${statusStyles[project.status] || 'badge-termine'}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-[12px] text-gray-text mb-1.5">{project.sector}</p>
              <p className="text-[13px] font-bold" style={{ color: '#D4AF37' }}>
                {formatFullAmount(project.investmentInitial)} <span className="text-[10px] text-gray-text font-normal">FCFA</span>
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/add-project')}
        className="fixed z-20 w-14 h-14 rounded-full bg-gold flex items-center justify-center transition-transform active:scale-95"
        style={{ 
          bottom: '90px',
          right: '20px',
          boxShadow: '0 6px 24px rgba(212, 175, 55, 0.45)',
          animation: 'pulse-gold 2s infinite',
        }}
      >
        <Plus size={24} className="text-dark" strokeWidth={3} />
      </button>
    </div>
  );
}
