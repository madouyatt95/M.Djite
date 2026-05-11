export interface Contact {
  id: string;
  name: string;
  function: string;
  category: 'Avocat' | 'Notaire' | 'Police' | 'Admin' | 'Autres';
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
    name: 'Maître A. Diop',
    function: 'Avocat',
    category: 'Avocat',
    phone: '+221 77 123 45 67',
    email: 'adiop.avocat@gmail.com',
    address: 'Almadies, Dakar - Sénégal',
    linkedProjects: 'Immeuble Fann Hock, Al Bourak',
    notes: 'Conseiller juridique principal. Très fiable et disponible.',
    avatar: '/images/avatar_avocat.png'
  },
  {
    id: '2',
    name: 'Merissa Ndiaye',
    function: 'Notaire',
    category: 'Notaire',
    phone: '+221 78 234 56 78',
    email: 'mndiaye.notaire@gmail.com',
    address: 'Plateau, Dakar - Sénégal',
    linkedProjects: 'Immeuble Fann Hock',
    notes: 'Notaire de confiance pour toutes les transactions immobilières.',
    avatar: '/images/avatar_notaire.png'
  },
  {
    id: '3',
    name: 'Commissaire Fall',
    function: 'Police',
    category: 'Police',
    phone: '+221 76 345 67 89',
    email: 'cfall.police@gouv.sn',
    address: 'Médina, Dakar - Sénégal',
    linkedProjects: 'Laser Park Abidjan',
    notes: 'Contact sécurité. Disponible en cas d\'urgence.',
    avatar: '/images/avatar_police.png'
  },
  {
    id: '4',
    name: 'M. Diagne',
    function: 'Administration',
    category: 'Admin',
    phone: '+221 70 456 78 90',
    email: 'mdiagne.admin@gouv.sn',
    address: 'Dakar Plateau - Sénégal',
    linkedProjects: 'Poulailler, Des Coups Verts',
    notes: 'Responsable administratif des autorisations.',
    avatar: '/images/avatar_admin.png'
  },
  {
    id: '5',
    name: 'Capitaine Touré',
    function: 'Gendarmerie',
    category: 'Autres',
    phone: '+221 77 567 89 01',
    email: 'ctoure@gend.sn',
    address: 'Guédiawaye, Dakar - Sénégal',
    linkedProjects: 'Al Bourak',
    notes: 'Contact gendarmerie pour les aspects sécuritaires.',
    avatar: '/images/avatar_capitaine.png'
  },
  {
    id: '6',
    name: 'Dr. Sall',
    function: 'Médecin',
    category: 'Autres',
    phone: '+221 78 678 90 12',
    email: 'drsall@sante.sn',
    address: 'Fann, Dakar - Sénégal',
    linkedProjects: '',
    notes: 'Médecin personnel. Consultation et suivi de santé.',
    avatar: '/images/avatar_medecin.png'
  }
];

export const contactCategories = ['Tous', 'Avocat', 'Notaire', 'Police', 'Admin', 'Autres'];
