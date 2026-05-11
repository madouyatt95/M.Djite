import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, ChevronDown } from 'lucide-react';
import { sectors } from '../data/projects';

export default function AddProject() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', sector: '', location: '', status: 'Idée', amount: '' });
  const submit = () => { alert('Enregistré'); nav('/projects'); };

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-6 space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => nav(-1)} className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-border/40" style={{background:'#0C1422'}}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Nouveau Projet</h1>
          <button onClick={submit} className="text-gold text-[12px] font-semibold">Enregistrer</button>
        </div>

        <button className="w-full h-32 rounded-xl flex flex-col items-center justify-center gap-2" style={{background:'#0C1422',border:'1px dashed #1C2A3A'}}>
          <Upload size={18} className="text-gray-text" />
          <span className="text-[11px] text-gray-text">Ajouter une image</span>
        </button>

        <div className="space-y-3">
          <div><label className="text-[11px] text-gray-text mb-1.5 block">Nom du projet</label>
            <input type="text" placeholder="Ex : Poulailler" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="input" /></div>
          <div><label className="text-[11px] text-gray-text mb-1.5 block">Secteur</label>
            <div className="relative">
              <select value={form.sector} onChange={e=>setForm({...form,sector:e.target.value})} className="input appearance-none">
                <option value="">Sélectionner un secteur</option>{sectors.map(s=><option key={s} value={s}>{s}</option>)}
              </select><ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none"/>
            </div></div>
          <div><label className="text-[11px] text-gray-text mb-1.5 block">Localisation</label>
            <input type="text" placeholder="Ex : Dakar, Sénégal" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className="input" /></div>
          <div><label className="text-[11px] text-gray-text mb-1.5 block">Statut</label>
            <div className="relative">
              <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="input appearance-none">
                {['Idée','En cours','Actif','Terminé'].map(s=><option key={s} value={s}>{s}</option>)}
              </select><ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none"/>
            </div></div>
          <div><label className="text-[11px] text-gray-text mb-1.5 block">Montant initial investi</label>
            <input type="text" placeholder="Ex : 0 FCFA" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} className="input" /></div>
        </div>

        <button onClick={submit} className="btn-gold w-full text-[13px] mt-2">Enregistrer</button>
      </div>
    </div>
  );
}
