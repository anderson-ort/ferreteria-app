# Estamos realizando un contenedor MultiStaging  para poder tener una aplicacion lo mas ligera posible
# ---------- Etapa 1: Build ----------
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el resto del código
COPY . .

# Variables de entorno de build (solo necesarias si Vite las usa en build)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_KEY
ARG VITE_API_ENDPOINT

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_KEY=$VITE_SUPABASE_KEY
ENV VITE_API_ENDPOINT=$VITE_API_ENDPOINT

# Construimos la app
RUN npm run build

# ---------- Etapa 2: Producción ----------
FROM node:20-alpine

WORKDIR /app

# Instalar serve de manera global
RUN npm install -g serve

# Copiar los archivos build
COPY --from=build /app/dist ./dist

# Exponer el puerto que Cloud Run usará
EXPOSE 8080

# Ejecutar serve en modo SPA
CMD ["serve", "-s", "dist", "-l", "8080"]
