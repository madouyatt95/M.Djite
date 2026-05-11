import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';
import { projects, formatFullAmount } from '../data/projects';

const badgeMap: Record<string, string> = {
  'En cours': 'badge badge-encours', 'Actif': 'badge badge-actif',
  'Terminé': 'badge badge-termine', 'Idée': 'badge badge-idee',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const p = projects.find(x => x.id === id);
  if (!p) return <div className="flex items-center justify-center h-full"><p className="text-gray-text">Projet non trouvé</p></div>;

  return (
    <div className="page-enter">
      {/* Cover */}
      <div className="relative h-48">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,7,11,0.2), rgba(5,7,11,0.9))' }} />
        <button onClick={() => nav(-1)} className="absolute top-12 left-4 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(5,7,11,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-2 mb-0.5">
            <h1 className="text-lg font-bold text-white">{p.name}</h1>
            <span className={badgeMap[p.status] || 'badge badge-termine'}>{p.status}</span>
          </div>
          <p className="text-xs text-gray-text">{p.sector}</p>
        </div>
      </div>

      <div className="px-4 pb-6 space-y-3 mt-3">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: DollarSign, label: 'Investi', value: formatFullAmount(p.investmentInitial), color: 'text-white', ic: 'text-gold' },
            { icon: Receipt, label: 'Dépenses', value: formatFullAmount(p.expenses), color: 'text-white', ic: 'text-danger' },
            { icon: TrendingUp, label: 'Revenus', value: formatFullAmount(p.revenues), color: 'text-white', ic: 'text-success' },
            { icon: p.benefitNet >= 0 ? TrendingUp : TrendingDown, label: 'Bénéfice Net', value: `${p.benefitNet >= 0 ? '+' : ''}${formatFullAmount(p.benefitNet)}`, color: p.benefitNet >= 0 ? 'text-success' : 'text-danger', ic: p.benefitNet >= 0 ? 'text-success' : 'text-danger' },
          ].map((k, i) => { const Icon = k.icon; return (
            <div key={i} className="card">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon size={13} className={k.ic} />
                <span className="text-[10px] text-gray-text">{k.label}</span>
              </div>
              <p className={`text-[13px] font-bold ${k.color}`}>{k.value}</p>
              <p className="text-[9px] text-gray-text">FCFA</p>
            </div>
          ); })}
        </div>

        {/* Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-white">Progression</span>
            <span className="text-[13px] font-bold text-gold">{p.progression}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: '#1C2A3A' }}>
            <div className="h-full rounded-full" style={{ width: `${p.progression}%`, background: 'linear-gradient(90deg, #D4AF37, #E8C84A)' }} />
          </div>
        </div>

        {/* Info */}
        <div className="card">
          <p className="text-[13px] font-bold text-white mb-3">Informations</p>
          {[
            { l: 'Localisation', v: `${p.city}, ${p.country}` },
            { l: 'Date de démarrage', v: p.startDate },
            { l: 'Responsable', v: p.responsible },
          ].map((item, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px my-2.5" style={{ background: '#1C2A3A' }} />}
              <div className="flex justify-between">
                <span className="text-[11px] text-gray-text">{item.l}</span>
                <span className="text-[11px] text-white font-medium">{item.v}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-gold w-full text-[13px]">Voir les détails financiers</button>
      </div>
    </div>
  );
}
