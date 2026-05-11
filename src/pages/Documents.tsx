import { useState } from 'react';
import { Search, FileText, FileSpreadsheet, File } from 'lucide-react';
import { documents, documentFilters } from '../data/documents';

const icons: Record<string,{icon:typeof FileText,color:string}> = {
  'PDF':{icon:FileText,color:'#EF4444'},'Excel':{icon:FileSpreadsheet,color:'#22C55E'},'Word':{icon:File,color:'#3B82F6'},
};

export default function Documents() {
  const [filter, setFilter] = useState('Tous');
  const [search, setSearch] = useState('');
  const list = documents.filter(d => (filter==='Tous'||d.category===filter) && d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-enter">
      <div className="px-4 pt-12">
        <h1 className="text-lg font-bold text-white mb-4">Documents</h1>
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text"/>
          <input type="text" placeholder="Rechercher un document..." value={search} onChange={e=>setSearch(e.target.value)} className="input pl-9"/>
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {documentFilters.map(f=>(
            <button key={f} onClick={()=>setFilter(f)} className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${filter===f?'bg-gold text-dark':'text-gray-text'}`}
              style={filter!==f?{background:'#0C1422',border:'1px solid #1C2A3A'}:{}}>{f}</button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-6 space-y-2.5">
        {list.map((doc,i) => {
          const t=icons[doc.type]; const Icon=t.icon;
          return (
            <div key={doc.id} className="card flex items-center gap-3" style={{padding:12,animationDelay:`${i*50}ms`,animation:'fadeInUp 0.35s ease-out forwards',opacity:0}}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:`${t.color}12`,border:`1px solid ${t.color}25`}}>
                <Icon size={18} style={{color:t.color}}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-white truncate mb-0.5">{doc.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{background:`${t.color}12`,color:t.color}}>{doc.type}</span>
                  <span className="text-[9px] text-gray-text">{doc.size}</span>
                  <span className="text-[9px] text-gray-text">{doc.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
