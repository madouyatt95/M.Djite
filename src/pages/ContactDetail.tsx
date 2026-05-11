import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Mail, Edit } from 'lucide-react';
import { contacts } from '../data/contacts';

export default function ContactDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const c = contacts.find(x => x.id === id);

  if (!c) return <div className="flex items-center justify-center h-full"><p className="text-gray-text">Contact non trouvé</p></div>;

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-6 space-y-4">
        <button onClick={() => nav(-1)} className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-border/40" style={{background:'#0C1422'}}>
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-2.5 border-2 border-gold/40">
            <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-lg font-bold text-white mb-0.5">{c.name}</h1>
          <p className="text-[13px] text-gold font-medium">{c.function}</p>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {[
            { l: 'Appeler', i: Phone, c: '#22C55E' },
            { l: 'WhatsApp', i: MessageCircle, c: '#25D366' },
            { l: 'Email', i: Mail, c: '#0EA5FF' },
            { l: 'Modifier', i: Edit, c: '#D4AF37' },
          ].map(a => {
            const Icon = a.i;
            return (
              <button key={a.l} className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl active:scale-95 transition-transform" style={{background:`${a.c}10`,border:`1px solid ${a.c}20`}}>
                <Icon size={16} style={{color:a.c}} />
                <span className="text-[9px] text-gray-text font-medium">{a.l}</span>
              </button>
            );
          })}
        </div>

        <div className="card">
          <p className="text-[13px] font-bold text-white mb-3">Informations</p>
          {[
            { l: 'Téléphone', v: c.phone }, { l: 'Email', v: c.email },
            { l: 'Adresse', v: c.address }, { l: 'Projets liés', v: c.linkedProjects || 'Aucun' },
          ].map((item, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px my-2.5" style={{background:'#1C2A3A'}}/>}
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] text-gray-text">{item.l}</span>
                <span className="text-[12px] text-white font-medium">{item.v}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <p className="text-[13px] font-bold text-white mb-2">Notes</p>
          <p className="text-[11px] text-gray-text leading-relaxed">{c.notes}</p>
        </div>
      </div>
    </div>
  );
}
