import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, ChevronDown } from 'lucide-react';
import { sectors } from '../data/projects';

export default function AddProject() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', sector: '', location: '', status: 'Idée', amount: '' });
  const submit = () => { alert('Enregistré'); nav('/projects'); };

  const inputClass = "w-full pl-5 pr-10 py-4 rounded-2xl text-base text-white placeholder:text-gray-text outline-none focus:border-gold/50 transition-colors";

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14 pb-32 space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => nav(-1)} className="w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-transform" style={{background:'#090E17', border: '1px solid #1C2A3A'}}>
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Nouveau Projet</h1>
          <button onClick={submit} className="text-gold text-base font-bold active:opacity-70 px-2 py-2">Enregistrer</button>
        </div>

        <button className="w-full h-40 rounded-3xl flex flex-col items-center justify-center gap-3 active:scale-[0.98] transition-transform" style={{background:'#090E17', border:'2px dashed #1C2A3A'}}>
          <Upload size={28} className="text-gray-text" />
          <span className="text-sm font-medium text-gray-text">Ajouter une image</span>
        </button>

        <div className="space-y-5">
          <div><label className="text-sm font-medium text-gray-text mb-2.5 block px-1">Nom du projet</label>
            <input type="text" placeholder="Ex : Poulailler" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={inputClass} style={{ background: '#090E17', border: '1.5px solid #1C2A3A' }} /></div>
          
          <div><label className="text-sm font-medium text-gray-text mb-2.5 block px-1">Secteur</label>
            <div className="relative">
              <select value={form.sector} onChange={e=>setForm({...form,sector:e.target.value})} className={`${inputClass} appearance-none`} style={{ background: '#090E17', border: '1.5px solid #1C2A3A' }}>
                <option value="">Sélectionner un secteur</option>{sectors.map(s=><option key={s} value={s}>{s}</option>)}
              </select><ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none"/>
            </div></div>
            
          <div><label className="text-sm font-medium text-gray-text mb-2.5 block px-1">Localisation</label>
            <input type="text" placeholder="Ex : Dakar, Sénégal" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className={inputClass} style={{ background: '#090E17', border: '1.5px solid #1C2A3A' }} /></div>
            
          <div><label className="text-sm font-medium text-gray-text mb-2.5 block px-1">Statut</label>
            <div className="relative">
              <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className={`${inputClass} appearance-none`} style={{ background: '#090E17', border: '1.5px solid #1C2A3A' }}>
                {['Idée','En cours','Actif','Terminé'].map(s=><option key={s} value={s}>{s}</option>)}
              </select><ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none"/>
            </div></div>
            
          <div><label className="text-sm font-medium text-gray-text mb-2.5 block px-1">Montant initial investi</label>
            <input type="text" placeholder="Ex : 0 FCFA" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} className={inputClass} style={{ background: '#090E17', border: '1.5px solid #1C2A3A' }} /></div>
        </div>

        <button onClick={submit} className="w-full py-4 rounded-2xl text-center text-dark bg-gold font-bold text-base mt-4 active:scale-[0.98] shadow-lg shadow-gold/20 transition-transform">
          Enregistrer
        </button>
      </div>
    </div>
  );
}
