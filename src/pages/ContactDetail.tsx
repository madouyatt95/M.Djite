import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Mail, Edit } from 'lucide-react';
import { contacts } from '../data/contacts';

export default function ContactDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const c = contacts.find(x => x.id === id);

  if (!c) return <div className="flex items-center justify-center h-full"><p className="text-gray-text">Contact non trouvé</p></div>;

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14 pb-32 space-y-6">
        <button onClick={() => nav(-1)} className="w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-transform" style={{background:'#090E17', border: '1px solid #1C2A3A'}}>
          <ArrowLeft size={24} className="text-white" />
        </button>

        <div className="flex flex-col items-center mb-8 mt-2">
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-[3px] border-gold/40 shadow-xl shadow-gold/10">
            <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{c.name}</h1>
          <p className="text-base text-gold font-medium">{c.role}</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { l: 'Appeler', i: Phone, c: '#22C55E' },
            { l: 'WhatsApp', i: MessageCircle, c: '#25D366' },
            { l: 'Email', i: Mail, c: '#0EA5FF' },
            { l: 'Modifier', i: Edit, c: '#D4AF37' },
          ].map(a => {
            const Icon = a.i;
            return (
              <button key={a.l} className="flex flex-col items-center justify-center gap-2.5 py-4 rounded-2xl active:scale-95 transition-transform" style={{background:`${a.c}10`,border:`1.5px solid ${a.c}25`}}>
                <Icon size={24} style={{color:a.c}} />
                <span className="text-[11px] text-gray-text font-bold">{a.l}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl p-6" style={{background:'#090E17', border:'1px solid #1C2A3A'}}>
          <p className="text-lg font-bold text-white mb-5">Informations</p>
          {[
            { l: 'Téléphone', v: c.phone }, { l: 'Email', v: c.email },
            { l: 'Adresse', v: c.address }
          ].map((item, i) => (
            <div key={i}>
              {i > 0 && <div className="h-[1.5px] my-4" style={{background:'#1C2A3A'}}/>}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-text">{item.l}</span>
                <span className="text-base text-white font-semibold">{item.v}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Historique des Échanges</h2>
        <div className="space-y-4">
          <div className="rounded-2xl p-4" style={{background:'#090E17', border:'1px solid #1C2A3A'}}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-gold">Appel Sortant</span>
              <span className="text-xs text-gray-text">Aujourd'hui, 14:30</span>
            </div>
            <p className="text-sm text-white font-medium">Point sur le financement. Accord de principe obtenu.</p>
          </div>
          <div className="rounded-2xl p-4" style={{background:'#090E17', border:'1px solid #1C2A3A'}}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold" style={{color: '#0EA5FF'}}>Email Reçu</span>
              <span className="text-xs text-gray-text">10 Mai 2026</span>
            </div>
            <p className="text-sm text-white font-medium">Envoi des documents légaux signés pour le projet.</p>
          </div>
          <div className="rounded-2xl p-4" style={{background:'#090E17', border:'1px solid #1C2A3A'}}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-success">Rendez-vous</span>
              <span className="text-xs text-gray-text">2 Avril 2026</span>
            </div>
            <p className="text-sm text-white font-medium">Rencontre physique au cabinet pour discuter des aspects fiscaux.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
