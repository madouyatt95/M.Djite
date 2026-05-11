import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { projects, formatFullAmount } from '../data/projects';

const filters = ['Tous', 'En cours', 'Actifs', 'Terminés'];

const badgeClass: Record<string, string> = {
  'En cours': 'badge badge-encours',
  'Actif': 'badge badge-actif',
  'Terminé': 'badge badge-termine',
  'Idée': 'badge badge-idee',
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
    <div className="page-enter">
      <div className="px-4 pt-12 pb-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">Mes Projets</h1>
          <button 
            onClick={() => navigate('/add-project')}
            className="w-9 h-9 rounded-full bg-gold flex items-center justify-center"
          >
            <Plus size={18} className="text-dark" strokeWidth={3} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-text" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-dark-card border border-gray-border/40 text-white text-sm placeholder:text-gray-text/50 focus:outline-none focus:border-gold/40"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto scroll-hidden">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-gold text-dark'
                  : 'bg-dark-card text-gray-text border border-gray-border/40'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Project List */}
      <div className="px-4 pb-6 space-y-3">
        {filteredProjects.map((project, i) => (
          <button
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="w-full glass-card p-3 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            style={{ animationDelay: `${i * 60}ms`, animation: 'fadeInUp 0.4s ease-out forwards', opacity: 0 }}
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
              <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold text-white truncate flex-1">{project.name}</h3>
                <span className={badgeClass[project.status] || 'badge badge-termine'}>{project.status}</span>
              </div>
              <p className="text-xs text-gray-text mb-1">{project.sector}</p>
              <p className="text-sm font-bold text-gold">{formatFullAmount(project.investmentInitial)} <span className="text-[10px] text-gray-text font-normal">FCFA</span></p>
            </div>
          </button>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/add-project')}
        className="fixed z-20 w-14 h-14 rounded-full bg-gold flex items-center justify-center active:scale-95"
        style={{ bottom: 90, right: 20, boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)', animation: 'pulse-gold 2s infinite' }}
      >
        <Plus size={24} className="text-dark" strokeWidth={3} />
      </button>
    </div>
  );
}
