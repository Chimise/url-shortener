FROM node:20.2-alpine3.16 as base

WORKDIR /app

COPY package*.json ./


FROM base as dev

RUN --mount=type=cache,target=/app/.npm \
    npm set cache /app/.npm && \
    npm install

COPY . .

EXPOSE 5051

CMD [ "npm", "run", "dev"]


FROM base as production

ENV NODE_ENV production

RUN --mount=type=cache,target=/app/.npm \
    npm set cache /app/.npm && \
    npm ci --only=production

USER node

COPY --chown=node:node ./src .

EXPOSE 5050

CMD [ "npm", "run", "start"]











