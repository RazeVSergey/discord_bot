FROM node:16-alpine

ENV APP_PATH=/app

WORKDIR ${APP_PATH}

COPY package*.json .

#RUN npm i

RUN npm ci

COPY . .

CMD ["node", "app.js"]