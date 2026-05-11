import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, ChevronDown } from 'lucide-react';
import { sectors } from '../data/projects';

export default function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', sector: '', location: '', status: 'Idée', amount: '' });
  const handleSubmit = () => { alert('Projet enregistré !'); navigate('/projects'); };
  const inputClass = "w-full px-4 py-3 rounded-2xl bg-dark-card border border-gray-border/40 text-white text-sm placeholder:text-gray-text/40 focus:outline-none focus:border-gold/40";

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-6 space-y-5">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-dark-card flex items-center justify-center border border-gray-border/40"><ArrowLeft size={20} className="text-white" /></button>
          <h1 className="text-lg font-bold text-white">Nouveau Projet</h1>
          <button onClick={handleSubmit} className="text-gold text-sm font-semibold">Enregistrer</button>
        </div>
        <button className="w-full h-36 rounded-2xl border-2 border-dashed border-gray-border/40 flex flex-col items-center justify-center gap-2 bg-dark-card/50">
          <Upload size={20} className="text-gray-text" /><span className="text-xs text-gray-text">Ajouter une image</span>
        </button>
        <div className="space-y-4">
          <div><label className="text-xs text-gray-text mb-1.5 block">Nom du projet</label>
            <input type="text" placeholder="Ex : Poulailler" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClass} /></div>
          <div><label className="text-xs text-gray-text mb-1.5 block">Secteur</label>
            <div className="relative"><select value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})} className={`${inputClass} appearance-none`}>
              <option value="">Sélectionner</option>{sectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select><ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none" /></div></div>
          <div><label className="text-xs text-gray-text mb-1.5 block">Localisation</label>
            <input type="text" placeholder="Ex : Dakar" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className={inputClass} /></div>
          <div><label className="text-xs text-gray-text mb-1.5 block">Montant initial</label>
            <input type="text" placeholder="0 FCFA" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className={inputClass} /></div>
        </div>
        <button onClick={handleSubmit} className="btn-gold w-full text-sm font-bold">Enregistrer</button>
      </div>
    </div>
  );
}
