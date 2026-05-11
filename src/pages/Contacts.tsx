import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone } from 'lucide-react';
import { contacts, contactCategories } from '../data/contacts';

export default function Contacts() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = contacts.filter(c => {
    const f = activeCategory === 'Tous' || c.category === activeCategory;
    const s = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return f && s;
  });

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-2">
        <h1 className="text-xl font-bold text-white mb-4">Contacts</h1>
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-text" />
          <input type="text" placeholder="Rechercher un contact..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-dark-card border border-gray-border/40 text-white text-sm placeholder:text-gray-text/50 focus:outline-none focus:border-gold/40" />
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto scroll-hidden">
          {contactCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${activeCategory === cat ? 'bg-gold text-dark' : 'bg-dark-card text-gray-text border border-gray-border/40'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-6 space-y-3">
        {filtered.map((contact, i) => (
          <button key={contact.id} onClick={() => navigate(`/contacts/${contact.id}`)}
            className="w-full glass-card p-3.5 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            style={{ animationDelay: `${i * 60}ms`, animation: 'fadeInUp 0.4s ease-out forwards', opacity: 0 }}>
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30">
              <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">{contact.name}</h3>
              <p className="text-xs text-gray-text">{contact.function}</p>
            </div>
            <button className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border border-success/30"
              style={{ background: 'rgba(34,197,94,0.1)' }}
              onClick={(e) => { e.stopPropagation(); window.open(`tel:${contact.phone}`); }}>
              <Phone size={15} className="text-success" />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}
