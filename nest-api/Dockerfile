# Используем официальный образ Node.js
FROM node:22-alpine

# Создаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем приложение (если используется TypeScript)
RUN npm run build

# Открываем порт, на котором работает приложение
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start:prod"]