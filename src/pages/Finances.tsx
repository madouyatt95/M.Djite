import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatFullAmount, getTotalInvested, getTotalRevenues, getTotalBenefits, getTotalExpenses } from '../data/projects';

const monthlyData = [
  { name: 'Jan', inv: 800, rev: 400, ben: 200 },
  { name: 'Fév', inv: 900, rev: 500, ben: 250 },
  { name: 'Mar', inv: 1100, rev: 650, ben: 300 },
  { name: 'Avr', inv: 950, rev: 700, ben: 380 },
  { name: 'Mai', inv: 1200, rev: 850, ben: 420 },
  { name: 'Juin', inv: 1350, rev: 900, ben: 480 },
  { name: 'Juil', inv: 1100, rev: 950, ben: 520 },
  { name: 'Août', inv: 1400, rev: 1100, ben: 600 },
  { name: 'Sep', inv: 1250, rev: 1050, ben: 550 },
  { name: 'Oct', inv: 1500, rev: 1200, ben: 650 },
  { name: 'Nov', inv: 1300, rev: 1100, ben: 580 },
  { name: 'Déc', inv: 1600, rev: 1300, ben: 700 },
];

const expenseBreakdown = [
  { name: 'Construction', value: 40, color: '#D4AF37' },
  { name: 'Équipement', value: 25, color: '#0EA5FF' },
  { name: 'Fonctionnement', value: 15, color: '#8B5CF6' },
  { name: 'Marketing', value: 10, color: '#22C55E' },
  { name: 'Divers', value: 10, color: '#F59E0B' },
];

export default function Finances() {
  const [_period] = useState('Année en cours');

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Finances</h1>
          <button className="flex items-center gap-1 glass-card-sm px-3 py-1.5 text-xs text-white">
            <span>Année en cours</span>
            <ChevronDown size={12} />
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card-gold p-4">
            <p className="text-[10px] text-gray-text uppercase tracking-wider mb-1.5">Investi</p>
            <p className="text-base font-bold text-white">{formatFullAmount(getTotalInvested())}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-[10px] text-gray-text uppercase tracking-wider mb-1.5">Revenus</p>
            <p className="text-base font-bold text-white">{formatFullAmount(getTotalRevenues())}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-[10px] text-gray-text uppercase tracking-wider mb-1.5">Bénéfices</p>
            <p className="text-base font-bold text-success">{formatFullAmount(getTotalBenefits())}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-[10px] text-gray-text uppercase tracking-wider mb-1.5">Dépenses</p>
            <p className="text-base font-bold text-danger">{formatFullAmount(getTotalExpenses())}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
        </div>

        {/* Chart */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-bold text-white mb-4">Évolution Mensuelle</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31,41,55,0.3)" />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ background: '#0D1526', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 12, fontSize: 11, color: 'white' }} />
                <Line type="monotone" dataKey="inv" stroke="#D4AF37" strokeWidth={2} dot={false} name="Investissements" />
                <Line type="monotone" dataKey="rev" stroke="#0EA5FF" strokeWidth={2} dot={false} name="Revenus" />
                <Line type="monotone" dataKey="ben" stroke="#22C55E" strokeWidth={2} dot={false} name="Bénéfices" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            {[{ c: '#D4AF37', l: 'Invest.' }, { c: '#0EA5FF', l: 'Revenus' }, { c: '#22C55E', l: 'Bénéf.' }].map(i => (
              <div key={i.l} className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded" style={{ backgroundColor: i.c }} />
                <span className="text-[10px] text-gray-text">{i.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-bold text-white mb-4">Répartition des Dépenses</h3>
          <div className="flex items-center gap-4">
            <div style={{ width: 130, height: 130, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={36} outerRadius={58} paddingAngle={3} dataKey="value" stroke="none">
                    {expenseBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2.5">
              {expenseBreakdown.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-text">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
