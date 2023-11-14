FROM node:18-alpine

WORKDIR /react-docker/

COPY public/ /react-docker/public
COPY src/ /react-docker/src
COPY package.json /react-docker/
COPY vite.config.js /react-docker/
COPY index.html /react-docker/

RUN npm install

EXPOSE 10000

CMD ["npm", "run", "dev"]