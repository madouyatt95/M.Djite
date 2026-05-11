import { useState, useRef } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getTotalInvested, getTotalRevenues, getTotalBenefits, getTotalExpenses } from '../data/projects';
import { usePrivacy } from '../context/PrivacyContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  const { formatAmount } = usePrivacy();
  const [_] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    if (!contentRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(contentRef.current, { scale: 2, backgroundColor: '#05070B' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Rapport_Financier_MDjite.pdf');
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14 pb-32 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">Finances</h1>
          <button onClick={downloadPDF} disabled={isDownloading} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-dark active:scale-95 transition-transform" style={{background: '#D4AF37', border: '1px solid #E8C84A'}}>
            {isDownloading ? <span className="animate-pulse">Génération...</span> : <><Download size={18} /><span>Rapport PDF</span></>}
          </button>
        </div>
        
        <div ref={contentRef} className="space-y-6 pb-4">
          {/* Net Worth Card */}
          <div className="rounded-[24px] p-6 shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #090E17 0%, #05070B 100%)', border: '1px solid rgba(212,175,55,0.4)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
            <p className="text-sm font-medium text-gold mb-2 uppercase tracking-widest">Valeur Nette (Net Worth)</p>
            <div className="flex items-end gap-2 mb-4">
              <p className="text-[40px] font-bold text-white leading-none">{formatAmount(getTotalInvested() - 450000000)}</p>
              <p className="text-sm font-medium text-gray-text mb-1">FCFA</p>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-gray-text mb-1">Total Actifs</p>
                <p className="text-base font-semibold text-success">{formatAmount(getTotalInvested())} FCFA</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-xs text-gray-text mb-1">Total Passifs (Dettes)</p>
                <p className="text-base font-semibold text-danger">{formatAmount(450000000)} FCFA</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl p-5" style={{background: '#090E17', border: '1px solid #1C2A3A'}}><p className="text-sm text-gray-text mb-2 font-medium">Investissements</p><p className="text-2xl font-bold text-white truncate">{formatAmount(getTotalInvested())}</p><p className="text-xs text-gray-text mt-1">FCFA</p></div>
          <div className="rounded-3xl p-5" style={{background: '#090E17', border: '1px solid #1C2A3A'}}><p className="text-sm text-gray-text mb-2 font-medium">Revenus</p><p className="text-2xl font-bold text-white truncate">{formatAmount(getTotalRevenues())}</p><p className="text-xs text-gray-text mt-1">FCFA</p></div>
          <div className="rounded-3xl p-5" style={{background: '#090E17', border: '1px solid #1C2A3A'}}><p className="text-sm text-gray-text mb-2 font-medium">Bénéfices</p><p className="text-2xl font-bold text-success truncate">{formatAmount(getTotalBenefits())}</p><p className="text-xs text-gray-text mt-1">FCFA</p></div>
          <div className="rounded-3xl p-5" style={{background: '#090E17', border: '1px solid #1C2A3A'}}><p className="text-sm text-gray-text mb-2 font-medium">Dépenses</p><p className="text-2xl font-bold text-danger truncate">{formatAmount(getTotalExpenses())}</p><p className="text-xs text-gray-text mt-1">FCFA</p></div>
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
    </div>
  );
}
