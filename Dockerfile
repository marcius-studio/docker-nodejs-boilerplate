# Dockerfile
FROM node:16.17.0-alpine
RUN apk add g++ make py3-pip

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# process.env.NODE_ENV
# https://docs.docker.com/engine/reference/builder/#env
ENV HOST=0.0.0.0
ENV PORT=4000
ENV PRIVATE_KEY=MY_PRIVATE_API_KEY

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . /app

# copy the app, note .dockerignor
RUN npm install
RUN npm run build

EXPOSE 4000

CMD [ "node", "dist/server.js" ]