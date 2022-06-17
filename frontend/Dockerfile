# Build
FROM node:18-alpine3.15 AS build
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Deployment
FROM ubuntu:22.10
RUN apt update && \
  apt install -y nginx
COPY ./.docker/default /etc/nginx/sites-available/default
COPY --from=build /app/dist /var/www/html

COPY ./start.sh /bin/start.sh

CMD [ "nginx",  "-g", "daemon off;" ]