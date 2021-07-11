FROM node:14

COPY . /app
WORKDIR /app

CMD npm run build && npm start

EXPOSE 3000
