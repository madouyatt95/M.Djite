import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, ChevronDown } from 'lucide-react';
import { sectors } from '../data/projects';

const statuses = ['Idée', 'En cours', 'Actif', 'Terminé'];

export default function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    location: '',
    status: 'Idée',
    amount: '',
  });

  const handleSubmit = () => {
    alert('Projet enregistré avec succès !');
    navigate('/projects');
  };

  return (
    <div className="page-scroll page-enter bg-dark">
      <div className="px-5 pt-[env(safe-area-inset-top,48px)] pb-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-dark-card flex items-center justify-center border border-gray-border/30"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Nouveau Projet</h1>
          <button 
            onClick={handleSubmit}
            className="text-gold text-sm font-semibold"
          >
            Enregistrer
          </button>
        </div>

        {/* Image upload */}
        <button className="w-full h-40 rounded-3xl border-2 border-dashed border-gray-border/40 flex flex-col items-center justify-center gap-3 bg-dark-card/50 transition-colors hover:border-gold/30">
          <div className="w-12 h-12 rounded-2xl bg-dark-card-lighter flex items-center justify-center border border-gray-border/30">
            <Upload size={20} className="text-gray-text" />
          </div>
          <span className="text-xs text-gray-text">Ajouter une image</span>
        </button>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs text-gray-text mb-2 block">Nom du projet</label>
            <input
              type="text"
              placeholder="Ex : Poulailler"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl bg-dark-card border border-gray-border/30 text-white text-sm placeholder:text-gray-text/40 focus:outline-none focus:border-gold/30 transition-colors"
            />
          </div>

          {/* Sector */}
          <div>
            <label className="text-xs text-gray-text mb-2 block">Secteur</label>
            <div className="relative">
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-dark-card border border-gray-border/30 text-white text-sm appearance-none focus:outline-none focus:border-gold/30 transition-colors"
              >
                <option value="" className="bg-dark-card text-gray-text">Sélectionner un secteur</option>
                {sectors.map(s => (
                  <option key={s} value={s} className="bg-dark-card">{s}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs text-gray-text mb-2 block">Localisation</label>
            <input
              type="text"
              placeholder="Ex : Dakar, Sénégal"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl bg-dark-card border border-gray-border/30 text-white text-sm placeholder:text-gray-text/40 focus:outline-none focus:border-gold/30 transition-colors"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-xs text-gray-text mb-2 block">Statut</label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-dark-card border border-gray-border/30 text-white text-sm appearance-none focus:outline-none focus:border-gold/30 transition-colors"
              >
                {statuses.map(s => (
                  <option key={s} value={s} className="bg-dark-card">{s}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none" />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs text-gray-text mb-2 block">Montant initial investi</label>
            <input
              type="text"
              placeholder="Ex : 0 FCFA"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl bg-dark-card border border-gray-border/30 text-white text-sm placeholder:text-gray-text/40 focus:outline-none focus:border-gold/30 transition-colors"
            />
          </div>
        </div>

        {/* Submit button */}
        <button 
          onClick={handleSubmit}
          className="btn-gold w-full text-sm font-bold mt-4"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
