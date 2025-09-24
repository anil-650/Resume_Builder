#! /bin/sh
apk update
# not addding  nodejs \ yarn \ make \ g++ \ gcc \ build-base \ musl-dev chromium-chromedriver \ \ python3 
apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont 

export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=ture
yarn install