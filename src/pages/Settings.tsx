import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Bell, Palette, Globe, Database, Info, ChevronRight } from 'lucide-react';

const items = [
  { i: User, l: 'Profil', d: '', c: '#D4AF37' },
  { i: Shield, l: 'Sécurité', d: 'Empreinte, Mot de passe', c: '#0EA5FF' },
  { i: Bell, l: 'Notifications', d: 'Gérer vos alertes', c: '#22C55E' },
  { i: Palette, l: 'Thème', d: 'Sombre', c: '#8B5CF6', toggle: true },
  { i: Globe, l: 'Langue', d: 'Français', c: '#F59E0B' },
  { i: Database, l: 'Sauvegarde', d: '10/05/2024', c: '#06B6D4' },
  { i: Info, l: 'À propos', d: 'Version 1.0.0', c: '#9CA3AF' },
];

export default function Settings() {
  const nav = useNavigate();
  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-6 space-y-4">
        <button onClick={() => nav(-1)} className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-border/40" style={{background:'#0C1422'}}>
          <ArrowLeft size={18} className="text-white" />
        </button>

        <h1 className="text-lg font-bold text-white mb-2">Paramètres</h1>

        <div className="card flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gold/40">
            <img src="/images/avatar_user.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-white">M. Djité</h2>
            <p className="text-[11px] text-gray-text">Entrepreneur & Investisseur</p>
          </div>
        </div>

        <div className="space-y-2">
          {items.map((item, i) => {
            const Icon = item.i;
            return (
              <button key={item.l} className="w-full card-sm p-3 flex items-center gap-3 text-left active:scale-[0.98] transition-transform" style={{animationDelay:`${i*40}ms`,animation:'fadeInUp 0.3s ease-out forwards',opacity:0}}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:`${item.c}15`}}><Icon size={15} style={{color:item.c}}/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-white">{item.l}</p>
                  {item.d && <p className="text-[9px] text-gray-text truncate">{item.d}</p>}
                </div>
                {item.toggle ? (
                  <div className="w-8 h-4.5 rounded-full flex items-center px-0.5 flex-shrink-0" style={{background:'rgba(212,175,55,0.3)'}}><div className="w-3.5 h-3.5 rounded-full bg-gold ml-auto"/></div>
                ) : <ChevronRight size={14} className="text-gray-text flex-shrink-0"/>}
              </button>
            );
          })}
        </div>
        <button className="w-full py-2 text-center text-danger font-semibold text-[13px] mt-2">Se déconnecter</button>
      </div>
    </div>
  );
}
