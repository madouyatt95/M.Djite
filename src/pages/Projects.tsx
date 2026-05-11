import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { projects, formatFullAmount } from '../data/projects';

const filters = ['Tous', 'En cours', 'Actifs', 'Terminés'];
const badgeMap: Record<string, string> = {
  'En cours': 'badge badge-encours', 'Actif': 'badge badge-actif',
  'Terminé': 'badge badge-termine', 'Idée': 'badge badge-idee',
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
    <div className="page-enter">
      <div className="px-4 pt-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-white">Mes Projets</h1>
          <button onClick={() => nav('/add-project')} className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
            <Plus size={16} className="text-dark" strokeWidth={3} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text" />
          <input type="text" placeholder="Rechercher un projet..." value={search} onChange={e => setSearch(e.target.value)}
            className="input pl-9" />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${filter === f ? 'bg-gold text-dark' : 'text-gray-text'}`}
              style={filter !== f ? { background: '#0C1422', border: '1px solid #1C2A3A' } : {}}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-4 pb-6 space-y-2.5">
        {list.map((p, i) => (
          <button key={p.id} onClick={() => nav(`/projects/${p.id}`)}
            className="w-full card flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            style={{ padding: 12, animationDelay: `${i * 50}ms`, animation: 'fadeInUp 0.35s ease-out forwards', opacity: 0 }}>
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <h3 className="text-[13px] font-bold text-white truncate">{p.name}</h3>
                <span className={badgeMap[p.status] || 'badge badge-termine'}>{p.status}</span>
              </div>
              <p className="text-[11px] text-gray-text mb-0.5">{p.sector}</p>
              <p className="text-[12px] font-bold text-gold">{formatFullAmount(p.investmentInitial)} <span className="text-[10px] text-gray-text font-normal">FCFA</span></p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
