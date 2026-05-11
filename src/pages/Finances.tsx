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
    <div className="page-scroll page-enter bg-dark">
      <div className="px-5 pt-[env(safe-area-inset-top,48px)] pb-8 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-bold text-white">Finances</h1>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] text-white" style={{
            background: 'rgba(11, 18, 32, 0.7)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
          }}>
            <span>Année en cours</span>
            <ChevronDown size={13} />
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card-gold p-4">
            <p className="text-gray-text text-[11px] mb-2 uppercase tracking-wide">Investi</p>
            <p className="text-[16px] font-bold text-white leading-tight">{formatFullAmount(getTotalInvested())}</p>
            <p className="text-[10px] text-gray-text mt-1">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-gray-text text-[11px] mb-2 uppercase tracking-wide">Revenus</p>
            <p className="text-[16px] font-bold text-white leading-tight">{formatFullAmount(getTotalRevenues())}</p>
            <p className="text-[10px] text-gray-text mt-1">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-gray-text text-[11px] mb-2 uppercase tracking-wide">Bénéfices</p>
            <p className="text-[16px] font-bold text-success leading-tight">{formatFullAmount(getTotalBenefits())}</p>
            <p className="text-[10px] text-gray-text mt-1">FCFA</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-gray-text text-[11px] mb-2 uppercase tracking-wide">Dépenses</p>
            <p className="text-[16px] font-bold text-danger leading-tight">{formatFullAmount(getTotalExpenses())}</p>
            <p className="text-[10px] text-gray-text mt-1">FCFA</p>
          </div>
        </div>

        {/* Line Chart */}
        <div className="glass-card p-5">
          <h3 className="text-[14px] font-bold text-white mb-5">Évolution Mensuelle</h3>
          <div className="h-[200px] -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31, 41, 55, 0.3)" />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(11, 18, 32, 0.95)', 
                    border: '1px solid rgba(212, 175, 55, 0.2)', 
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}
                />
                <Line type="monotone" dataKey="investissements" stroke="#D4AF37" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="revenus" stroke="#0EA5FF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="benefices" stroke="#22C55E" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-5 mt-4">
            {[
              { color: '#D4AF37', label: 'Investissements' },
              { color: '#0EA5FF', label: 'Revenus' },
              { color: '#22C55E', label: 'Bénéfices' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-3 h-[3px] rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] text-gray-text">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown Donut */}
        <div className="glass-card p-5">
          <h3 className="text-[14px] font-bold text-white mb-5">Répartition des Dépenses</h3>
          <div className="flex items-center">
            <div className="w-[140px] h-[140px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={62}
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
            <div className="flex-1 ml-4 space-y-2.5">
              {expenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ 
                      backgroundColor: item.color,
                      boxShadow: `0 0 6px ${item.color}40`,
                    }} />
                    <span className="text-[12px] text-gray-text">{item.name}</span>
                  </div>
                  <span className="text-[12px] font-semibold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
