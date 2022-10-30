# Dockerfile
FROM node:16.17.0-alpine

# Update and install dependency
RUN apk update && apk upgrade

# Create destination directory
RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install

# process.env.NODE_ENV
# https://docs.docker.com/engine/reference/builder/#env
ENV HOST=0.0.0.0
ENV PORT=4000
ENV PRIVATE_KEY=MY_PRIVATE_API_KEY

EXPOSE 4000

CMD [ "npm", "start" ]