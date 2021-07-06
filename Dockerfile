FROM node:lts

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]