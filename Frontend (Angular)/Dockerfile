FROM node:19.5-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-prod
CMD ["npm", "run", "start"]