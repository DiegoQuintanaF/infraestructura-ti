FROM node:20-alpine3.19
WORKDIR /app
COPY ./src ./src
COPY package.json .
RUN npm run build
EXPOSE 3000
CMD [ "node", "src/app.js" ]