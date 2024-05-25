FROM node:20-alpine3.19 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install 


FROM node:20-alpine3.19 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules /app/node_modules
COPY . .
RUN npm run build

FROM node:20-alpine3.19 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --omit=dev

FROM node:20-alpine3.19 as prod
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
