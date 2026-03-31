# Use Node.js 20 (required by Next.js)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 3000

# Environment
ENV PORT=3000
ENV NODE_ENV=production

# Start app
CMD ["npm", "start"]
