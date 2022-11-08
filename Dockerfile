# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy src code
COPY . .

# Build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]



