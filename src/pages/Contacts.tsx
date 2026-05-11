import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone } from 'lucide-react';
import { contacts, contactCategories } from '../data/contacts';

export default function Contacts() {
  const nav = useNavigate();
  const [cat, setCat] = useState('Tous');
  const [search, setSearch] = useState('');
  const list = contacts.filter(c => (cat==='Tous'||c.category===cat) && c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-enter">
      <div className="px-4 pt-12">
        <h1 className="text-lg font-bold text-white mb-4">Contacts</h1>
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text"/>
          <input type="text" placeholder="Rechercher un contact..." value={search} onChange={e=>setSearch(e.target.value)} className="input pl-9"/>
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {contactCategories.map(c=>(
            <button key={c} onClick={()=>setCat(c)} className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${cat===c?'bg-gold text-dark':'text-gray-text'}`}
              style={cat!==c?{background:'#0C1422',border:'1px solid #1C2A3A'}:{}}>{c}</button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-6 space-y-2.5">
        {list.map((c,i)=>(
          <button key={c.id} onClick={()=>nav(`/contacts/${c.id}`)} className="w-full card flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            style={{padding:12,animationDelay:`${i*50}ms`,animation:'fadeInUp 0.35s ease-out forwards',opacity:0}}>
            <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-gold/30">
              <img src={c.avatar} alt={c.name} className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white truncate">{c.name}</p>
              <p className="text-[11px] text-gray-text">{c.function}</p>
            </div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.25)'}}
              onClick={e=>{e.stopPropagation();window.open(`tel:${c.phone}`);}}>
              <Phone size={14} className="text-success"/>
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}
