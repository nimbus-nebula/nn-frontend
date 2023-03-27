FROM node:17-alpine as builder
# ADD . /app
# WORKDIR /app
# RUN npm install
# EXPOSE 3000
# CMD ["npm", "start"]

# develop stage
# FROM node:14.17.0-alpine as develop-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .

# # build stage
# FROM develop-stage as build-stage
# RUN npm run build
# COPY ./nginx.conf /etc/nginx/nginx.conf

# # Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# # production stage
# FROM nginx:1.15.7-alpine as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# stage1 as builder
# FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json ./

# Install the dependencies and make the folder
RUN npm install 
RUN mkdir /react-ui

WORKDIR /react-ui

COPY . .

# Build the project and copy the files
RUN npm run build


FROM nginx:alpine

#!/bin/sh

COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /react-ui/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]