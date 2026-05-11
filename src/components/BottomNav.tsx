import { useLocation, useNavigate } from 'react-router-dom';
import { Home, FolderKanban, Wallet, BarChart3, Menu } from 'lucide-react';
import { useState } from 'react';

const tabs = [
  { id: 'home', label: 'Accueil', icon: Home, path: '/' },
  { id: 'projects', label: 'Projets', icon: FolderKanban, path: '/projects' },
  { id: 'finances', label: 'Finances', icon: Wallet, path: '/finances' },
  { id: 'charts', label: 'Graphiques', icon: BarChart3, path: '/charts' },
  { id: 'more', label: 'Plus', icon: Menu, path: '' },
];

const moreItems = [
  { label: 'Coffre-Fort', path: '/documents', icon: '🔐' },
  { label: 'Calendrier', path: '/calendar', icon: '📅' },
  { label: 'CRM Partenaires', path: '/contacts', icon: '🤝' },
  { label: 'Carte Mondiale', path: '/map', icon: '🌍' },
  { label: 'Organigramme', path: '/org-chart', icon: '🏢' },
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
  const moreActive = ['/documents', '/contacts', '/alerts', '/settings', '/calendar', '/map', '/org-chart'].some(p => location.pathname.startsWith(p));

  return (
    <>
      {showMore && (
        <div className="absolute inset-0 z-40" onClick={() => setShowMore(false)} style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="absolute bottom-[80px] left-4 right-4 z-50">
            <div className="animate-slide-up rounded-3xl p-3" style={{ background: '#0C1422', border: '1px solid rgba(212,175,55,0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
              {moreItems.map(item => (
                <button key={item.path} onClick={e => { e.stopPropagation(); nav(item.path); setShowMore(false); }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left active:scale-95 transition-transform ${isActive(item.path) ? 'text-gold' : 'text-white'}`}
                  style={isActive(item.path) ? { background: 'rgba(212,175,55,0.1)' } : {}}>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-base">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="bottom-nav relative z-30 px-2 py-3" style={{ background: '#05070B', borderTop: '1px solid #1C2A3A' }}>
        <div className="flex items-center justify-around max-w-md mx-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = tab.id === 'more' ? moreActive : isActive(tab.path);
            return (
              <button key={tab.id}
                onClick={() => { if (tab.id === 'more') setShowMore(!showMore); else { setShowMore(false); nav(tab.path); } }}
                className="flex flex-col items-center justify-center gap-1.5 w-16 h-14 relative active:scale-90 transition-transform">
                <div className="relative">
                  {active && <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold" />}
                  <Icon size={28} strokeWidth={active ? 2.5 : 2} className={active ? 'text-gold' : 'text-gray-text'} />
                </div>
                <span className={`text-[12px] ${active ? 'font-bold text-gold' : 'font-medium text-gray-text'}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
