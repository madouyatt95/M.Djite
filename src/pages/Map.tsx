import { useState } from 'react';
import { Globe, MapPin, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const countries = [
  { id: 'sn', name: 'Sénégal', projects: 4, value: '1 250 000 000 FCFA', color: '#D4AF37' },
  { id: 'ci', name: 'Côte d\'Ivoire', projects: 2, value: '450 000 000 FCFA', color: '#0EA5FF' },
  { id: 'gn', name: 'Guinée', projects: 1, value: '250 000 000 FCFA', color: '#22C55E' },
  { id: 'fr', name: 'France', projects: 1, value: '600 000 €', color: '#8B5CF6' },
];

export default function Map() {
  const nav = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14 pb-32 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => nav(-1)} className="w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-transform" style={{background:'#090E17', border: '1px solid #1C2A3A'}}>
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Globe size={28} className="text-gold" /> Carte Mondiale
          </h1>
        </div>

        {/* Mock Map Area */}
        <div className="w-full h-64 rounded-[24px] relative overflow-hidden flex items-center justify-center" style={{ background: '#090E17', border: '1px solid rgba(212,175,55,0.3)' }}>
          {/* Faux fond de carte */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.4) 0%, transparent 70%)' }} />
          <p className="text-gray-text font-medium text-center px-8 relative z-10">
            [Visualisation interactive de la carte en cours d'intégration...]
          </p>
          
          {/* Pins virtuels */}
          <div className="absolute top-1/3 left-1/4 animate-bounce" style={{ animationDelay: '0ms' }}>
            <MapPin size={32} color="#D4AF37" fill="rgba(212,175,55,0.2)" />
          </div>
          <div className="absolute top-1/2 left-1/3 animate-bounce" style={{ animationDelay: '200ms' }}>
            <MapPin size={24} color="#0EA5FF" fill="rgba(14,165,255,0.2)" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4 mt-8">Actifs par Pays</h2>
        <div className="space-y-4">
          {countries.map(c => (
            <button key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)} className="w-full text-left rounded-[24px] p-5 transition-all" style={{ background: selected === c.id ? 'rgba(212,175,55,0.05)' : '#090E17', border: `1px solid ${selected === c.id ? '#D4AF37' : '#1C2A3A'}` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${c.color}15` }}>
                    <MapPin size={24} style={{ color: c.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{c.name}</p>
                    <p className="text-sm font-medium text-gray-text">{c.projects} projets actifs</p>
                  </div>
                </div>
                <ChevronRight size={24} className={`text-gray-text transition-transform ${selected === c.id ? 'rotate-90' : ''}`} />
              </div>
              
              {selected === c.id && (
                <div className="mt-5 pt-5 border-t border-white/10 animate-slide-up">
                  <p className="text-sm text-gray-text mb-1">Valeur estimée des actifs</p>
                  <p className="text-2xl font-bold text-white">{c.value}</p>
                  <button className="mt-4 w-full py-3 rounded-xl font-bold text-dark active:scale-95 transition-transform" style={{ background: '#D4AF37' }}>
                    Voir les projets
                  </button>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
