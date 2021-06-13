FROM node:16.3.0
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN yarn install
COPY . .
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]