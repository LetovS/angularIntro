FROM node:20-alpine AS build
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--configuration=ru", "--host","0.0.0.0"]
