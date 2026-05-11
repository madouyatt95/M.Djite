import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';
import { projects, formatFullAmount } from '../data/projects';

const statusColorMap: Record<string, string> = {
  'En cours': 'bg-electric-blue/20 text-electric-blue border-electric-blue/30',
  'Actif': 'bg-success/20 text-success border-success/30',
  'Terminé': 'bg-gray-text/20 text-gray-text border-gray-text/30',
  'Idée': 'bg-warning/20 text-warning border-warning/30',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="page-scroll flex items-center justify-center">
        <p className="text-gray-text">Projet non trouvé</p>
      </div>
    );
  }

  const benefitColor = project.benefitNet >= 0 ? 'text-success' : 'text-danger';
  const benefitPrefix = project.benefitNet >= 0 ? '+' : '';

  return (
    <div className="page-scroll page-enter bg-dark">
      {/* Cover Image */}
      <div className="relative h-56">
        <img 
          src={project.image} 
          alt={project.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(5,7,11,0.3) 0%, rgba(5,7,11,0.9) 100%)',
        }} />
        
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-14 left-5 w-10 h-10 rounded-full bg-dark/60 backdrop-blur-sm flex items-center justify-center border border-white/10"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Title on image */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColorMap[project.status]}`}>
              {project.status}
            </span>
          </div>
          <p className="text-sm text-gray-text">{project.sector}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="px-5 space-y-5 pb-8">
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={14} className="text-gold" />
              <span className="text-xs text-gray-text">Investi</span>
            </div>
            <p className="text-sm font-bold text-white">{formatFullAmount(project.investmentInitial)}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Receipt size={14} className="text-danger" />
              <span className="text-xs text-gray-text">Dépenses</span>
            </div>
            <p className="text-sm font-bold text-white">{formatFullAmount(project.expenses)}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-success" />
              <span className="text-xs text-gray-text">Revenus</span>
            </div>
            <p className="text-sm font-bold text-white">{formatFullAmount(project.revenues)}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              {project.benefitNet >= 0 ? <TrendingUp size={14} className="text-success" /> : <TrendingDown size={14} className="text-danger" />}
              <span className="text-xs text-gray-text">Bénéfice Net</span>
            </div>
            <p className={`text-sm font-bold ${benefitColor}`}>
              {benefitPrefix}{formatFullAmount(project.benefitNet)}
            </p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
        </div>

        {/* Progression */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Progression</span>
            <span className="text-sm font-bold text-gold">{project.progression}%</span>
          </div>
          <div className="h-2.5 bg-dark rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${project.progression}%`,
                background: 'linear-gradient(90deg, #D4AF37, #E8C84A)',
              }}
            />
          </div>
        </div>

        {/* Information */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Informations</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-gray-text">Localisation</span>
              <span className="text-xs text-white font-medium">{project.city}, {project.country}</span>
            </div>
            <div className="h-px bg-gray-border/20" />
            <div className="flex justify-between">
              <span className="text-xs text-gray-text">Date de démarrage</span>
              <span className="text-xs text-white font-medium">{project.startDate}</span>
            </div>
            <div className="h-px bg-gray-border/20" />
            <div className="flex justify-between">
              <span className="text-xs text-gray-text">Responsable</span>
              <span className="text-xs text-white font-medium">{project.responsible}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="btn-gold w-full text-sm font-bold">
          Voir les détails financiers
        </button>
      </div>
    </div>
  );
}
