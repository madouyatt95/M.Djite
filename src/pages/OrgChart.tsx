import { Network, ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrgChart() {
  const nav = useNavigate();

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14 pb-32 space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => nav(-1)} className="w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-transform" style={{background:'#090E17', border: '1px solid #1C2A3A'}}>
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Network size={28} className="text-gold" /> Organigramme
          </h1>
        </div>

        {/* Root Node */}
        <div className="flex flex-col items-center">
          <div className="rounded-[24px] p-6 text-center shadow-2xl relative w-full max-w-sm z-10" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: '2px solid #F3E5AB' }}>
            <p className="text-sm font-bold text-dark/70 uppercase tracking-widest mb-1">Holding (Mère)</p>
            <h2 className="text-2xl font-extrabold text-dark mb-2">GROUPE M.DJITÉ</h2>
            <p className="text-base font-bold text-dark/80">100% M.Djité</p>
          </div>
          
          <div className="w-1 h-12 bg-gold" />

          {/* Connectors */}
          <div className="w-full max-w-xs relative h-10 border-t-[3px] border-l-[3px] border-r-[3px] border-gold rounded-t-xl" />

          {/* Children Nodes */}
          <div className="w-full flex justify-between gap-2 -mt-[3px]">
            {/* Child 1 */}
            <div className="flex flex-col items-center w-1/2">
              <div className="w-1 h-8 bg-gold" />
              <div className="rounded-2xl p-4 text-center w-full shadow-lg" style={{ background: '#090E17', border: '1px solid #D4AF37' }}>
                <p className="text-[10px] font-bold text-gray-text uppercase mb-1">Filiale (Immobilier)</p>
                <h3 className="text-sm font-bold text-white mb-2 leading-tight">MDJ IMMO S.A.</h3>
                <div className="inline-block px-2 py-1 rounded bg-gold/20 text-gold text-xs font-bold">85% Parts</div>
              </div>
            </div>

            {/* Child 2 */}
            <div className="flex flex-col items-center w-1/2">
              <div className="w-1 h-8 bg-gold" />
              <div className="rounded-2xl p-4 text-center w-full shadow-lg" style={{ background: '#090E17', border: '1px solid #D4AF37' }}>
                <p className="text-[10px] font-bold text-gray-text uppercase mb-1">Filiale (Agricole)</p>
                <h3 className="text-sm font-bold text-white mb-2 leading-tight">MDJ AGRI S.A.R.L.</h3>
                <div className="inline-block px-2 py-1 rounded bg-gold/20 text-gold text-xs font-bold">60% Parts</div>
              </div>
            </div>
          </div>
          
          {/* Sub Child Connector for Immo */}
          <div className="w-full flex justify-start pl-8 mt-2">
             <div className="flex flex-col items-center w-1/2">
               <ChevronDown size={20} className="text-gold" />
               <div className="rounded-xl p-3 text-center w-4/5 mt-1" style={{ background: '#05070B', border: '1px dashed #1C2A3A' }}>
                  <p className="text-[10px] text-gray-text font-bold">Associé Externe</p>
                  <p className="text-xs text-white font-medium">BâtiLien (15%)</p>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
