# build stage
FROM node:lts-alpine as build-stage
WORKDIR /
COPY . .

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && yarn \
    && yarn build \
    && apk del build-dependencies

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /dist/. /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]