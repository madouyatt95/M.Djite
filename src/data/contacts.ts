export interface Contact {
  id: string;
  name: string;
  role: string;
  category: 'Investisseurs' | 'Ministres' | 'Partenaires' | 'Fournisseurs';
  phone: string;
  email: string;
  address: string;
  linkedProjects: string;
  notes: string;
  avatar: string;
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Amadou Lamine',
    role: 'Ministre des Finances',
    category: 'Ministres',
    phone: '+221 77 123 45 67',
    email: 'amadou.lamine@gouv.sn',
    address: 'Dakar-Plateau, Sénégal',
    linkedProjects: 'Immeuble Fann Hock',
    notes: 'Contact stratégique pour les exonérations fiscales.',
    avatar: '/images/avatar_admin.png'
  },
  {
    id: '2',
    name: 'Me. Fatou Diop',
    role: 'Notaire Principale',
    category: 'Partenaires',
    phone: '+221 77 987 65 43',
    email: 'f.diop@notaires.sn',
    address: 'Almadies, Dakar',
    linkedProjects: 'Tous',
    notes: 'En charge de toutes les acquisitions foncières.',
    avatar: '/images/avatar_notaire.png'
  },
  {
    id: '3',
    name: 'Insp. Cheikh',
    role: 'Inspecteur Général',
    category: 'Partenaires',
    phone: '+221 78 555 44 33',
    email: 'cheikh.insp@police.sn',
    address: 'Dakar',
    linkedProjects: 'Sécurité globale',
    notes: 'Assure la sécurité des sites.',
    avatar: '/images/avatar_police.png'
  },
  {
    id: '4',
    name: 'Cabinet Fall',
    role: 'Avocats d\'Affaires',
    category: 'Partenaires',
    phone: '+221 76 111 22 33',
    email: 'contact@cabinet-fall.sn',
    address: 'Plateau, Dakar',
    linkedProjects: 'Litiges, Contrats',
    notes: 'Rédaction des contrats de partenariat.',
    avatar: '/images/avatar_avocat.png'
  },
  {
    id: '5',
    name: 'Dr. Ousmane',
    role: 'Investisseur Privé',
    category: 'Investisseurs',
    phone: '+221 70 999 88 77',
    email: 'ousmane@health-consult.sn',
    address: 'Point E, Dakar',
    linkedProjects: 'Clinique Privée (Idée)',
    notes: 'Intéressé par le financement du pôle santé.',
    avatar: '/images/avatar_medecin.png'
  },
  {
    id: '6',
    name: 'Capitaine Ndiaye',
    role: 'Chef Douane',
    category: 'Partenaires',
    phone: '+221 77 444 55 66',
    email: 'ndiaye.douane@gouv.sn',
    address: 'Port de Dakar',
    linkedProjects: 'Importation Matériel',
    notes: 'Facilitation douanière pour le Laser Park.',
    avatar: '/images/avatar_capitaine.png'
  },
  {
    id: '7',
    name: 'Jean Dupont',
    role: 'Fournisseur Matériaux',
    category: 'Fournisseurs',
    phone: '+33 6 12 34 56 78',
    email: 'jdupont@fournisseur.fr',
    address: 'Paris, France',
    linkedProjects: 'Immeuble Fann Hock',
    notes: 'Fournisseur d\'acier et ciment spécialisé.',
    avatar: '/images/avatar_admin.png'
  }
];
