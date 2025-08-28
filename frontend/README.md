# VoyagaBagae - Plateforme de Transport de Colis au Maroc

VoyagaBagae est une plateforme web moderne qui connecte les expéditeurs et les transporteurs au Maroc, permettant un transport de colis économique, rapide et sécurisé.

## 🚀 Fonctionnalités

### Pour les Expéditeurs
- **Recherche de transporteurs** : Trouvez des transporteurs sur votre trajet
- **Publication d'annonces** : Créez des annonces pour vos colis
- **Suivi en temps réel** : Suivez vos colis pendant le transport
- **Évaluation et notation** : Évaluez vos expériences de transport

### Pour les Transporteurs
- **Gestion des trajets** : Publiez vos trajets et trouvez des colis
- **Optimisation des revenus** : Rentabilisez vos déplacements
- **Profil vérifié** : Bénéficiez d'un profil avec évaluations
- **Flexibilité** : Acceptez ou refusez les demandes selon vos disponibilités

### Fonctionnalités Générales
- **Interface moderne** : Design responsive et intuitif
- **Authentification sécurisée** : Système de connexion/inscription
- **Messagerie intégrée** : Communication directe entre utilisateurs
- **Système de notation** : Évaluations et avis des utilisateurs
- **Géolocalisation** : Sélection facile des villes marocaines

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** : Bibliothèque UI moderne
- **TypeScript** : Typage statique pour la robustesse du code
- **Tailwind CSS** : Framework CSS utilitaire
- **React Router** : Navigation entre les pages
- **Lucide React** : Icônes modernes et légères

### Outils de Développement
- **Vite** : Build tool rapide et moderne
- **ESLint** : Linting du code
- **PostCSS** : Post-processing CSS
- **Autoprefixer** : Préfixes CSS automatiques

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # En-tête de navigation
│   ├── Footer.tsx      # Pied de page
│   ├── Hero.tsx        # Section héro de la page d'accueil
│   ├── SearchSection.tsx # Section de recherche
│   ├── LoginModal.tsx  # Modal de connexion
│   ├── RegisterModal.tsx # Modal d'inscription
│   └── ProtectedRoute.tsx # Protection des routes
├── contexts/           # Contextes React
│   └── AuthContext.tsx # Contexte d'authentification
├── pages/              # Pages de l'application
│   ├── Home.tsx        # Page d'accueil
│   ├── Dashboard.tsx   # Tableau de bord utilisateur
│   ├── Search.tsx      # Page de recherche
│   ├── PostAnnouncement.tsx # Publication d'annonce
│   └── ...            # Autres pages
├── constants/          # Constantes de l'application
│   └── index.ts       # Export des constantes
└── main.tsx           # Point d'entrée de l'application
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd vbs/project
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run lint` : Vérifie la qualité du code avec ESLint
- `npm run preview` : Prévisualise la version de production

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development
```

### Configuration TypeScript

Le projet utilise TypeScript avec une configuration stricte pour assurer la qualité du code :

- **Target** : ES2022
- **Strict mode** : Activé
- **Source maps** : Activés pour le débogage
- **Alias** : Configuration des chemins d'import

### Configuration Tailwind

Tailwind CSS est configuré avec :
- Couleurs personnalisées (primary, secondary)
- Animations personnalisées
- Ombres personnalisées
- Police Inter par défaut

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🔐 Authentification

Le système d'authentification utilise :
- **Context API** : Gestion globale de l'état utilisateur
- **LocalStorage** : Persistance de session (à remplacer par des cookies sécurisés en production)
- **Routes protégées** : Accès contrôlé aux pages sensibles
- **Validation des formulaires** : Vérification côté client

## 🎨 Design System

### Couleurs
- **Primary** : Rouge (#dc2626) - Actions principales
- **Secondary** : Orange (#ea580c) - Actions secondaires
- **Neutral** : Gris (#6b7280) - Texte et bordures

### Typographie
- **Police principale** : Inter
- **Hiérarchie** : H1 (6xl) à H6 (base)
- **Poids** : Regular (400), Medium (500), Semibold (600), Bold (700)

### Composants
- **Boutons** : Styles cohérents avec états hover/focus
- **Formulaires** : Validation visuelle et messages d'erreur
- **Modales** : Animations d'entrée/sortie
- **Navigation** : Menu hamburger pour mobile

## 🧪 Tests

### Linting
```bash
npm run lint
```

### Build de Production
```bash
npm run build
```

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Serveur de Production
```bash
npm run preview
```

## 🔮 Améliorations Futures

### Court Terme
- [ ] Intégration d'une API backend
- [ ] Système de notifications push
- [ ] Upload d'images pour les annonces
- [ ] Système de paiement intégré

### Moyen Terme
- [ ] Application mobile React Native
- [ ] Système de géolocalisation en temps réel
- [ ] Intégration avec des services de transport
- [ ] Système de recommandations IA

### Long Terme
- [ ] Extension à d'autres pays d'Afrique
- [ ] API publique pour développeurs
- [ ] Système de fidélité et récompenses
- [ ] Intégration blockchain pour la sécurité

## 🤝 Contribution

### Guide de Contribution
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code
- Utiliser TypeScript strict
- Suivre les conventions ESLint
- Écrire des composants réutilisables
- Ajouter des commentaires pour la logique complexe
- Tester les fonctionnalités avant commit

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Email** : support@voyagabagae.ma
- **Téléphone** : +212 5XX-XXX-XXX
- **Documentation** : [docs.voyagabagae.ma](https://docs.voyagabagae.ma)

## 🙏 Remerciements

- **React Team** : Pour l'excellent framework
- **Tailwind CSS** : Pour le système de design utilitaire
- **Lucide** : Pour les icônes modernes
- **Vite** : Pour l'outil de build rapide

---

**VoyagaBagae** - Connecter le Maroc, un colis à la fois 🚚📦
