FROM node:18-slim

RUN apt-get update && apt-get install -yq \
  build-essential \
  python3

RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY ../fullstack-javascript-project-6 .

ENV NODE_ENV=production
RUN make build

CMD ["bash", "-c", "make db-migrate && npm start"]
