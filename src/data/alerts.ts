export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'danger' | 'warning' | 'info' | 'success' | 'error';
  time: string;
  icon: string;
}

export const alerts: Alert[] = [
  {
    id: '1',
    title: 'Dépassement de budget',
    description: 'Le projet Immeuble Fann Hock a dépassé le budget prévu.',
    type: 'danger',
    time: '10:30',
    icon: '⚠️'
  },
  {
    id: '2',
    title: 'Paiement à venir',
    description: 'Paiement fournisseur Laser Park Abidjan dans 3 jours.',
    type: 'warning',
    time: '09:15',
    icon: '💰'
  },
  {
    id: '3',
    title: 'Document expiré',
    description: 'Autorisation Restaurant expire dans 5 jours.',
    type: 'error',
    time: 'Hier',
    icon: '📄'
  },
  {
    id: '4',
    title: 'Baisse de revenus',
    description: 'Les revenus du projet Restaurant ont diminué de 20% ce mois.',
    type: 'info',
    time: 'Hier',
    icon: '📉'
  },
  {
    id: '5',
    title: 'Objectif atteint',
    description: 'Le projet Al Bourak a atteint 80% de son objectif annuel.',
    type: 'success',
    time: '2 jours',
    icon: '✅'
  }
];

export const alertFilters = ['Toutes', 'Finances', 'Projets', 'Documents'];
