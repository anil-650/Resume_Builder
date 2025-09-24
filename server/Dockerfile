
FROM node:22.14-alpine AS base
WORKDIR /app

COPY ./puppeteer-alpine-setup.sh ./
COPY ./package.json ./
COPY ./yarn.lock ./

FROM base AS build
COPY --from=base /app /app

RUN sh ./puppeteer-alpine-setup.sh 

RUN yarn install

COPY . .

ENV DB_HOST=pg
ENV DB_USER=dev
ENV DB_PASS=dev
ENV DB_NAME=myresumebuilder
ENV DB_PORT=5432
ENV DB_URL=postgresql://dev:dev@localhost:5432/myresumebuilder
# ENV BASEURL=http://localhost:3000 # need this for printing pdf , refs to thefrontend site

EXPOSE 5000

CMD yarn run dev

