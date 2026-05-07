# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port
EXPOSE 8000

# Start the api-gateway using ts-node
CMD ["npx", "ts-node", "index.ts"]
