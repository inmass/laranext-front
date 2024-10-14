# Base image for both dev and prod
FROM node:20 as base

# Set working directory
WORKDIR /app

# Copy package.json, package-lock.json, and tsconfig.json
COPY package*.json tsconfig.json .eslintrc.json ./

# Development stage
FROM base as dev

# Install all dependencies
RUN npm ci

# Copy all files
COPY . .

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the frontend in development mode
CMD ["npm", "run", "dev"]

# Production stage
FROM base as prod

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy all files
COPY . .

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
