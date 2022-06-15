FROM node:18-alpine3.15 AS build
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.22.0-alpine
COPY ./.docker/nginx.conf /etc/nginx/
COPY --from=build /app/dist /var/www