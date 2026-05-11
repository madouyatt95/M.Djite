export interface Project {
  id: string;
  name: string;
  sector: string;
  sectorIcon: string;
  description: string;
  country: string;
  city: string;
  status: 'En cours' | 'Actif' | 'Terminé' | 'Idée';
  investmentInitial: number;
  expenses: number;
  revenues: number;
  benefitNet: number;
  roi: number;
  progression: number;
  image: string;
  startDate: string;
  responsible: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Poulailler',
    sector: 'Agriculture',
    sectorIcon: '🌾',
    description: 'Élevage avicole moderne avec production d\'œufs et de poulets de chair.',
    country: 'Sénégal',
    city: 'Dakar',
    status: 'En cours',
    investmentInitial: 1_250_000_000,
    expenses: 450_000_000,
    revenues: 680_000_000,
    benefitNet: 230_000_000,
    roi: 18.4,
    progression: 72,
    image: '/images/project_poulailler.png',
    startDate: '15 Janvier 2023',
    responsible: 'M. Djité'
  },
  {
    id: '2',
    name: 'Laser Park Abidjan',
    sector: 'Loisirs & Divertissement',
    sectorIcon: '🎮',
    description: 'Centre de divertissement premium avec laser game et réalité virtuelle.',
    country: 'Côte d\'Ivoire',
    city: 'Abidjan',
    status: 'Actif',
    investmentInitial: 2_500_000_000,
    expenses: 1_200_000_000,
    revenues: 1_850_000_000,
    benefitNet: 650_000_000,
    roi: 26,
    progression: 85,
    image: '/images/project_laserpark.png',
    startDate: '03 Mars 2022',
    responsible: 'M. Djité'
  },
  {
    id: '3',
    name: 'Immeuble Fann Hock',
    sector: 'Immobilier',
    sectorIcon: '🏢',
    description: 'Immeuble résidentiel de standing à Fann Hock, Dakar.',
    country: 'Sénégal',
    city: 'Dakar',
    status: 'En cours',
    investmentInitial: 3_800_000_000,
    expenses: 2_450_000_000,
    revenues: 1_200_000_000,
    benefitNet: -1_250_000_000,
    roi: -32.9,
    progression: 62,
    image: '/images/project_immeuble.png',
    startDate: '12 Mars 2018',
    responsible: 'M. Djité'
  },
  {
    id: '4',
    name: 'Al Bourak (Taxi)',
    sector: 'Transport',
    sectorIcon: '🚕',
    description: 'Flotte de taxis modernes pour le transport urbain.',
    country: 'Sénégal',
    city: 'Dakar',
    status: 'Actif',
    investmentInitial: 2_100_000_000,
    expenses: 980_000_000,
    revenues: 1_450_000_000,
    benefitNet: 470_000_000,
    roi: 22.4,
    progression: 78,
    image: '/images/project_taxi.png',
    startDate: '20 Juin 2021',
    responsible: 'M. Djité'
  },
  {
    id: '5',
    name: 'Des Coups Verts',
    sector: 'Production Cinématographique',
    sectorIcon: '🎬',
    description: 'Production de contenus cinématographiques et audiovisuels.',
    country: 'Sénégal',
    city: 'Dakar',
    status: 'En cours',
    investmentInitial: 1_750_000_000,
    expenses: 620_000_000,
    revenues: 890_000_000,
    benefitNet: 270_000_000,
    roi: 15.4,
    progression: 55,
    image: '/images/project_agriculture.png',
    startDate: '08 Septembre 2023',
    responsible: 'M. Djité'
  },
  {
    id: '6',
    name: 'Restaurant',
    sector: 'Restauration',
    sectorIcon: '🍽️',
    description: 'Restaurant haut de gamme avec cuisine africaine fusion.',
    country: 'Sénégal',
    city: 'Dakar',
    status: 'En cours',
    investmentInitial: 950_000_000,
    expenses: 420_000_000,
    revenues: 580_000_000,
    benefitNet: 160_000_000,
    roi: 16.8,
    progression: 45,
    image: '/images/project_restaurant.png',
    startDate: '01 Décembre 2023',
    responsible: 'M. Djité'
  }
];

export const sectors = [
  'Agriculture',
  'Loisirs & Divertissement',
  'Immobilier',
  'Commerce',
  'Cinéma',
  'Restauration',
  'Transport',
  'Événementiel',
  'Numérique'
];

export function formatAmount(amount: number): string {
  if (Math.abs(amount) >= 1_000_000_000) {
    return (amount / 1_000_000_000).toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' Mds';
  }
  if (Math.abs(amount) >= 1_000_000) {
    return (amount / 1_000_000).toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' M';
  }
  return amount.toLocaleString('fr-FR');
}

export function formatFullAmount(amount: number): string {
  return amount.toLocaleString('fr-FR');
}

export function getTotalInvested(): number {
  return projects.reduce((sum, p) => sum + p.investmentInitial, 0);
}

export function getTotalRevenues(): number {
  return projects.reduce((sum, p) => sum + p.revenues, 0);
}

export function getTotalBenefits(): number {
  return projects.reduce((sum, p) => sum + p.benefitNet, 0);
}

export function getTotalExpenses(): number {
  return projects.reduce((sum, p) => sum + p.expenses, 0);
}
