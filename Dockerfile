FROM node:lts as build

WORKDIR /app

COPY package*.json ./

RUN NODE_OPTIONS=--max_old_space_size=1024

RUN yarn install 

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/build /bin/www

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]