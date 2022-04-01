FROM node:12.16.1-alpine3.9 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./yarn.lock ./
RUN yarn
COPY src /app/
COPY src ./src
COPY public ./public
RUN yarn build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
RUN apk add --no-cache jq
COPY --from=build /app/build /usr/share/nginx/html
COPY docker-entrypoint.sh generate_config_js.sh /
RUN chmod +x docker-entrypoint.sh generate_config_js.sh

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
ENTRYPOINT ["/docker-entrypoint.sh"]
