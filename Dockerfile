#Node is using an alphanumerical version naming like Ubuntu (with elements istead of animals).
#Argon is the name for Node v4 and Boron is the name for Node v6.

FROM node:argon

# Preparing App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install App Dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundling App
COPY . /usr/src/app

EXPOSE 9000

CMD [ "npm", "start" ]
