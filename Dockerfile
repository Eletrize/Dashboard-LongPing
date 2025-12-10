# Use Node.js Alpine (lightweight)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files (if they exist)
COPY package*.json ./

# Install production dependencies only
RUN npm install --production || true

# Copy all application files
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the Node.js server
CMD ["node", "server.js"]
