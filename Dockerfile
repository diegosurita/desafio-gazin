FROM node:14

COPY . /app
WORKDIR /app

CMD npm run dev

EXPOSE 3000
