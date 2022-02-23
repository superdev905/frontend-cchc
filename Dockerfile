FROM node:lts as build

WORKDIR /app

COPY package*.json ./
COPY ./.env /.env

#ENV NODE_OPTIONS=--max_old_space_size=2048

RUN yarn install 

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/build /bin/www


COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
#COPY ./app /app
#COPY ./app/node_modules /app/node_modules
