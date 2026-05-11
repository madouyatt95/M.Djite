export interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'Excel' | 'Word';
  size: string;
  date: string;
  category: 'Projets' | 'Finances' | 'Contrats';
  color: string;
}

export const documents: Document[] = [
  {
    id: '1',
    name: 'Contrat Immeuble Fann Hock',
    type: 'PDF',
    size: '3.4 Mo',
    date: '01/03/2024',
    category: 'Contrats',
    color: '#EF4444'
  },
  {
    id: '2',
    name: 'Plan Poulailler',
    type: 'PDF',
    size: '1.8 Mo',
    date: '05/02/2024',
    category: 'Projets',
    color: '#EF4444'
  },
  {
    id: '3',
    name: 'Business Plan Al Bourak',
    type: 'PDF',
    size: '5.1 Mo',
    date: '20/01/2024',
    category: 'Projets',
    color: '#EF4444'
  },
  {
    id: '4',
    name: 'Des Coups Verts - Budget',
    type: 'Excel',
    size: '2.3 Mo',
    date: '15/12/2023',
    category: 'Finances',
    color: '#22C55E'
  },
  {
    id: '5',
    name: 'Contrat Laser Park Abidjan',
    type: 'PDF',
    size: '2.7 Mo',
    date: '30/03/2024',
    category: 'Contrats',
    color: '#EF4444'
  },
  {
    id: '6',
    name: 'Autorisation Restaurant',
    type: 'Word',
    size: '1.5 Mo',
    date: '10/04/2024',
    category: 'Projets',
    color: '#3B82F6'
  }
];

export const documentFilters = ['Tous', 'Projets', 'Finances', 'Contrats'];
