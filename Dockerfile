FROM node:11-alpine
WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
RUN npm ci

COPY . /app/
COPY CHECKS /app/CHECKS

CMD ["npm", "run", "start:build"]