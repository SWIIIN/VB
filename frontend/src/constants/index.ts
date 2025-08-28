// Villes marocaines
export const MOROCCAN_CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 
  'Meknès', 'Oujda', 'Tétouan', 'Safi', 'El Jadida', 'Nador',
  'Kénitra', 'Témara', 'Mohammedia', 'Béni Mellal', 'Taza', 'Larache'
];

// Types de colis
export const PACKAGE_TYPES = [
  { value: 'small', label: 'Petit colis (moins de 5kg)', maxWeight: 5 },
  { value: 'medium', label: 'Colis moyen (5-15kg)', maxWeight: 15 },
  { value: 'large', label: 'Grand colis (15-30kg)', maxWeight: 30 },
  { value: 'bulky', label: 'Colis volumineux', maxWeight: 50 }
];

// Plages de prix
export const PRICE_RANGES = [
  { min: 0, max: 100, label: '0 - 100 MAD' },
  { min: 100, max: 200, label: '100 - 200 MAD' },
  { min: 200, max: 300, label: '200 - 300 MAD' },
  { min: 300, max: 500, label: '300 - 500 MAD' },
  { min: 500, max: 1000, label: '500+ MAD' }
];

// Statuts de transport
export const TRANSPORT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

// Statuts d'annonce
export const ANNOUNCEMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  COMPLETED: 'completed'
} as const;

// Types d'utilisateur
export const USER_TYPES = {
  SHIPPER: 'shipper',
  CARRIER: 'carrier',
  BOTH: 'both'
} as const;

// Limites de l'application
export const APP_LIMITS = {
  MAX_PACKAGE_WEIGHT: 50, // kg
  MAX_PACKAGE_DIMENSIONS: 200, // cm
  MAX_DESCRIPTION_LENGTH: 500, // caractères
  MAX_TITLE_LENGTH: 100, // caractères
  MAX_IMAGES_PER_ANNOUNCEMENT: 5
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Ce champ est requis',
  INVALID_EMAIL: 'Adresse email invalide',
  INVALID_PHONE: 'Numéro de téléphone invalide',
  PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 6 caractères',
  PASSWORDS_DONT_MATCH: 'Les mots de passe ne correspondent pas',
  TERMS_NOT_ACCEPTED: 'Vous devez accepter les conditions d\'utilisation',
  NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre connexion internet.',
  UNAUTHORIZED: 'Vous devez être connecté pour accéder à cette page',
  FORBIDDEN: 'Vous n\'avez pas les permissions nécessaires'
};

// Messages de succès
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Connexion réussie ! Bienvenue sur VoyagaBagae',
  REGISTER_SUCCESS: 'Inscription réussie ! Bienvenue sur VoyagaBagae',
  PROFILE_UPDATED: 'Profil mis à jour avec succès',
  ANNOUNCEMENT_CREATED: 'Annonce créée avec succès',
  ANNOUNCEMENT_UPDATED: 'Annonce mise à jour avec succès',
  TRANSPORT_CONFIRMED: 'Transport confirmé avec succès',
  MESSAGE_SENT: 'Message envoyé avec succès'
};

// Configuration de l'API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  TIMEOUT: 10000, // 10 secondes
  RETRY_ATTEMPTS: 3
};

// Configuration de l'application
export const APP_CONFIG = {
  NAME: 'VoyagaBagae',
  VERSION: '1.0.0',
  DESCRIPTION: 'Plateforme de transport de colis au Maroc',
  SUPPORT_EMAIL: 'support@voyagabagae.ma',
  SUPPORT_PHONE: '+212 5XX-XXX-XXX'
};
