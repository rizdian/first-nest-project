# Use the Node.js 18 Alpine base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and lock file first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS project
RUN npm run build

# Expose the port your app listens on
EXPOSE 3000

# Start the NestJS app
CMD ["node", "dist/main"]
