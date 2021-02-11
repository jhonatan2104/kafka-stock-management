FROM node:14.15.4

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install

EXPOSE 3333

CMD yarn start:dev