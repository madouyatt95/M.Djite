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
const tip = { background: '#090E17', border: '1px solid #1C2A3A', borderRadius: 16, fontSize: 14, color: '#fff', padding: 12 };

export default function Finances() {
  const [_] = useState('');
  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14 pb-32 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">Finances</h1>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white active:scale-95 transition-transform" style={{background: '#090E17', border: '1px solid #1C2A3A'}}>
            <span>Année en cours</span><ChevronDown size={16} className="text-gray-text" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl p-5" style={{background: '#090E17', border: '1px solid #1C2A3A'}}><p className="text-sm text-gray-text mb-2 font-medium">Investissements</p><p className="text-2xl font-bold text-white truncate">{formatFullAmount(getTotalInvested())}</p><p className="text-xs text-gray-text mt-1">FCFA</p></div>
          <div className="rounded-3xl p-5" style={{background: '#090E17', border: '1px solid #1C2A3A'}}><p className="text-sm text-gray-text mb-2 font-medium">Revenus</p><p className="text-2xl font-bold text-white truncate">{formatFullAmount(getTotalRevenues())}</p><p className="text-xs text-gray-text mt-1">FCFA</p></div>
          <div className="rounded-3xl p-5" style={{background: '#090E17', border: '1px solid #1C2A3A'}}><p className="text-sm text-gray-text mb-2 font-medium">Bénéfices</p><p className="text-2xl font-bold text-success truncate">{formatFullAmount(getTotalBenefits())}</p><p className="text-xs text-gray-text mt-1">FCFA</p></div>
          <div className="rounded-3xl p-5" style={{background: '#090E17', border: '1px solid #1C2A3A'}}><p className="text-sm text-gray-text mb-2 font-medium">Dépenses</p><p className="text-2xl font-bold text-danger truncate">{formatFullAmount(getTotalExpenses())}</p><p className="text-xs text-gray-text mt-1">FCFA</p></div>
        </div>

        <div className="rounded-3xl p-6" style={{background: '#090E17', border: '1px solid #1C2A3A'}}>
          <p className="text-xl font-bold text-white mb-6">Évolution Mensuelle</p>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer><LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2A3A" vertical={false} />
              <XAxis dataKey="n" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={tip} />
              <Line type="monotone" dataKey="i" stroke="#D4AF37" strokeWidth={3} dot={false} name="Invest." />
              <Line type="monotone" dataKey="r" stroke="#0EA5FF" strokeWidth={3} dot={false} name="Revenus" />
              <Line type="monotone" dataKey="b" stroke="#22C55E" strokeWidth={3} dot={false} name="Bénéf." />
            </LineChart></ResponsiveContainer>
          </div>
          <div className="flex justify-center flex-wrap gap-5 mt-6">
            {[{c:'#D4AF37',l:'Invest.'},{c:'#0EA5FF',l:'Revenus'},{c:'#22C55E',l:'Bénéf.'}].map(x=>(
              <div key={x.l} className="flex items-center gap-2"><div className="w-4 h-1 rounded-full" style={{background:x.c}}/><span className="text-sm font-medium text-gray-text">{x.l}</span></div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-6" style={{background: '#090E17', border: '1px solid #1C2A3A'}}>
          <p className="text-xl font-bold text-white mb-6">Répartition des Dépenses</p>
          <div className="flex items-center gap-6">
            <div style={{ width: 150, height: 150, flexShrink: 0 }}>
              <ResponsiveContainer><PieChart><Pie data={expenses} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">
                {expenses.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie></PieChart></ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {expenses.map(x => (
                <div key={x.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{background:x.color}}/><span className="text-sm font-medium text-gray-text">{x.name}</span></div>
                  <span className="text-sm font-semibold text-white">{x.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
