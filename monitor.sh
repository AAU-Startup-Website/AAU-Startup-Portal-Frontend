#!/bin/bash

# ============================================
# AAU Startup Portal - Monitoring Script
# ============================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Determine docker compose command
if docker compose version &> /dev/null 2>&1; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

clear
echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   AAU Startup Portal - System Monitor         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

# Check if containers are running
echo -e "${YELLOW}📊 Container Status:${NC}"
$DOCKER_COMPOSE -f docker-compose.prod.yml ps
echo ""

# Check container health
echo -e "${YELLOW}🏥 Health Status:${NC}"
for container in aau-nginx aau-frontend; do
    if docker ps --filter "name=$container" --filter "health=healthy" | grep -q $container; then
        echo -e "  ${GREEN}✓${NC} $container: Healthy"
    elif docker ps --filter "name=$container" --filter "health=unhealthy" | grep -q $container; then
        echo -e "  ${RED}✗${NC} $container: Unhealthy"
    elif docker ps --filter "name=$container" | grep -q $container; then
        echo -e "  ${YELLOW}⚠${NC} $container: Starting..."
    else
        echo -e "  ${RED}✗${NC} $container: Not running"
    fi
done
echo ""

# Resource usage
echo -e "${YELLOW}💻 Resource Usage:${NC}"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" | grep -E "aau-|NAME"
echo ""

# Disk usage
echo -e "${YELLOW}💾 Disk Usage:${NC}"
docker system df
echo ""

# Recent logs
echo -e "${YELLOW}📝 Recent Logs (last 10 lines):${NC}"
echo -e "${BLUE}--- Frontend ---${NC}"
$DOCKER_COMPOSE -f docker-compose.prod.yml logs --tail=10 frontend 2>/dev/null | tail -10
echo ""
echo -e "${BLUE}--- Nginx ---${NC}"
$DOCKER_COMPOSE -f docker-compose.prod.yml logs --tail=10 nginx 2>/dev/null | tail -10
echo ""

# Network connectivity
echo -e "${YELLOW}🌐 Network Connectivity:${NC}"
if curl -f -s http://localhost/health > /dev/null; then
    echo -e "  ${GREEN}✓${NC} Application is accessible"
else
    echo -e "  ${RED}✗${NC} Application is not accessible"
fi
echo ""

# SSL Certificate expiry (if exists)
if [ -f "nginx/ssl/fullchain.pem" ]; then
    echo -e "${YELLOW}🔒 SSL Certificate:${NC}"
    EXPIRY=$(openssl x509 -enddate -noout -in nginx/ssl/fullchain.pem | cut -d= -f2)
    echo -e "  Expires: $EXPIRY"
    echo ""
fi

# Uptime
echo -e "${YELLOW}⏱️  Container Uptime:${NC}"
docker ps --filter "name=aau-" --format "table {{.Names}}\t{{.Status}}"
echo ""

echo -e "${GREEN}✓ Monitoring complete${NC}"
echo ""
echo "💡 Useful commands:"
echo "  - View live logs: $DOCKER_COMPOSE -f docker-compose.prod.yml logs -f"
echo "  - Restart services: $DOCKER_COMPOSE -f docker-compose.prod.yml restart"
echo "  - Stop services: $DOCKER_COMPOSE -f docker-compose.prod.yml down"
