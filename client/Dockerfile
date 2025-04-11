# Используем базовый образ Node.js для сборки
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

## Используем образ Nginx для production
FROM nginx:alpine

RUN mkdir -p /etc/ssl/certs

COPY ./ssl/localhost.pem /etc/ssl/certs/localhost.pem
COPY ./ssl/localhost-key.pem /etc/ssl/certs/localhost-key.pem

# Копируем билд
COPY --from=build /app/dist/intro/browser /usr/share/nginx/html

# Копируем nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
