#!/bin/bash

# ============================================
# AAU Startup Portal - Production Deployment Script
# ============================================

set -e

echo "🚀 Starting AAU Startup Portal Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Determine docker compose command
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p nginx/ssl
mkdir -p nginx/conf.d

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo -e "${YELLOW}⚠️  .env.production not found. Creating from template...${NC}"
    cp .env.production.example .env.production 2>/dev/null || echo "Please create .env.production file"
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
$DOCKER_COMPOSE -f docker-compose.prod.yml down

# Remove old images (optional - uncomment if you want to force rebuild)
# echo "🗑️  Removing old images..."
# docker rmi aau-frontend:latest 2>/dev/null || true

# Build images
echo "🔨 Building Docker images..."
$DOCKER_COMPOSE -f docker-compose.prod.yml build --no-cache

# Start containers
echo "🚢 Starting containers..."
$DOCKER_COMPOSE -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check container status
echo "📊 Container Status:"
$DOCKER_COMPOSE -f docker-compose.prod.yml ps

# Check logs
echo ""
echo "📝 Recent logs:"
$DOCKER_COMPOSE -f docker-compose.prod.yml logs --tail=50

# Health check
echo ""
echo "🏥 Performing health check..."
sleep 5

if curl -f http://localhost/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Application is healthy and running!${NC}"
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo ""
    echo "📍 Access your application at:"
    echo "   - HTTP: http://localhost"
    echo "   - HTTPS: https://localhost (if SSL is configured)"
    echo ""
    echo "📊 Useful commands:"
    echo "   - View logs: $DOCKER_COMPOSE -f docker-compose.prod.yml logs -f"
    echo "   - Stop: $DOCKER_COMPOSE -f docker-compose.prod.yml down"
    echo "   - Restart: $DOCKER_COMPOSE -f docker-compose.prod.yml restart"
    echo "   - Status: $DOCKER_COMPOSE -f docker-compose.prod.yml ps"
else
    echo -e "${RED}❌ Health check failed. Please check the logs.${NC}"
    echo "Run: $DOCKER_COMPOSE -f docker-compose.prod.yml logs"
    exit 1
fi
