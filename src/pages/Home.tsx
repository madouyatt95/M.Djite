import { Bell, ChevronDown, Presentation, ChevronRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { projects, getTotalInvested, getTotalRevenues, getTotalBenefits } from '../data/projects';
import { usePrivacy } from '../context/PrivacyContext';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

const sectorData = [
  { name: 'Agriculture', value: 15, color: '#D4AF37' },
  { name: 'Loisirs', value: 30, color: '#0EA5FF' },
  { name: 'Immobilier', value: 10, color: '#8B5CF6' },
  { name: 'Commerce', value: 10, color: '#22C55E' },
  { name: 'Transport', value: 15, color: '#F59E0B' },
  { name: 'Autres', value: 20, color: '#EF4444' },
];

export default function Home() {
  const { isPrivate, togglePrivacy, formatAmount } = usePrivacy();
  const totalInvested = getTotalInvested();
  const totalRevenues = getTotalRevenues();
  const totalBenefits = getTotalBenefits();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const controls = useAnimation();

  const handleDragEnd = async (e: any, info: any) => {
    if (info.offset.y > 100) {
      setIsRefreshing(true);
      await controls.start({ y: 60, transition: { type: 'spring', bounce: 0 } });
      setTimeout(async () => {
        setIsRefreshing(false);
        controls.start({ y: 0, transition: { type: 'spring', bounce: 0 } });
      }, 1500);
    } else {
      controls.start({ y: 0, transition: { type: 'spring', bounce: 0 } });
    }
  };

  return (
    <motion.div drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={0.2} onDragEnd={handleDragEnd} animate={controls} className="page-enter relative" style={{ background: '#05070B', minHeight: '100%' }}>
      {isRefreshing && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg" style={{ background: '#0C1422', border: '1px solid rgba(212,175,55,0.4)' }}>
          <Loader2 size={18} className="text-gold animate-spin" />
          <span className="text-xs font-bold text-white">Mise à jour...</span>
        </div>
      )}

      {/* Hero skyline */}
      <div className="relative">
        <div className="absolute inset-0 h-[340px]">
          <img src="/images/skyline_bg.png" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.5) contrast(1.1)' }} />
        </div>
        <div className="absolute inset-0 h-[340px]" style={{ background: 'linear-gradient(180deg, rgba(5,7,11,0.2) 0%, rgba(5,7,11,0.9) 70%, #05070B 100%)' }} />

        <div className="relative z-10 px-6 pt-14 pb-2">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gold/30">
                <img src="/images/md_logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-gold font-bold text-xl">M.Djite</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={togglePrivacy} className="p-2 active:scale-95 transition-transform">
                {isPrivate ? <EyeOff size={28} className="text-white" strokeWidth={2}/> : <Eye size={28} className="text-white" strokeWidth={2}/>}
              </button>
              <button className="relative p-2">
                <Bell size={28} className="text-white" strokeWidth={2} />
                <span className="absolute top-1.5 right-2.5 w-3 h-3 bg-danger rounded-full border-2 border-dark" />
              </button>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                <img src="/images/avatar_user.png" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-3">
            <h1 className="text-white font-bold text-4xl leading-tight">Bonjour</h1>
            <h1 className="text-white font-bold text-4xl leading-tight">M. Djité 👋</h1>
          </div>
          <p className="text-gray-text text-base leading-relaxed mb-6">Voici la vue d'ensemble de<br/>vos projets et investissements.</p>
          
          <div className="flex items-center mb-8">
            <button className="flex items-center justify-between w-40 px-4 py-3 rounded-2xl text-sm font-medium text-white active:scale-95 transition-transform" style={{background: 'rgba(5,7,11,0.7)', border: '1px solid rgba(255,255,255,0.15)'}}>
              <span>Vue globale</span>
              <ChevronDown size={18} className="text-gray-text" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-20 px-6 pb-32 -mt-2">
        {/* Total Investi - BLUE CARD */}
        <div className="rounded-[24px] p-6 shadow-xl mb-5" style={{ background: 'linear-gradient(180deg, rgba(14, 165, 255, 0.15) 0%, rgba(5, 7, 11, 0.95) 100%)', border: '1px solid rgba(14, 165, 255, 0.4)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Presentation size={20} className="text-electric-blue" />
            <span className="text-gray-text text-sm font-medium">Total Investi</span>
          </div>
          <p className="text-white font-bold text-4xl truncate">{formatAmount(totalInvested)} <span className="text-sm font-normal text-gray-text">FCFA</span></p>
        </div>

        {/* Revenus / Bénéfices - GREEN BORDER CARDS */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="rounded-[24px] p-5" style={{ background: '#05070B', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            <p className="text-gray-text text-xs mb-2 font-medium">Revenus Totaux</p>
            <p className="text-white font-bold text-[22px] truncate">{formatAmount(totalRevenues)} <span className="text-[10px] font-normal text-gray-text">FCFA</span></p>
          </div>
          <div className="rounded-[24px] p-5" style={{ background: '#05070B', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            <p className="text-gray-text text-xs mb-2 font-medium">Bénéfices Totaux</p>
            <p className="text-white font-bold text-[22px] truncate">{formatAmount(totalBenefits)} <span className="text-[10px] font-normal text-gray-text">FCFA</span></p>
          </div>
        </div>

        {/* Projets */}
        <div className="pt-2 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-xl">Projets</h2>
            <button className="flex items-center text-gold text-base font-semibold active:opacity-70">
              Voir <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { v: '12', l: 'Total Projets', c: 'text-gold' },
              { v: '7', l: 'En cours', c: 'text-gold' },
              { v: '3', l: 'Terminés', c: 'text-electric-blue' },
              { v: '2', l: 'Suspendus', c: 'text-danger' },
            ].map(s => (
              <div key={s.l} className="rounded-2xl p-4 text-center flex flex-col justify-center items-center" style={{ background: '#05070B', border: '1px solid #1C2A3A' }}>
                <p className={`text-[26px] font-bold ${s.c} leading-tight`}>{s.v}</p>
                <p className="text-[10px] text-gray-text mt-2 font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Répartition par Secteur */}
        <div className="pt-2">
          <h2 className="text-white font-bold text-xl mb-6">Répartition par Secteur</h2>
          <div className="flex items-center gap-6">
            <div style={{ width: 160, height: 160, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sectorData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value" stroke="none">
                    {sectorData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {sectorData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ background: item.color }} />
                    <span className="text-sm font-medium text-gray-text">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-text">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
