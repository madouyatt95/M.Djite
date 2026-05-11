import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';
import { projects } from '../data/projects';
import { usePrivacy } from '../context/PrivacyContext';

const badgeMap: Record<string, { bg: string; text: string }> = {
  'En cours': { bg: 'rgba(34, 197, 94, 0.15)', text: '#22C55E' }, 
  'Actif': { bg: 'rgba(34, 197, 94, 0.15)', text: '#22C55E' },
  'Terminé': { bg: 'rgba(156, 163, 175, 0.15)', text: '#9CA3AF' },
  'Idée': { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B' },
};

export default function ProjectDetail() {
  const { formatAmount } = usePrivacy();
  const { id } = useParams();
  const nav = useNavigate();
  const p = projects.find(x => x.id === id);
  if (!p) return <div className="flex items-center justify-center h-full"><p className="text-gray-text">Projet non trouvé</p></div>;

  let bStyle = badgeMap[p.status] || badgeMap['Terminé'];
  if (p.status === 'En cours' && (p.name.includes('Immeuble') || p.name.includes('Coups') || p.name.includes('Restaurant'))) {
     bStyle = { bg: 'rgba(14, 165, 255, 0.15)', text: '#0EA5FF' };
  }

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      {/* Cover */}
      <div className="relative h-[280px]">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,7,11,0.2), rgba(5,7,11,0.95))' }} />
        
        <button onClick={() => nav(-1)} className="absolute top-14 left-5 w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-transform" style={{ background: 'rgba(5,7,11,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <ArrowLeft size={24} className="text-white" />
        </button>
        
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h1 className="text-3xl font-bold text-white leading-tight">{p.name}</h1>
            <span className="px-3 py-1.5 rounded-full text-xs font-bold mt-1 flex-shrink-0" style={{ background: bStyle.bg, color: bStyle.text }}>{p.status}</span>
          </div>
          <p className="text-base font-medium text-gray-text">{p.sector}</p>
        </div>
      </div>

      <div className="px-5 pb-32 space-y-5 mt-4">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: DollarSign, label: 'Investi', value: formatAmount(p.investmentInitial), color: 'text-white', ic: 'text-gold' },
            { icon: Receipt, label: 'Dépenses', value: formatAmount(p.expenses), color: 'text-white', ic: 'text-danger' },
            { icon: TrendingUp, label: 'Revenus', value: formatAmount(p.revenues), color: 'text-white', ic: 'text-success' },
            { icon: p.benefitNet >= 0 ? TrendingUp : TrendingDown, label: 'Bénéfice Net', value: `${p.benefitNet >= 0 ? '+' : ''}${formatAmount(p.benefitNet)}`, color: p.benefitNet >= 0 ? 'text-success' : 'text-danger', ic: p.benefitNet >= 0 ? 'text-success' : 'text-danger' },
          ].map((k, i) => { const Icon = k.icon; return (
            <div key={i} className="rounded-3xl p-5" style={{background:'#090E17', border:'1px solid #1C2A3A'}}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <Icon size={18} className={k.ic} />
                <span className="text-xs font-medium text-gray-text">{k.label}</span>
              </div>
              <p className={`text-xl font-bold ${k.color} truncate`}>{k.value}</p>
              <p className="text-[10px] text-gray-text mt-1">FCFA</p>
            </div>
          ); })}
        </div>

        {/* Progress */}
        <div className="rounded-3xl p-6" style={{background:'#090E17', border:'1px solid #1C2A3A'}}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-white">Progression</span>
            <span className="text-xl font-extrabold text-gold">{p.progression}%</span>
          </div>
          <div className="h-3.5 rounded-full overflow-hidden" style={{ background: '#1C2A3A' }}>
            <div className="h-full rounded-full" style={{ width: `${p.progression}%`, background: 'linear-gradient(90deg, #D4AF37, #E8C84A)' }} />
          </div>
        </div>

        {/* Info */}
        <div className="rounded-3xl p-6" style={{background:'#090E17', border:'1px solid #1C2A3A'}}>
          <p className="text-lg font-bold text-white mb-5">Informations</p>
          {[
            { l: 'Localisation', v: `${p.city}, ${p.country}` },
            { l: 'Date de démarrage', v: p.startDate },
            { l: 'Responsable', v: p.responsible },
          ].map((item, i) => (
            <div key={i}>
              {i > 0 && <div className="h-[1.5px] my-4" style={{ background: '#1C2A3A' }} />}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-text">{item.l}</span>
                <span className="text-base text-white font-semibold">{item.v}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-4 rounded-2xl text-center text-dark bg-gold font-bold text-base mt-2 active:scale-[0.98] shadow-lg shadow-gold/20 transition-transform">
          Voir les détails financiers
        </button>
      </div>
    </div>
  );
}
