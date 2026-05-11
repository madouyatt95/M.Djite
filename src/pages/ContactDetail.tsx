import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Mail, Edit } from 'lucide-react';
import { contacts } from '../data/contacts';

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contacts.find(c => c.id === id);

  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-text">Contact non trouvé</p>
      </div>
    );
  }

  const actions = [
    { label: 'Appeler', icon: Phone, color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)', action: () => window.open(`tel:${contact.phone}`) },
    { label: 'WhatsApp', icon: MessageCircle, color: '#25D366', bg: 'rgba(37, 211, 102, 0.1)', action: () => window.open(`https://wa.me/${contact.phone.replace(/\s/g, '')}`) },
    { label: 'Email', icon: Mail, color: '#0EA5FF', bg: 'rgba(14, 165, 255, 0.1)', action: () => window.open(`mailto:${contact.email}`) },
    { label: 'Modifier', icon: Edit, color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', action: () => {} },
  ];

  return (
    <div className="h-full scroll-hidden page-enter">
      <div className="px-5 pt-12 pb-6 space-y-6">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-dark-card flex items-center justify-center border border-gray-border/30"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Profile */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4" style={{
            border: '3px solid rgba(212, 175, 55, 0.4)',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.15)',
          }}>
            <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">{contact.name}</h1>
          <p className="text-sm text-gold font-medium">{contact.function}</p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-4 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.action}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95"
                style={{
                  backgroundColor: action.bg,
                  border: `1px solid ${action.color}20`,
                }}
              >
                <Icon size={20} style={{ color: action.color }} />
                <span className="text-[10px] text-gray-text font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Information */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Informations</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-text mb-1">Téléphone</p>
              <p className="text-sm text-white font-medium">{contact.phone}</p>
            </div>
            <div className="h-px bg-gray-border/20" />
            <div>
              <p className="text-xs text-gray-text mb-1">Email</p>
              <p className="text-sm text-white font-medium">{contact.email}</p>
            </div>
            <div className="h-px bg-gray-border/20" />
            <div>
              <p className="text-xs text-gray-text mb-1">Adresse</p>
              <p className="text-sm text-white font-medium">{contact.address}</p>
            </div>
            <div className="h-px bg-gray-border/20" />
            <div>
              <p className="text-xs text-gray-text mb-1">Projets liés</p>
              <p className="text-sm text-white font-medium">{contact.linkedProjects || 'Aucun'}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Notes</h3>
          <p className="text-sm text-gray-text leading-relaxed">{contact.notes}</p>
        </div>
      </div>
    </div>
  );
}
