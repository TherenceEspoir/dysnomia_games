# Utiliser une image de Node.js 20.10.0 comme image de base pour la phase de build
FROM node:20.10.0 as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Construire l'application
RUN npm run build

# Utiliser une image de Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits de l'étape précédente dans le répertoire Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
