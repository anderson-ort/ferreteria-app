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
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off"]
