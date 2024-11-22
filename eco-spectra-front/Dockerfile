# Build stage
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

# Copier la configuration nginx personnalisée si nécessaire
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers de build depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]