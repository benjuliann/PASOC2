# Use the official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies first (cache-friendly)
COPY package*.json ./
RUN npm install --production

# Copy the rest of the app
COPY . .

# Build the app (for Next.js production)
RUN npm run build

# Expose the default Next.js port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
