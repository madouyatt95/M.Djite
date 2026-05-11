import { useState } from 'react';
import { Search, Plus, Lock, Folder, FileText, ChevronRight } from 'lucide-react';

const folders = [
  { id: 1, name: 'Statuts & Kbis', count: 4, color: '#D4AF37' },
  { id: 2, name: 'Contrats', count: 12, color: '#0EA5FF' },
  { id: 3, name: 'Titres Fonciers', count: 8, color: '#22C55E' },
  { id: 4, name: 'Passeports & ID', count: 3, color: '#8B5CF6' },
  { id: 5, name: 'Assurances', count: 5, color: '#F59E0B' },
  { id: 6, name: 'Décisions de Justice', count: 2, color: '#EF4444' },
];

const recentFiles = [
  { id: 101, name: 'Titre Foncier_Immeuble Fann.pdf', size: '2.4 MB', date: 'Aujourd\'hui' },
  { id: 102, name: 'Contrat_Partenariat_Guinée.pdf', size: '1.1 MB', date: 'Hier' },
];

export default function Documents() {
  const [search, setSearch] = useState('');

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-6 pt-14 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Lock size={28} className="text-gold" />
            <h1 className="text-3xl font-bold text-white">Coffre-Fort</h1>
          </div>
          <button onClick={() => alert('Authentification requise')} className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/20 active:scale-95 transition-transform">
            <Plus size={28} className="text-white" strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="relative mb-8">
          <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"/>
          <input type="text" placeholder="Rechercher dans le coffre..." value={search} onChange={e=>setSearch(e.target.value)} 
            className="w-full pl-14 pr-4 py-4 rounded-2xl text-base text-white placeholder:text-gray-text outline-none focus:border-gold/50 transition-colors"
            style={{background:'#090E17', border:'1.5px solid #1C2A3A'}}/>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Dossiers Sécurisés</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {folders.map((f, i) => (
            <button key={f.id} className="rounded-[24px] p-5 text-left flex flex-col gap-3 active:scale-[0.98] transition-transform" 
              style={{background:'#090E17', border:'1px solid #1C2A3A', animationDelay:`${i*40}ms`,animation:'fadeInUp 0.3s ease-out forwards',opacity:0}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: `${f.color}15`}}>
                <Folder size={24} style={{color: f.color}} />
              </div>
              <div>
                <p className="text-base font-bold text-white leading-tight">{f.name}</p>
                <p className="text-xs text-gray-text font-medium mt-1">{f.count} fichiers</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Ajouts Récents</h2>
          <ChevronRight size={20} className="text-gray-text" />
        </div>
        <div className="space-y-4 pb-32">
          {recentFiles.map(file => (
            <div key={file.id} className="rounded-2xl p-5 flex items-center gap-5" style={{background:'#090E17', border:'1px solid #1C2A3A'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{background: 'rgba(239,68,68,0.1)'}}>
                <FileText size={20} className="text-danger" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate mb-0.5">{file.name}</p>
                <div className="flex gap-2">
                  <span className="text-[11px] text-gray-text font-medium">{file.size}</span>
                  <span className="text-[11px] text-gray-text font-medium">{file.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
