FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

RUN npm run build

FROM node:22-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package*.json ./

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]