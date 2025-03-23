# Используем базовый образ Node.js для сборки
FROM node:20 AS build

# Устанавливаем рабочую директорию
WORKDIR /dist/src/app

RUN npm cache clean --force
# Копируем package.json и package-lock.json
COPY . .
# Устанавливаем зависимости
RUN npm install -g @angular/cli && npm install && npm install -g serve

RUN npm run build

## Используем образ Nginx для production
FROM nginx:latest as ngi

# Копируем конфигурацию Nginx
COPY --from=build /dist/src/app/dist/intro/browser/en-US /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
# Копируем собранное Angular приложение

EXPOSE 80

# Запускаем Nginx
#CMD ["nginx", "-g", "daemon off;"]
