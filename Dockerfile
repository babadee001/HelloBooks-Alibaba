FROM node:8

# Create app directory
WORKDIR /usr/src/app

LABEL Author="babadee"

# Install app dependencies
COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "npm", "start" ]
