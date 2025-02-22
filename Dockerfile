# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy pacakge.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the port and start the application
EXPOSE 5000
CMD [ "npm", "start" ]