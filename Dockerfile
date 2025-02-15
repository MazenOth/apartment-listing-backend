FROM node:20.12.2

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y default-mysql-client

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start:dev"]
