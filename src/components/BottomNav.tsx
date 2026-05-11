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
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div className="absolute bottom-[72px] left-4 right-4 z-50" style={{
            paddingBottom: 'env(safe-area-inset-bottom, 6px)',
          }}>
            <div className="animate-slide-up p-2 rounded-[20px]" style={{
              background: 'rgba(11, 18, 32, 0.98)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(24px)',
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
                      ? 'text-gold' 
                      : 'text-white'
                  }`}
                  style={isActive(item.path) ? {
                    background: 'rgba(212, 175, 55, 0.08)',
                  } : {}}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-[14px]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav relative z-30 px-2 pt-2 pb-2" style={{
        background: 'linear-gradient(to top, #05070B 60%, rgba(5, 7, 11, 0.97))',
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
                className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 min-w-[56px]"
              >
                <div className="relative">
                  {active && (
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold" style={{
                      boxShadow: '0 0 6px rgba(212, 175, 55, 0.6)',
                    }} />
                  )}
                  <Icon 
                    size={22} 
                    strokeWidth={active ? 2.5 : 1.5} 
                    className={active ? 'text-gold' : 'text-gray-text'}
                  />
                </div>
                <span className={`text-[10px] ${
                  active ? 'font-bold text-gold' : 'font-normal text-gray-text'
                }`}>
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
