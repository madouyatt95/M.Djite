import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';

const tabs = ['Investissements', 'Revenus', 'Bénéfices'];

const investmentData = [
  { name: 'Jan', value: 800 }, { name: 'Fév', value: 1200 }, { name: 'Mar', value: 950 },
  { name: 'Avr', value: 1400 }, { name: 'Mai', value: 1100 }, { name: 'Juin', value: 1600 },
  { name: 'Juil', value: 1350 }, { name: 'Août', value: 1800 }, { name: 'Sep', value: 1500 },
  { name: 'Oct', value: 1700 }, { name: 'Nov', value: 1400 }, { name: 'Déc', value: 2000 },
];
const revenueData = [
  { name: 'Jan', value: 400 }, { name: 'Fév', value: 600 }, { name: 'Mar', value: 750 },
  { name: 'Avr', value: 800 }, { name: 'Mai', value: 950 }, { name: 'Juin', value: 1100 },
  { name: 'Juil', value: 1050 }, { name: 'Août', value: 1300 }, { name: 'Sep', value: 1200 },
  { name: 'Oct', value: 1400 }, { name: 'Nov', value: 1250 }, { name: 'Déc', value: 1500 },
];
const benefitData = [
  { name: 'Jan', value: 200 }, { name: 'Fév', value: 350 }, { name: 'Mar', value: 300 },
  { name: 'Avr', value: 450 }, { name: 'Mai', value: 500 }, { name: 'Juin', value: 600 },
  { name: 'Juil', value: 550 }, { name: 'Août', value: 700 }, { name: 'Sep', value: 650 },
  { name: 'Oct', value: 750 }, { name: 'Nov', value: 680 }, { name: 'Déc', value: 800 },
];
const sectorBarData = [
  { name: 'Agri', value: 1250, color: '#D4AF37' },
  { name: 'Loisirs', value: 2500, color: '#0EA5FF' },
  { name: 'Immo', value: 3800, color: '#8B5CF6' },
  { name: 'Comm', value: 950, color: '#22C55E' },
  { name: 'Transp', value: 2100, color: '#F59E0B' },
  { name: 'Ciné', value: 1750, color: '#EF4444' },
];

const dataMap: Record<string, typeof investmentData> = { 'Investissements': investmentData, 'Revenus': revenueData, 'Bénéfices': benefitData };
const colorMap: Record<string, string> = { 'Investissements': '#D4AF37', 'Revenus': '#0EA5FF', 'Bénéfices': '#22C55E' };
const titleMap: Record<string, string> = { 'Investissements': 'Évolution des Investissements', 'Revenus': 'Évolution des Revenus', 'Bénéfices': 'Évolution des Bénéfices' };

export default function Charts() {
  const [activeTab, setActiveTab] = useState('Investissements');

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Graphiques</h1>
          <button className="glass-card-sm px-3 py-1.5 text-xs text-white">Année en cours</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === tab ? 'bg-gold text-dark' : 'bg-dark-card text-gray-text border border-gray-border/40'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Line Chart */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-bold text-white mb-4">{titleMap[activeTab]}</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataMap[activeTab]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31,41,55,0.3)" />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: '#0D1526', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 12, fontSize: 11, color: 'white' }} />
                <Line type="monotone" dataKey="value" stroke={colorMap[activeTab]} strokeWidth={2.5} dot={{ r: 3, fill: colorMap[activeTab] }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-bold text-white mb-4">Par secteur (M FCFA)</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorBarData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31,41,55,0.3)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: '#0D1526', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 12, fontSize: 11, color: 'white' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {sectorBarData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
