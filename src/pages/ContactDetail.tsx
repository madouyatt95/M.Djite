import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Mail, Edit } from 'lucide-react';
import { contacts } from '../data/contacts';

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contacts.find(c => c.id === id);

  if (!contact) return <div className="flex items-center justify-center h-full"><p className="text-gray-text">Contact non trouvé</p></div>;

  const actions = [
    { label: 'Appeler', icon: Phone, color: '#22C55E' },
    { label: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
    { label: 'Email', icon: Mail, color: '#0EA5FF' },
    { label: 'Modifier', icon: Edit, color: '#D4AF37' },
  ];

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-6 space-y-5">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-dark-card flex items-center justify-center border border-gray-border/40">
          <ArrowLeft size={20} className="text-white" />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-[3px] border-gold/40">
            <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold text-white mb-0.5">{contact.name}</h1>
          <p className="text-sm text-gold font-medium">{contact.function}</p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {actions.map(a => {
            const Icon = a.icon;
            return (
              <button key={a.label} className="flex flex-col items-center gap-2 p-3 rounded-2xl active:scale-95 border" style={{ backgroundColor: `${a.color}10`, borderColor: `${a.color}25` }}>
                <Icon size={20} style={{ color: a.color }} />
                <span className="text-[10px] text-gray-text font-medium">{a.label}</span>
              </button>
            );
          })}
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-4">Informations</h3>
          <div className="space-y-3">
            {[
              { label: 'Téléphone', value: contact.phone },
              { label: 'Email', value: contact.email },
              { label: 'Adresse', value: contact.address },
              { label: 'Projets liés', value: contact.linkedProjects || 'Aucun' },
            ].map((item, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px bg-gray-border/20 mb-3" />}
                <p className="text-xs text-gray-text mb-0.5">{item.label}</p>
                <p className="text-sm text-white font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-2">Notes</h3>
          <p className="text-sm text-gray-text leading-relaxed">{contact.notes}</p>
        </div>
      </div>
    </div>
  );
}
