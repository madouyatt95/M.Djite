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
  const nav = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  const moreActive = ['/documents', '/contacts', '/alerts', '/settings'].some(p => location.pathname.startsWith(p));

  return (
    <>
      {showMore && (
        <div className="absolute inset-0 z-40" onClick={() => setShowMore(false)} style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div className="absolute bottom-[64px] left-4 right-4 z-50">
            <div className="animate-slide-up rounded-2xl p-1.5" style={{ background: '#0C1422', border: '1px solid rgba(212,175,55,0.2)' }}>
              {moreItems.map(item => (
                <button key={item.path} onClick={e => { e.stopPropagation(); nav(item.path); setShowMore(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${isActive(item.path) ? 'text-gold' : 'text-white'}`}
                  style={isActive(item.path) ? { background: 'rgba(212,175,55,0.08)' } : {}}>
                  <span className="text-base">{item.icon}</span>
                  <span className="font-medium text-[13px]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="bottom-nav relative z-30 px-1 pt-1.5 pb-1" style={{ background: '#05070B', borderTop: '1px solid #1C2A3A' }}>
        <div className="flex items-center justify-around">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = tab.id === 'more' ? moreActive : isActive(tab.path);
            return (
              <button key={tab.id}
                onClick={() => { if (tab.id === 'more') setShowMore(!showMore); else { setShowMore(false); nav(tab.path); } }}
                className="flex flex-col items-center gap-0.5 py-1.5 px-2 min-w-[52px]">
                <div className="relative">
                  {active && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />}
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.5} className={active ? 'text-gold' : 'text-gray-text'} />
                </div>
                <span className={`text-[9px] ${active ? 'font-bold text-gold' : 'text-gray-text'}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
