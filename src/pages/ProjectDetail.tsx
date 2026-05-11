import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';
import { projects, formatFullAmount } from '../data/projects';

const badgeClass: Record<string, string> = {
  'En cours': 'badge badge-encours', 'Actif': 'badge badge-actif',
  'Terminé': 'badge badge-termine', 'Idée': 'badge badge-idee',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  if (!project) return <div className="flex items-center justify-center h-full"><p className="text-gray-text">Projet non trouvé</p></div>;

  const benefitColor = project.benefitNet >= 0 ? 'text-success' : 'text-danger';
  const benefitPrefix = project.benefitNet >= 0 ? '+' : '';

  return (
    <div className="page-enter">
      <div className="relative h-52">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,7,11,0.2), rgba(5,7,11,0.9))' }} />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 w-10 h-10 rounded-full bg-dark/60 backdrop-blur flex items-center justify-center border border-white/10">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white">{project.name}</h1>
            <span className={badgeClass[project.status] || 'badge badge-termine'}>{project.status}</span>
          </div>
          <p className="text-sm text-gray-text">{project.sector}</p>
        </div>
      </div>

      <div className="px-4 pb-6 space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: DollarSign, label: 'Investi', value: formatFullAmount(project.investmentInitial), color: 'text-gold', iconColor: 'text-gold' },
            { icon: Receipt, label: 'Dépenses', value: formatFullAmount(project.expenses), color: 'text-white', iconColor: 'text-danger' },
            { icon: TrendingUp, label: 'Revenus', value: formatFullAmount(project.revenues), color: 'text-white', iconColor: 'text-success' },
            { icon: project.benefitNet >= 0 ? TrendingUp : TrendingDown, label: 'Bénéfice Net', value: `${benefitPrefix}${formatFullAmount(project.benefitNet)}`, color: benefitColor, iconColor: benefitColor },
          ].map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className={kpi.iconColor} />
                  <span className="text-xs text-gray-text">{kpi.label}</span>
                </div>
                <p className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-[10px] text-gray-text">FCFA</p>
              </div>
            );
          })}
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-white">Progression</span>
            <span className="text-sm font-bold text-gold">{project.progression}%</span>
          </div>
          <div className="h-2.5 bg-dark rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${project.progression}%`, background: 'linear-gradient(90deg, #D4AF37, #E8C84A)' }} />
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-3">Informations</h3>
          <div className="space-y-3">
            {[
              { l: 'Localisation', v: `${project.city}, ${project.country}` },
              { l: 'Démarrage', v: project.startDate },
              { l: 'Responsable', v: project.responsible },
            ].map((item, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px bg-gray-border/20 mb-3" />}
                <div className="flex justify-between">
                  <span className="text-xs text-gray-text">{item.l}</span>
                  <span className="text-xs text-white font-medium">{item.v}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-gold w-full text-sm font-bold">Voir les détails financiers</button>
      </div>
    </div>
  );
}
