# AAU Startup Portal - Production Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Ubuntu Server (20.04 LTS or newer)
- Docker (20.10+)
- Docker Compose (2.0+)
- Domain name (optional, for SSL)

### Installation Steps

#### 1. Install Docker on Ubuntu

```bash
# Update package index
sudo apt update

# Install required packages
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker compose version
```

#### 2. Clone and Configure

```bash
# Clone your repository
git clone <your-repo-url>
cd AAU-Startup-Portal-Frontend

# Configure environment variables
cp .env.production .env.production.local
nano .env.production.local  # Edit with your actual values
```

#### 3. Deploy

```bash
# Run the deployment script
./deploy.sh
```

That's it! Your application should now be running.

---

## 📋 Detailed Configuration

### Environment Variables

Edit `.env.production` with your actual values:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Domain (for SSL)
DOMAIN=your-domain.com
```

### SSL/HTTPS Setup

#### Option 1: Using Let's Encrypt (Recommended)

```bash
# Install certbot
sudo apt install -y certbot

# Stop nginx temporarily
docker compose -f docker-compose.prod.yml stop nginx

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Copy certificates to nginx directory
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/

# Update nginx configuration
# Uncomment the HTTPS server block in nginx/conf.d/default.conf
nano nginx/conf.d/default.conf

# Restart containers
docker compose -f docker-compose.prod.yml up -d
```

#### Option 2: Using Your Own Certificates

```bash
# Copy your certificates
cp /path/to/your/fullchain.pem nginx/ssl/
cp /path/to/your/privkey.pem nginx/ssl/

# Update nginx configuration
nano nginx/conf.d/default.conf
```

### Auto-renewal for Let's Encrypt

```bash
# Add cron job for auto-renewal
sudo crontab -e

# Add this line (runs twice daily)
0 0,12 * * * certbot renew --quiet --deploy-hook "docker compose -f /path/to/your/project/docker-compose.prod.yml restart nginx"
```

---

## 🔧 Management Commands

### View Logs

```bash
# All services
docker compose -f docker-compose.prod.yml logs -f

# Specific service
docker compose -f docker-compose.prod.yml logs -f frontend
docker compose -f docker-compose.prod.yml logs -f nginx
```

### Restart Services

```bash
# All services
docker compose -f docker-compose.prod.yml restart

# Specific service
docker compose -f docker-compose.prod.yml restart frontend
docker compose -f docker-compose.prod.yml restart nginx
```

### Stop Services

```bash
docker compose -f docker-compose.prod.yml down
```

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d
```

### Check Container Status

```bash
docker compose -f docker-compose.prod.yml ps
```

### Access Container Shell

```bash
# Frontend container
docker compose -f docker-compose.prod.yml exec frontend sh

# Nginx container
docker compose -f docker-compose.prod.yml exec nginx sh
```

---

## 🔍 Monitoring & Troubleshooting

### Health Checks

```bash
# Check application health
curl http://localhost/health

# Check frontend directly
curl http://localhost:3000/api/health
```

### Common Issues

#### 1. Port Already in Use

```bash
# Check what's using port 80
sudo lsof -i :80

# Stop the service or change nginx port in docker-compose.prod.yml
```

#### 2. Permission Denied

```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

#### 3. Container Won't Start

```bash
# Check logs
docker compose -f docker-compose.prod.yml logs frontend

# Check container status
docker compose -f docker-compose.prod.yml ps
```

#### 4. Nginx Configuration Error

```bash
# Test nginx configuration
docker compose -f docker-compose.prod.yml exec nginx nginx -t

# Reload nginx
docker compose -f docker-compose.prod.yml exec nginx nginx -s reload
```

---

## 🔒 Security Best Practices

### 1. Firewall Configuration

```bash
# Install UFW
sudo apt install -y ufw

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
```

### 2. Regular Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

### 3. Backup Strategy

```bash
# Backup script example
#!/bin/bash
BACKUP_DIR="/backups/aau-portal"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /path/to/AAU-Startup-Portal-Frontend

# Backup nginx configs
tar -czf $BACKUP_DIR/nginx_$DATE.tar.gz nginx/

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

---

## 📊 Performance Optimization

### 1. Enable Nginx Caching

Already configured in `nginx/nginx.conf`. Static assets are cached for 60 minutes.

### 2. Monitor Resource Usage

```bash
# Check container resource usage
docker stats

# Check disk usage
docker system df
```

### 3. Clean Up Unused Resources

```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Complete cleanup
docker system prune -a --volumes
```

---

## 🌐 Domain Configuration

### DNS Settings

Point your domain to your server IP:

```
A Record:  your-domain.com → YOUR_SERVER_IP
A Record:  www.your-domain.com → YOUR_SERVER_IP
```

### Update Nginx Configuration

Edit `nginx/conf.d/default.conf` and replace `your-domain.com` with your actual domain.

---

## 📞 Support

For issues or questions:
- Check logs: `docker compose -f docker-compose.prod.yml logs -f`
- Review this guide
- Check Docker documentation: https://docs.docker.com/

---

## 📝 Architecture Overview

```
┌─────────────────────────────────────────────┐
│              Internet                        │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │   Nginx (Port 80/443)  │
         │   - Reverse Proxy      │
         │   - SSL Termination    │
         │   - Rate Limiting      │
         │   - Caching            │
         └─────────┬───────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │  Next.js Frontend     │
         │  (Port 3000)          │
         │  - Server-side render │
         │  - API routes         │
         └─────────┬───────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │  External Backend API  │
         │  (Your Django/FastAPI) │
         └─────────────────────────┘
```

---

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Firewall configured
- [ ] Domain DNS configured
- [ ] Health checks passing
- [ ] Logs are accessible
- [ ] Backup strategy in place
- [ ] Monitoring set up
- [ ] Auto-renewal for SSL configured
- [ ] Security headers enabled
- [ ] Rate limiting configured

---

**Last Updated:** 2026-04-03
