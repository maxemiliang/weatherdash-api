FROM node:11-alpine
WORKDIR /app

COPY . .
RUN npm i

CMD ["npm", "run", "start"]