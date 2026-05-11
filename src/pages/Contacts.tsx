import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, History } from 'lucide-react';
import { contacts } from '../data/contacts';

const crmCategories = ['Tous', 'Investisseurs', 'Ministres', 'Partenaires', 'Fournisseurs'];

export default function Contacts() {
  const nav = useNavigate();
  const [cat, setCat] = useState('Tous');
  const [search, setSearch] = useState('');
  const list = contacts.filter(c => (cat==='Tous'||c.category===cat) && c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14">
        <h1 className="text-3xl font-bold text-white mb-8">Contacts</h1>
        
        <div className="relative mb-6">
          <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"/>
          <input type="text" placeholder="Rechercher un contact..." value={search} onChange={e=>setSearch(e.target.value)} 
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-base text-white placeholder:text-gray-text outline-none focus:border-gold/50 transition-colors"
            style={{background:'#090E17', border:'1.5px solid #1C2A3A'}}/>
        </div>
        
        <div className="flex gap-8 mb-6 overflow-x-auto no-scrollbar border-b border-white/10">
          {crmCategories.map(c=>{
            const active = cat===c;
            return (
            <button key={c} onClick={()=>setCat(c)} 
              className={`pb-4 text-base font-medium whitespace-nowrap relative transition-colors ${active?'text-white':'text-gray-text hover:text-white'}`}>
              {c}
              {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-t-full" />}
            </button>
            )
          })}
        </div>
      </div>
      
      <div className="px-5 pb-32 space-y-4">
        {list.map((c,i)=>(
          <button key={c.id} onClick={()=>nav(`/contacts/${c.id}`)} 
            className="w-full rounded-[24px] p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
            style={{background:'#090E17',border:'1px solid #1C2A3A',animationDelay:`${i*40}ms`,animation:'fadeInUp 0.3s ease-out forwards',opacity:0}}>
            
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/40">
              <img src={c.avatar} alt={c.name} className="w-full h-full object-cover"/>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-white truncate mb-0.5">{c.name}</p>
              <p className="text-sm font-medium text-gray-text">{c.role}</p>
            </div>
            
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform" 
              style={{background:'rgba(34,197,94,0.15)',border:'1px solid rgba(34,197,94,0.3)'}}
              onClick={e=>{e.stopPropagation();window.open(`tel:${c.phone}`);}}>
              <Phone size={20} className="text-success"/>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
