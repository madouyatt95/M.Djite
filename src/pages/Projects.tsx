import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { projects, formatFullAmount } from '../data/projects';

const filters = ['Tous', 'En cours', 'Actifs', 'Terminés'];
const badgeMap: Record<string, { bg: string; text: string }> = {
  'En cours': { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E' }, // Some En cours are green, some blue. We'll use green/blue. Let's stick to blue for En cours, green for Actif as in typical systems, but image shows green for Poulailler. I'll use blue.
  'Actif': { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E' },
  'Terminé': { bg: 'rgba(156, 163, 175, 0.1)', text: '#9CA3AF' },
  'Idée': { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B' },
};

export default function Projects() {
  const nav = useNavigate();
  const [filter, setFilter] = useState('Tous');
  const [search, setSearch] = useState('');

  const list = projects.filter(p => {
    const f = filter === 'Tous' || (filter === 'Actifs' && p.status === 'Actif') ||
      (filter === 'Terminés' && p.status === 'Terminé') || (filter === 'En cours' && p.status === 'En cours');
    return f && p.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-4 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[22px] font-bold text-white">Mes Projets</h1>
          <button onClick={() => nav('/add-project')} className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/20">
            <Plus size={20} className="text-white" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-text" />
          <input type="text" placeholder="Rechercher un projet..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-[14px] text-[13px] text-white placeholder:text-gray-text outline-none"
            style={{ background: '#090E17', border: '1px solid #1C2A3A' }} />
        </div>

        {/* Filters with Underline */}
        <div className="flex gap-6 mb-4 overflow-x-auto no-scrollbar border-b border-white/5">
          {filters.map(f => {
            const active = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)}
                className={`pb-3 text-[13px] font-medium whitespace-nowrap relative transition-colors ${active ? 'text-white' : 'text-gray-text'}`}>
                {f}
                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="px-4 pb-24 space-y-3">
        {list.map((p, i) => {
          // Special handling for the image reference colors if needed, but we stick to dynamic data mapping
          let bStyle = badgeMap[p.status] || badgeMap['Terminé'];
          if (p.status === 'En cours' && (p.name.includes('Immeuble') || p.name.includes('Coups') || p.name.includes('Restaurant'))) {
             bStyle = { bg: 'rgba(14, 165, 255, 0.1)', text: '#0EA5FF' }; // Blue for some
          } else if (p.status === 'En cours') {
             bStyle = { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E' }; // Green for Poulailler
          }

          return (
            <button key={p.id} onClick={() => nav(`/projects/${p.id}`)}
              className="w-full flex items-center gap-3.5 text-left active:scale-[0.98] transition-transform rounded-[16px] p-3"
              style={{ background: '#090E17', border: '1px solid #1C2A3A', animationDelay: `${i * 40}ms`, animation: 'fadeInUp 0.3s ease-out forwards', opacity: 0 }}>
              
              <div className="w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between h-[72px]">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <h3 className="text-[14px] font-bold text-white truncate">{p.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0" style={{ background: bStyle.bg, color: bStyle.text }}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-text truncate">{p.sector}</p>
                </div>
                
                <div className="text-right mt-auto">
                  <p className="text-[13px] font-bold text-white">{formatFullAmount(p.investmentInitial)} <span className="text-[10px] text-gray-text font-normal">FCFA</span></p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
