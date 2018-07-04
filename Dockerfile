FROM node:8.11.1 as builder

COPY . /gatherer-api

WORKDIR /gatherer-api

RUN yarn install

RUN npm run build:prod

EXPOSE 80

CMD [ "npm", "run", "start:prod" ]

