# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
FROM node:10

RUN mkdir -p /opt/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt
COPY package.json package-lock.json* *.lock ./
RUN yarn config set '@bit:registry' https://node.bitsrc.io
RUN yarn install
ENV PATH /opt/node_modules/.bin:$PATH


# copy in our source code last, as it changes the most
WORKDIR /opt/app
COPY . /opt/app
RUN yarn run build

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik

EXPOSE 3000
CMD [ "npm", "start"]
