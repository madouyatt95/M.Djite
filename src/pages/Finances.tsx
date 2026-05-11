import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatFullAmount, getTotalInvested, getTotalRevenues, getTotalBenefits, getTotalExpenses } from '../data/projects';

const monthly = [
  { n: 'Jan', i: 800, r: 400, b: 200 }, { n: 'Fév', i: 900, r: 500, b: 250 },
  { n: 'Mar', i: 1100, r: 650, b: 300 }, { n: 'Avr', i: 950, r: 700, b: 380 },
  { n: 'Mai', i: 1200, r: 850, b: 420 }, { n: 'Juin', i: 1350, r: 900, b: 480 },
  { n: 'Juil', i: 1100, r: 950, b: 520 }, { n: 'Août', i: 1400, r: 1100, b: 600 },
  { n: 'Sep', i: 1250, r: 1050, b: 550 }, { n: 'Oct', i: 1500, r: 1200, b: 650 },
  { n: 'Nov', i: 1300, r: 1100, b: 580 }, { n: 'Déc', i: 1600, r: 1300, b: 700 },
];
const expenses = [
  { name: 'Construction', value: 40, color: '#D4AF37' }, { name: 'Équipement', value: 25, color: '#0EA5FF' },
  { name: 'Fonctionnement', value: 15, color: '#8B5CF6' }, { name: 'Marketing', value: 10, color: '#22C55E' },
  { name: 'Divers', value: 10, color: '#F59E0B' },
];
const tip = { background: '#0C1422', border: '1px solid #1C2A3A', borderRadius: 10, fontSize: 10, color: '#fff' };

export default function Finances() {
  const [_] = useState('');
  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-6 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">Finances</h1>
          <button className="card-sm flex items-center gap-1 px-2.5 py-1 text-[11px] text-white">
            <span>Année en cours</span><ChevronDown size={12} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="card"><p className="text-[10px] text-gray-text mb-1">Invest</p><p className="text-[13px] font-bold text-white">{formatFullAmount(getTotalInvested())}</p><p className="text-[9px] text-gray-text">FCFA</p></div>
          <div className="card"><p className="text-[10px] text-gray-text mb-1">Revenus</p><p className="text-[13px] font-bold text-white">{formatFullAmount(getTotalRevenues())}</p><p className="text-[9px] text-gray-text">FCFA</p></div>
          <div className="card"><p className="text-[10px] text-gray-text mb-1">Bénéfices</p><p className="text-[13px] font-bold text-success">{formatFullAmount(getTotalBenefits())}</p><p className="text-[9px] text-gray-text">FCFA</p></div>
          <div className="card"><p className="text-[10px] text-gray-text mb-1">Dépenses</p><p className="text-[13px] font-bold text-danger">{formatFullAmount(getTotalExpenses())}</p><p className="text-[9px] text-gray-text">FCFA</p></div>
        </div>

        <div className="card">
          <p className="text-[13px] font-bold text-white mb-3">Évolution Mensuelle</p>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer><LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2A3A" />
              <XAxis dataKey="n" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={tip} />
              <Line type="monotone" dataKey="i" stroke="#D4AF37" strokeWidth={1.5} dot={false} name="Invest." />
              <Line type="monotone" dataKey="r" stroke="#0EA5FF" strokeWidth={1.5} dot={false} name="Revenus" />
              <Line type="monotone" dataKey="b" stroke="#22C55E" strokeWidth={1.5} dot={false} name="Bénéf." />
            </LineChart></ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {[{c:'#D4AF37',l:'Invest.'},{c:'#0EA5FF',l:'Revenus'},{c:'#22C55E',l:'Bénéf.'}].map(x=>(
              <div key={x.l} className="flex items-center gap-1"><div className="w-2.5 h-0.5 rounded" style={{background:x.c}}/><span className="text-[9px] text-gray-text">{x.l}</span></div>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="text-[13px] font-bold text-white mb-3">Répartition des Dépenses</p>
          <div className="flex items-center gap-3">
            <div style={{ width: 120, height: 120, flexShrink: 0 }}>
              <ResponsiveContainer><PieChart><Pie data={expenses} cx="50%" cy="50%" innerRadius={32} outerRadius={52} paddingAngle={2} dataKey="value" stroke="none">
                {expenses.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie></PieChart></ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5">
              {expenses.map(x => (
                <div key={x.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{background:x.color}}/><span className="text-[11px] text-gray-text">{x.name}</span></div>
                  <span className="text-[11px] font-semibold text-white">{x.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
