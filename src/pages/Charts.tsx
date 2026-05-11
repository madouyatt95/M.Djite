import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { projects } from '../data/projects';

const tabs = ['Investissements', 'Revenus', 'Bénéfices'];
const invData = [{name:'Jan',value:800},{name:'Fév',value:1200},{name:'Mar',value:950},{name:'Avr',value:1400},{name:'Mai',value:1100},{name:'Juin',value:1600},{name:'Juil',value:1350},{name:'Août',value:1800},{name:'Sep',value:1500},{name:'Oct',value:1700},{name:'Nov',value:1400},{name:'Déc',value:2000}];
const revData = [{name:'Jan',value:400},{name:'Fév',value:600},{name:'Mar',value:750},{name:'Avr',value:800},{name:'Mai',value:950},{name:'Juin',value:1100},{name:'Juil',value:1050},{name:'Août',value:1300},{name:'Sep',value:1200},{name:'Oct',value:1400},{name:'Nov',value:1250},{name:'Déc',value:1500}];
const benData = [{name:'Jan',value:200},{name:'Fév',value:350},{name:'Mar',value:300},{name:'Avr',value:450},{name:'Mai',value:500},{name:'Juin',value:600},{name:'Juil',value:550},{name:'Août',value:700},{name:'Sep',value:650},{name:'Oct',value:750},{name:'Nov',value:680},{name:'Déc',value:800}];
const barData = [{name:'Agri',value:1250,color:'#D4AF37'},{name:'Loisirs',value:2500,color:'#0EA5FF'},{name:'Immo',value:3800,color:'#8B5CF6'},{name:'Comm',value:950,color:'#22C55E'},{name:'Transp',value:2100,color:'#F59E0B'},{name:'Ciné',value:1750,color:'#EF4444'}];

const dMap: Record<string,any[]> = {'Investissements':invData,'Revenus':revData,'Bénéfices':benData};
const cMap: Record<string,string> = {'Investissements':'#D4AF37','Revenus':'#0EA5FF','Bénéfices':'#22C55E'};
const tMap: Record<string,string> = {'Investissements':'Évolution des Investissements','Revenus':'Évolution des Revenus','Bénéfices':'Évolution des Bénéfices'};
const tip = {background:'#090E17',border:'1px solid #1C2A3A',borderRadius:16,fontSize:14,color:'#fff',padding:12};

export default function Charts() {
  const [tab, setTab] = useState('Investissements');
  const [selectedProject, setSelectedProject] = useState('all');

  return (
    <div className="page-enter" style={{ background: '#05070B', minHeight: '100%' }}>
      <div className="px-5 pt-14 pb-32 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white">Graphiques</h1>
          <select 
            value={selectedProject} 
            onChange={e => setSelectedProject(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white outline-none active:scale-95 transition-transform appearance-none" 
            style={{background:'#090E17', border: '1px solid #1C2A3A'}}
          >
            <option value="all">Tous les projets</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        
        <div className="flex gap-3 mb-2">
          {tabs.map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-colors ${tab===t?'bg-gold text-dark shadow-lg shadow-gold/20':'text-gray-text hover:text-white'}`}
              style={tab!==t?{background:'#090E17',border:'1px solid #1C2A3A'}:{}}>{t}</button>
          ))}
        </div>
        
        <div className="rounded-3xl p-6" style={{background:'#090E17', border: '1px solid #1C2A3A'}}>
          <p className="text-xl font-bold text-white mb-6">{tMap[tab]}</p>
          <div style={{width:'100%',height:240}}>
            <ResponsiveContainer><LineChart data={dMap[tab]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2A3A" vertical={false}/>
              <XAxis dataKey="name" tick={{fill:'#9CA3AF',fontSize:12}} axisLine={false} tickLine={false} dy={10}/>
              <YAxis tick={{fill:'#9CA3AF',fontSize:12}} axisLine={false} tickLine={false} width={35}/>
              <Tooltip contentStyle={tip}/>
              <Line type="monotone" dataKey="value" stroke={cMap[tab]} strokeWidth={3} dot={{r:4,fill:cMap[tab]}}/>
            </LineChart></ResponsiveContainer>
          </div>
        </div>
        
        <div className="rounded-3xl p-6" style={{background:'#090E17', border: '1px solid #1C2A3A'}}>
          <p className="text-xl font-bold text-white mb-6">Par secteur (M FCFA)</p>
          <div style={{width:'100%',height:240}}>
            <ResponsiveContainer><BarChart data={barData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2A3A" vertical={false}/>
              <XAxis dataKey="name" tick={{fill:'#9CA3AF',fontSize:12}} axisLine={false} tickLine={false} dy={10}/>
              <YAxis tick={{fill:'#9CA3AF',fontSize:12}} axisLine={false} tickLine={false} width={35}/>
              <Tooltip contentStyle={tip}/>
              <Bar dataKey="value" radius={[6,6,0,0]}>{barData.map((e,i)=><Cell key={i} fill={e.color}/>)}</Bar>
            </BarChart></ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
