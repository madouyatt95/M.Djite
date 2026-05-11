import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Bell, Palette, Globe, Database, Info, LogOut, ChevronRight } from 'lucide-react';

const sections = [
  { icon: User, label: 'Profil', desc: '', color: '#D4AF37' },
  { icon: Shield, label: 'Sécurité', desc: 'Empreinte, Mot de passe', color: '#0EA5FF' },
  { icon: Bell, label: 'Notifications', desc: 'Gérer vos alertes', color: '#22C55E' },
  { icon: Palette, label: 'Thème', desc: 'Sombre', color: '#8B5CF6', toggle: true },
  { icon: Globe, label: 'Langue', desc: 'Français', color: '#F59E0B' },
  { icon: Database, label: 'Sauvegarde', desc: '10/01/2024', color: '#06B6D4' },
  { icon: Info, label: 'À propos', desc: 'v1.0.0', color: '#9CA3AF' },
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-6 space-y-5">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-dark-card flex items-center justify-center border border-gray-border/40">
          <ArrowLeft size={20} className="text-white" />
        </button>

        <h1 className="text-xl font-bold text-white">Paramètres</h1>

        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/40">
            <img src="/images/avatar_user.png" alt="M. Djité" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">M. Djité</h2>
            <p className="text-sm text-gray-text">Entrepreneur & Investisseur</p>
          </div>
        </div>

        <div className="space-y-2">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <button key={s.label} className="w-full glass-card-sm p-3.5 flex items-center gap-3.5 text-left active:scale-[0.98] transition-transform"
                style={{ animationDelay: `${i * 50}ms`, animation: 'fadeInUp 0.3s ease-out forwards', opacity: 0 }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}15` }}>
                  <Icon size={17} style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white">{s.label}</h3>
                  {s.desc && <p className="text-xs text-gray-text truncate">{s.desc}</p>}
                </div>
                {s.toggle ? (
                  <div className="w-10 h-5.5 rounded-full bg-gold/30 flex items-center px-0.5 flex-shrink-0">
                    <div className="w-4.5 h-4.5 rounded-full bg-gold ml-auto" />
                  </div>
                ) : (
                  <ChevronRight size={16} className="text-gray-text flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <button className="w-full py-4 text-center text-danger font-semibold text-sm">Se déconnecter</button>
      </div>
    </div>
  );
}
