import { useLocation, useNavigate } from 'react-router-dom';
import { Home, FolderKanban, Wallet, BarChart3, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const tabs = [
  { id: 'home', label: 'Accueil', icon: Home, path: '/' },
  { id: 'projects', label: 'Projets', icon: FolderKanban, path: '/projects' },
  { id: 'finances', label: 'Finances', icon: Wallet, path: '/finances' },
  { id: 'charts', label: 'Graphiques', icon: BarChart3, path: '/charts' },
  { id: 'more', label: 'Plus', icon: MoreHorizontal, path: '' },
];

const moreItems = [
  { label: 'Documents', path: '/documents', icon: '📄' },
  { label: 'Contacts', path: '/contacts', icon: '👥' },
  { label: 'Alertes', path: '/alerts', icon: '🔔' },
  { label: 'Paramètres', path: '/settings', icon: '⚙️' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const moreActive = ['/documents', '/contacts', '/alerts', '/settings'].some(p => 
    location.pathname.startsWith(p)
  );

  return (
    <>
      {/* More menu overlay */}
      {showMore && (
        <div 
          className="absolute inset-0 z-40"
          onClick={() => setShowMore(false)}
        >
          <div className="absolute bottom-20 left-4 right-4 z-50">
            <div className="glass-card p-2 animate-slide-up" style={{
              background: 'linear-gradient(135deg, rgba(11, 18, 32, 0.98), rgba(11, 18, 32, 0.95))',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}>
              {moreItems.map((item) => (
                <button
                  key={item.path}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.path);
                    setShowMore(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                    isActive(item.path) 
                      ? 'bg-gold/10 text-gold' 
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav relative z-30 px-2 pt-2 pb-1" style={{
        background: 'linear-gradient(to top, rgba(5, 7, 11, 0.98), rgba(11, 18, 32, 0.95))',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
      }}>
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.id === 'more' ? moreActive : isActive(tab.path);
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'more') {
                    setShowMore(!showMore);
                  } else {
                    setShowMore(false);
                    navigate(tab.path);
                  }
                }}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px] ${
                  active ? 'text-gold' : 'text-gray-text'
                }`}
              >
                <div className={`relative ${active ? '' : ''}`}>
                  {active && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                  <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                </div>
                <span className={`text-[10px] ${active ? 'font-semibold' : 'font-normal'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
