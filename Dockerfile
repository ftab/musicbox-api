FROM node:21-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 80
CMD [ "npm", "start" ]
ENV num_of_times_docker_sux 69420