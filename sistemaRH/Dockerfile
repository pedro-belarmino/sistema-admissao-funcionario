FROM node:23-alpine3.20

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE ${VITE_HOST_PORT}

CMD [ "serve", "-s", "dist" ]