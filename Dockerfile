# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app


# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy src code
COPY . .
# and Build
RUN npm run prebuild && \
    npm run build

EXPOSE 3000

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]



