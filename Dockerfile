# build stage
FROM node:14.21.1 AS build-stage
WORKDIR /
COPY . .

RUN yarn \
    && yarn build 

# production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /dist/. /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]