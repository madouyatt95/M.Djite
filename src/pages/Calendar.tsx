import { Calendar as CalendarIcon, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const events = [
  { id: 1, title: 'Déclaration Fiscale Annuelle', type: 'Fiscalité', date: '15 Juin 2026', time: '12:00', color: '#EF4444' },
  { id: 2, title: 'Renouvellement Assurance Immeuble Fann', type: 'Assurance', date: '28 Juin 2026', time: '09:00', color: '#F59E0B' },
  { id: 3, title: 'Récupération Loyers Commerciaux', type: 'Revenus', date: '1er Juil 2026', time: '10:00', color: '#22C55E' },
  { id: 4, title: 'Remboursement Prêt Agri', type: 'Dettes', date: '5 Juil 2026', time: '15:30', color: '#0EA5FF' },
  { id: 5, title: 'Rendez-vous Notaire (Acquisition)', type: 'Juridique', date: '12 Juil 2026', time: '11:00', color: '#8B5CF6' },
];

export default function Calendar() {
  const nav = useNavigate();

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-6 pt-14 pb-32 space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => nav(-1)} className="w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-transform" style={{background:'#090E17', border: '1px solid #1C2A3A'}}>
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <CalendarIcon size={28} className="text-gold" /> Calendrier
          </h1>
        </div>

        {/* Current Month Display Mock */}
        <div className="rounded-[24px] p-6 mb-8 text-center" style={{ background: 'linear-gradient(135deg, #1C2A3A 0%, #090E17 100%)', border: '1px solid rgba(212,175,55,0.4)' }}>
          <p className="text-sm font-bold text-gold uppercase tracking-widest mb-1">Mois en cours</p>
          <p className="text-4xl font-extrabold text-white">Juin 2026</p>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Échéances à venir</h2>
        <div className="relative border-l-2 border-white/10 ml-6 space-y-8 pb-10">
          {events.map((e, i) => (
            <div key={e.id} className="relative pl-8 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-[#05070B]" style={{ background: e.color }} />
              
              <div className="rounded-[20px] p-5" style={{ background: '#090E17', border: '1px solid #1C2A3A' }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ background: `${e.color}15`, color: e.color }}>
                    {e.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-text">
                    <Clock size={14} />
                    <span className="text-xs font-semibold">{e.time}</span>
                  </div>
                </div>
                <p className="text-lg font-bold text-white leading-tight mb-2">{e.title}</p>
                <p className="text-sm font-medium text-gold">{e.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
