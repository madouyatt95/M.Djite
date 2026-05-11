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
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14">
        <h1 className="text-3xl font-bold text-white mb-8">Documents</h1>
        
        <div className="relative mb-6">
          <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"/>
          <input type="text" placeholder="Rechercher un document..." value={search} onChange={e=>setSearch(e.target.value)} 
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-base text-white placeholder:text-gray-text outline-none focus:border-gold/50 transition-colors"
            style={{background:'#090E17', border:'1.5px solid #1C2A3A'}}/>
        </div>
        
        <div className="flex gap-8 mb-6 overflow-x-auto no-scrollbar border-b border-white/10">
          {documentFilters.map(f=>{
            const active = filter===f;
            return (
            <button key={f} onClick={()=>setFilter(f)} 
              className={`pb-4 text-base font-medium whitespace-nowrap relative transition-colors ${active?'text-white':'text-gray-text hover:text-white'}`}>
              {f}
              {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-t-full" />}
            </button>
            )
          })}
        </div>
      </div>
      
      <div className="px-5 pb-32 space-y-4">
        {list.map((doc,i) => {
          const t=icons[doc.type]; const Icon=t.icon;
          return (
            <div key={doc.id} className="rounded-[24px] p-4 flex items-center gap-4 active:scale-[0.98] transition-transform" 
              style={{background:'#090E17',border:'1px solid #1C2A3A',animationDelay:`${i*40}ms`,animation:'fadeInUp 0.3s ease-out forwards',opacity:0}}>
              
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{background:`${t.color}15`,border:`1px solid ${t.color}30`}}>
                <Icon size={24} style={{color:t.color}}/>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-white truncate mb-1">{doc.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-md font-bold" style={{background:`${t.color}15`,color:t.color}}>{doc.type}</span>
                  <span className="text-xs font-medium text-gray-text">{doc.size}</span>
                  <span className="text-xs font-medium text-gray-text">{doc.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
