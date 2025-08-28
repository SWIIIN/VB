# Utilise une image officielle Node
FROM node:20

# Crée le dossier de l'app
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Installe TypeScript globalement pour éviter les erreurs de permission
RUN npm install -g typescript

# Copie le reste du code
COPY . .

# Compile le projet TypeScript
RUN npm run build

# Expose le port (optionnel, Railway le gère automatiquement)
EXPOSE 3001

# Commande de démarrage
CMD ["npm", "start"]