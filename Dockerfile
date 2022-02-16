# build stage
FROM node:12.22 as build-stage
WORKDIR /
COPY . .

RUN yarn \
    && yarn build 

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /dist/. /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]