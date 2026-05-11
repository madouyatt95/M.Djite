import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { projects, formatFullAmount } from '../data/projects';

const filters = ['Tous', 'En cours', 'Actifs', 'Terminés'];

const statusColorMap: Record<string, string> = {
  'En cours': 'bg-electric-blue/20 text-electric-blue',
  'Actif': 'bg-success/20 text-success',
  'Terminé': 'bg-gray-text/20 text-gray-text',
  'Idée': 'bg-warning/20 text-warning',
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
    <div className="page-scroll page-enter bg-dark">
      {/* Header - sticky */}
      <div className="sticky top-0 z-20 bg-dark px-5 pt-14 pb-3">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-white">Mes Projets</h1>
          <button 
            onClick={() => navigate('/add-project')}
            className="w-9 h-9 rounded-full bg-gold flex items-center justify-center"
            style={{ boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)' }}
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
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-dark-card border border-gray-border/30 text-white text-sm placeholder:text-gray-text/50 focus:outline-none focus:border-gold/30 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scroll-hidden pb-1">
          {filters.map((filter) => (
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

      {/* Project List */}
      <div className="px-5 pb-8 space-y-3">
        {filteredProjects.map((project, i) => (
          <button
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="w-full glass-card p-3 flex items-center gap-3 text-left transition-all hover:border-gold/30 active:scale-[0.98]"
            style={{ animationDelay: `${i * 80}ms`, animation: 'fadeInUp 0.4s ease-out forwards', opacity: 0 }}
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-semibold text-white truncate">{project.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${statusColorMap[project.status] || 'bg-gray-text/20 text-gray-text'}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-gray-text mb-1.5">{project.sector}</p>
              <p className="text-xs text-gold font-semibold">
                {formatFullAmount(project.investmentInitial)} FCFA
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/add-project')}
        className="fixed bottom-24 right-1/2 translate-x-[calc(215px-28px)] w-14 h-14 rounded-full bg-gold flex items-center justify-center z-20 transition-transform hover:scale-110 active:scale-95"
        style={{ 
          boxShadow: '0 6px 24px rgba(212, 175, 55, 0.4)',
          animation: 'pulse-gold 2s infinite',
          maxWidth: '430px',
        }}
      >
        <Plus size={24} className="text-dark" strokeWidth={3} />
      </button>
    </div>
  );
}
