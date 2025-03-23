# Используем базовый образ Node.js для сборки
FROM node:20 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY . .
# Устанавливаем зависимости
RUN npm install -g @angular/cli && npm install

# Собираем приложение
RUN npm run build

## Используем образ Nginx для production
FROM nginx:latest

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/nginx.conf
# Копируем собранное Angular приложение
COPY --from=build /app/dist/intro/browser/en-US /usr/share/nginx/html

# Запускаем Nginx
#CMD ["nginx", "-g", "daemon off;"]
