FROM node:22.14-alpine AS base
WORKDIR /app

# COPY ./Resume_Builder/beta-client/package.json ./
COPY . .

RUN yarn install
# ADD ./Resume_Builder/beta-client ./ # working

# ENV PORT=3000
# ENV HOST=0.0.0.0

EXPOSE 3000

CMD yarn run dev --host
