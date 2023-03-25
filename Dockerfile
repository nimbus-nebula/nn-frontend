FROM node:17-alpine as builder
ADD . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]