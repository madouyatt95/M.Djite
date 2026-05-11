import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatFullAmount, getTotalInvested, getTotalRevenues, getTotalBenefits, getTotalExpenses } from '../data/projects';

const monthlyData = [
  { name: 'Jan', investissements: 800, revenus: 400, benefices: 200 },
  { name: 'Fév', investissements: 900, revenus: 500, benefices: 250 },
  { name: 'Mar', investissements: 1100, revenus: 650, benefices: 300 },
  { name: 'Avr', investissements: 950, revenus: 700, benefices: 380 },
  { name: 'Mai', investissements: 1200, revenus: 850, benefices: 420 },
  { name: 'Juin', investissements: 1350, revenus: 900, benefices: 480 },
  { name: 'Juil', investissements: 1100, revenus: 950, benefices: 520 },
  { name: 'Août', investissements: 1400, revenus: 1100, benefices: 600 },
  { name: 'Sep', investissements: 1250, revenus: 1050, benefices: 550 },
  { name: 'Oct', investissements: 1500, revenus: 1200, benefices: 650 },
  { name: 'Nov', investissements: 1300, revenus: 1100, benefices: 580 },
  { name: 'Déc', investissements: 1600, revenus: 1300, benefices: 700 },
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
    <div className="h-full scroll-hidden page-enter">
      <div className="px-5 pt-12 pb-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Finances</h1>
          <button className="flex items-center gap-1 glass-card-sm px-3 py-1.5 text-xs text-white">
            <span>Année en cours</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}>
            <p className="text-gray-text text-xs mb-1">Investi</p>
            <p className="text-base font-bold text-white">{formatFullAmount(getTotalInvested())}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-gray-text text-xs mb-1">Revenus</p>
            <p className="text-base font-bold text-white">{formatFullAmount(getTotalRevenues())}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-gray-text text-xs mb-1">Bénéfices</p>
            <p className="text-base font-bold text-success">{formatFullAmount(getTotalBenefits())}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-gray-text text-xs mb-1">Dépenses</p>
            <p className="text-base font-bold text-danger">{formatFullAmount(getTotalExpenses())}</p>
            <p className="text-[10px] text-gray-text">FCFA</p>
          </div>
        </div>

        {/* Line Chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Évolution Mensuelle</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.3)" />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0B1220', 
                    border: '1px solid rgba(212, 175, 55, 0.2)', 
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: 'white'
                  }}
                />
                <Line type="monotone" dataKey="investissements" stroke="#D4AF37" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="revenus" stroke="#0EA5FF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="benefices" stroke="#22C55E" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-gold rounded" />
              <span className="text-[10px] text-gray-text">Investissements</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-electric-blue rounded" />
              <span className="text-[10px] text-gray-text">Revenus</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-success rounded" />
              <span className="text-[10px] text-gray-text">Bénéfices</span>
            </div>
          </div>
        </div>

        {/* Expense Breakdown Donut */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Répartition des Dépenses</h3>
          <div className="flex items-center gap-4">
            <div className="w-36 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {expenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-text">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
