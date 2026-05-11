import { useState } from 'react';
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
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14 pb-32 space-y-6">
        <button onClick={() => nav(-1)} className="w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-transform" style={{background:'#090E17', border: '1px solid #1C2A3A'}}>
          <ArrowLeft size={24} className="text-white" />
        </button>

        <h1 className="text-3xl font-bold text-white mb-4">Paramètres</h1>

        <div className="rounded-3xl p-5 flex items-center gap-5" style={{background:'#090E17', border: '1px solid #1C2A3A'}}>
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/40">
            <img src="/images/avatar_user.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">M. Djité</h2>
            <p className="text-sm text-gray-text mt-1 font-medium">Entrepreneur & Investisseur</p>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const Icon = item.i;
            return (
              <button key={item.l} onClick={() => alert(`${item.l} : Fonctionnalité en cours de développement`)} className="w-full rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform" style={{background:'#090E17', border: '1px solid #1C2A3A', animationDelay:`${i*40}ms`,animation:'fadeInUp 0.3s ease-out forwards',opacity:0}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`${item.c}15`}}><Icon size={22} style={{color:item.c}}/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-white">{item.l}</p>
                  {item.d && <p className="text-xs text-gray-text truncate mt-1 font-medium">{item.d}</p>}
                </div>
                {item.toggle ? (
                  <div className="w-12 h-6 rounded-full flex items-center px-1 flex-shrink-0" style={{background:'rgba(212,175,55,0.3)'}}><div className="w-4 h-4 rounded-full bg-gold ml-auto shadow-sm"/></div>
                ) : <ChevronRight size={20} className="text-gray-text flex-shrink-0"/>}
              </button>
            );
          })}
        </div>
        
        <button onClick={() => alert('Déconnexion réussie (Simulation)')} className="w-full py-4 rounded-2xl text-center text-danger font-bold text-base mt-4 active:scale-[0.98] transition-transform" style={{background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)'}}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
