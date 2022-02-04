FROM node:12-alpine as build

WORKDIR /app

COPY package*.json ./

RUN yarn install 

COPY . .

RUN yarn build --max-old-space-size=8192

FROM nginx:stable-alpine

COPY --from=build /app/build /bin/www

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]