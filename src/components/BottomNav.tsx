import { useLocation, useNavigate } from 'react-router-dom';
import { Home, FolderKanban, Wallet, BarChart3, Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence>
        {showMore && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowMore(false)}
          >
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 z-50 p-6 pb-12 rounded-t-[32px]" 
              style={{ background: '#111B2E', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-8" />
              <div className="space-y-4">
                {moreItems.map(item => (
                  <button key={item.path} onClick={() => { nav(item.path); setShowMore(false); }}
                    className={`w-full flex items-center gap-5 px-6 py-4 rounded-[20px] text-left active:scale-[0.98] transition-all ${isActive(item.path) ? 'text-gold' : 'text-white'}`}
                    style={isActive(item.path) ? { background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' } : { background: '#090E17', border: '1px solid #1C2A3A' }}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-semibold text-[15px]">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="bottom-nav relative z-30 px-2 py-2 backdrop-blur-xl" style={{ background: 'rgba(5, 7, 11, 0.85)', borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center justify-around max-w-md mx-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = tab.id === 'more' ? moreActive : isActive(tab.path);
            return (
              <button key={tab.id}
                onClick={() => { if (tab.id === 'more') setShowMore(!showMore); else { setShowMore(false); nav(tab.path); } }}
                className="flex flex-col items-center justify-center gap-1.5 w-16 h-14 relative active:scale-95 transition-transform">
                <div className="relative flex flex-col items-center">
                  <Icon size={24} strokeWidth={active ? 2.5 : 2} className={active ? 'text-gold' : 'text-gray-text'} />
                  {active && <div className="absolute -top-3 w-8 h-[3px] rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />}
                </div>
                <span className={`text-[12px] tracking-wide ${active ? 'font-bold text-gold' : 'font-medium text-gray-text'}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
