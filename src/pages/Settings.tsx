import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Bell, Palette, Globe, Database, Info, LogOut, ChevronRight } from 'lucide-react';

const settingSections = [
  { icon: User, label: 'Profil', desc: '', color: '#D4AF37' },
  { icon: Shield, label: 'Sécurité', desc: 'Empreinte, Mot de passe...', color: '#0EA5FF' },
  { icon: Bell, label: 'Notifications', desc: 'Gérer vos alertes', color: '#22C55E' },
  { icon: Palette, label: 'Thème', desc: 'Sombre', color: '#8B5CF6', toggle: true },
  { icon: Globe, label: 'Langue', desc: 'Français', color: '#F59E0B' },
  { icon: Database, label: 'Sauvegarde', desc: 'Dernière sauvegarde : 10/01/2024', color: '#06B6D4' },
  { icon: Info, label: 'À propos', desc: 'Version 1.0.0', color: '#9CA3AF' },
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="h-full scroll-hidden page-enter">
      <div className="px-5 pt-12 pb-6 space-y-6">
        {/* Back */}
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-dark-card flex items-center justify-center border border-gray-border/30"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Header */}
        <h1 className="text-xl font-bold text-white">Paramètres</h1>

        {/* Profile card */}
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden" style={{
            border: '2px solid rgba(212, 175, 55, 0.4)',
          }}>
            <img src="/images/avatar_user.png" alt="M. Djité" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">M. Djité</h2>
            <p className="text-sm text-gray-text">Entrepreneur & Investisseur</p>
          </div>
        </div>

        {/* Settings list */}
        <div className="space-y-2">
          {settingSections.map((section, i) => {
            const Icon = section.icon;
            return (
              <button
                key={section.label}
                className="w-full glass-card-sm p-4 flex items-center gap-4 text-left transition-all hover:border-gold/20 active:scale-[0.98]"
                style={{ animationDelay: `${i * 60}ms`, animation: 'fadeInUp 0.4s ease-out forwards', opacity: 0 }}
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{
                  backgroundColor: `${section.color}15`,
                }}>
                  <Icon size={18} style={{ color: section.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white">{section.label}</h3>
                  {section.desc && <p className="text-xs text-gray-text">{section.desc}</p>}
                </div>
                {section.toggle ? (
                  <div className="w-11 h-6 rounded-full bg-gold/30 flex items-center px-0.5">
                    <div className="w-5 h-5 rounded-full bg-gold ml-auto" />
                  </div>
                ) : (
                  <ChevronRight size={16} className="text-gray-text" />
                )}
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button className="w-full py-4 text-center text-danger font-semibold text-sm hover:text-danger/80 transition-colors">
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
