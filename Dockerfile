FROM node:18-alpine as builder
ARG DB_URL
ENV DB_URL $DB_URL
WORKDIR /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python3
RUN npm install
COPY . /app
RUN npm run build_ci

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY --from=builder /app/tsconfig.json /app
COPY package.json /app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python3
RUN npm install --only=prod
EXPOSE 8080 
USER node
CMD ["npm", "run", "start_docker"]