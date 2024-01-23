FROM node:18.16-alpine
WORKDIR /react
COPY package.json .
RUN npm i --legacy-peer-deps
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]