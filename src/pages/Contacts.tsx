import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone } from 'lucide-react';
import { contacts, contactCategories } from '../data/contacts';

export default function Contacts() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(c => {
    const matchesCategory = activeCategory === 'Tous' || c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.function.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-scroll page-enter bg-dark">
      {/* Header - sticky */}
      <div className="sticky top-0 z-20 bg-dark px-5 pt-14 pb-3">
        <h1 className="text-xl font-bold text-white mb-5">Contacts</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text" />
          <input
            type="text"
            placeholder="Rechercher un contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-dark-card border border-gray-border/30 text-white text-sm placeholder:text-gray-text/50 focus:outline-none focus:border-gold/30 transition-colors"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto scroll-hidden pb-1">
          {contactCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-dark'
                  : 'bg-dark-card text-gray-text border border-gray-border/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contact List */}
      <div className="px-5 pb-8 space-y-3">
        {filteredContacts.map((contact, i) => (
          <button
            key={contact.id}
            onClick={() => navigate(`/contacts/${contact.id}`)}
            className="w-full glass-card p-4 flex items-center gap-4 text-left transition-all hover:border-gold/30 active:scale-[0.98]"
            style={{ animationDelay: `${i * 80}ms`, animation: 'fadeInUp 0.4s ease-out forwards', opacity: 0 }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{
              border: '2px solid rgba(212, 175, 55, 0.3)',
            }}>
              <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">{contact.name}</h3>
              <p className="text-xs text-gray-text">{contact.function}</p>
            </div>
            <button 
              className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 border border-success/20"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${contact.phone}`);
              }}
            >
              <Phone size={15} className="text-success" />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}
