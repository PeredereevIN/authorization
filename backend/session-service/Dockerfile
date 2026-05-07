# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port (assuming default port from config or 3000)
EXPOSE 8003

# Start the service
CMD ["node", "dist/index.js"]
