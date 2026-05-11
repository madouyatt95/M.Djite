import { useState } from 'react';
import { Search, FileText, FileSpreadsheet, File } from 'lucide-react';
import { documents, documentFilters } from '../data/documents';

const typeIconMap: Record<string, { icon: typeof FileText; color: string }> = {
  'PDF': { icon: FileText, color: '#EF4444' },
  'Excel': { icon: FileSpreadsheet, color: '#22C55E' },
  'Word': { icon: File, color: '#3B82F6' },
};

export default function Documents() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = documents.filter(doc => {
    const matchesFilter = activeFilter === 'Tous' || doc.category === activeFilter;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-scroll page-enter bg-dark">
      {/* Header - sticky */}
      <div className="sticky top-0 z-20 bg-dark px-5 pt-14 pb-3">
        <h1 className="text-xl font-bold text-white mb-5">Documents</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text" />
          <input
            type="text"
            placeholder="Rechercher un document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-dark-card border border-gray-border/30 text-white text-sm placeholder:text-gray-text/50 focus:outline-none focus:border-gold/30 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scroll-hidden pb-1">
          {documentFilters.map((filter) => (
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

      {/* Document List */}
      <div className="px-5 pb-8 space-y-3">
        {filteredDocs.map((doc, i) => {
          const typeInfo = typeIconMap[doc.type];
          const Icon = typeInfo.icon;
          return (
            <button
              key={doc.id}
              className="w-full glass-card p-4 flex items-center gap-4 text-left transition-all hover:border-gold/30 active:scale-[0.98]"
              style={{ animationDelay: `${i * 80}ms`, animation: 'fadeInUp 0.4s ease-out forwards', opacity: 0 }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{
                backgroundColor: `${typeInfo.color}15`,
                border: `1px solid ${typeInfo.color}30`,
              }}>
                <Icon size={22} style={{ color: typeInfo.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate mb-1">{doc.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{
                    backgroundColor: `${typeInfo.color}15`,
                    color: typeInfo.color,
                  }}>
                    {doc.type}
                  </span>
                  <span className="text-[10px] text-gray-text">• {doc.size}</span>
                  <span className="text-[10px] text-gray-text">• {doc.date}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
