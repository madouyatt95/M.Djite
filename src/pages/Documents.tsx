import { useState } from 'react';
import { Search, FileText, FileSpreadsheet, File } from 'lucide-react';
import { documents, documentFilters } from '../data/documents';

const typeIcon: Record<string, { icon: typeof FileText; color: string }> = {
  'PDF': { icon: FileText, color: '#EF4444' },
  'Excel': { icon: FileSpreadsheet, color: '#22C55E' },
  'Word': { icon: File, color: '#3B82F6' },
};

export default function Documents() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = documents.filter(d => {
    const f = activeFilter === 'Tous' || d.category === activeFilter;
    const s = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    return f && s;
  });

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-2">
        <h1 className="text-xl font-bold text-white mb-4">Documents</h1>
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-text" />
          <input type="text" placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-dark-card border border-gray-border/40 text-white text-sm placeholder:text-gray-text/50 focus:outline-none focus:border-gold/40" />
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto scroll-hidden">
          {documentFilters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${activeFilter === f ? 'bg-gold text-dark' : 'bg-dark-card text-gray-text border border-gray-border/40'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-6 space-y-3">
        {filtered.map((doc, i) => {
          const t = typeIcon[doc.type];
          const Icon = t.icon;
          return (
            <div key={doc.id} className="glass-card p-3.5 flex items-center gap-3" style={{ animationDelay: `${i * 60}ms`, animation: 'fadeInUp 0.4s ease-out forwards', opacity: 0 }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${t.color}15`, border: `1px solid ${t.color}30` }}>
                <Icon size={20} style={{ color: t.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate mb-0.5">{doc.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${t.color}15`, color: t.color }}>{doc.type}</span>
                  <span className="text-[10px] text-gray-text">{doc.size}</span>
                  <span className="text-[10px] text-gray-text">{doc.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
