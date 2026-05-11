import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { projects } from '../data/projects';
import { usePrivacy } from '../context/PrivacyContext';

const filters = ['Tous', 'En cours', 'Actifs', 'Terminés'];
const badgeMap: Record<string, { bg: string; text: string }> = {
  'En cours': { bg: 'rgba(34, 197, 94, 0.12)', text: '#22C55E' }, 
  'Actif': { bg: 'rgba(34, 197, 94, 0.12)', text: '#22C55E' },
  'Terminé': { bg: 'rgba(156, 163, 175, 0.12)', text: '#9CA3AF' },
  'Idée': { bg: 'rgba(245, 158, 11, 0.12)', text: '#F59E0B' },
};

export default function Projects() {
  const { formatAmount } = usePrivacy();
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
      <div className="px-6 pt-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Mes Projets</h1>
          <button onClick={() => nav('/add-project')} className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/20 active:scale-95 transition-transform">
            <Plus size={28} className="text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text" />
          <input type="text" placeholder="Rechercher un projet..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-base text-white placeholder:text-gray-text outline-none focus:border-gold/50 transition-colors"
            style={{ background: '#090E17', border: '1.5px solid #1C2A3A' }} />
        </div>

        {/* Filters with Underline */}
        <div className="flex gap-8 mb-6 overflow-x-auto no-scrollbar border-b border-white/10">
          {filters.map(f => {
            const active = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)}
                className={`pb-4 text-base font-medium whitespace-nowrap relative transition-colors ${active ? 'text-white' : 'text-gray-text hover:text-white'}`}>
                {f}
                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="px-6 pb-32 space-y-5">
        {list.map((p, i) => {
          let bStyle = badgeMap[p.status] || badgeMap['Terminé'];
          if (p.status === 'En cours' && (p.name.includes('Immeuble') || p.name.includes('Coups') || p.name.includes('Restaurant'))) {
             bStyle = { bg: 'rgba(14, 165, 255, 0.15)', text: '#0EA5FF' };
          } else if (p.status === 'En cours') {
             bStyle = { bg: 'rgba(34, 197, 94, 0.15)', text: '#22C55E' };
          }

          return (
            <button key={p.id} onClick={() => nav(`/projects/${p.id}`)}
              className="w-full flex items-center gap-5 text-left active:scale-[0.98] transition-transform rounded-[24px] p-5 shadow-md"
              style={{ background: '#090E17', border: '1px solid #1C2A3A', animationDelay: `${i * 40}ms`, animation: 'fadeInUp 0.3s ease-out forwards', opacity: 0 }}>
              
              <div className="w-[88px] h-[88px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0 py-1 flex flex-col justify-between h-[88px]">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate">{p.name}</h3>
                    <p className="text-sm text-gray-text truncate font-medium">{p.sector}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold flex-shrink-0" style={{ background: bStyle.bg, color: bStyle.text }}>
                    {p.status}
                  </span>
                </div>
                
                <div className="text-right mt-auto flex-shrink-0">
                  <p className="text-base font-extrabold text-white truncate">{formatAmount(p.investmentInitial)} <span className="text-[11px] text-gray-text font-normal">FCFA</span></p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
