# docker-nodejs-boilerplate

## How to start

1. [Download Docker Desktop + Sign Up](https://www.docker.com/) 
2. Create container: `$ docker buildx build --platform=linux/amd64 . -t <docker_username>/docker-nodejs-boilerplate`
3. From "Docker Desktop" push container to cloud
4. [Install Docker to Ubuntu Server](https://docs.docker.com/engine/install/ubuntu/)
5. Download container: `$ docker push <docker_username>/docker-nodejs-boilerplate`
6. Run container: `$ docker run --restart always -p 4000:4000 <docker_username>/docker-nodejs-boilerplate`
7. Open in browser <YOUR_SERVER_IP>:4000 => {status: "ok"}
8. (Optional) [Install Nginx](#nginx)

## Commands

```bash
$ npm run dev # development
$ npm run build # build
$ npm run start # launch app for docker
```

## Docker

```bash

##### Local

# container for Ubuntu + add tag "latest" / same command for update container
$ docker buildx build --platform=linux/amd64 . -t <docker_username>/docker-nodejs-boilerplate 

# container for ARM (works ONLY on M1)
$ docker build . -t <docker_username>/docker-nodejs-boilerplate 

# run local
$ docker run -p 4000:4000 <docker_username>/docker-nodejs-boilerplate

##### Server

# server install
$ docker push <docker_username>/docker-nodejs-boilerplate # pull latest version
$ docker run --restart always -p 4000:4000 <docker_username>/docker-nodejs-boilerplate

# commands for server
$ docker ps -a # Docker container
$ docker stop container_id # turn off your Docker container
```

## Nginx

https://www.digitalocean.com/community/tutorials/nginx-ubuntu-18-04-ru

```nginx
server {
        listen 80;
        listen [::]:80;

        listen 443 ssl;
        listen [::]:443 ssl;

        server_name api.example.com;
        
        # Rest API

        location / {
            proxy_pass http://localhost:4000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        # Graphql Websocket API
        # Websocket, perform routing https://api.example.com => http://localhost:4000/graphql

        location /graphql {
            proxy_pass http://localhost:4000/graphql;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_read_timeout 950s;
        }
}
```