#!/bin/bash

# Grafana Quick Start Script
# This script helps you quickly start Grafana and Prometheus

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Netpulse Grafana & Prometheus Setup          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo "Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker is not running${NC}"
    echo "Please start Docker Desktop and try again"
    exit 1
fi

echo -e "${GREEN}✓ Docker is installed and running${NC}"

# Check if docker-compose is available
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    echo -e "${RED}❌ Docker Compose is not available${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker Compose is available${NC}"
echo ""

# Check if services are already running
if docker ps | grep -q "netpulse-grafana"; then
    echo -e "${YELLOW}⚠️  Grafana is already running${NC}"
    read -p "Do you want to restart it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Stopping existing services..."
        $COMPOSE_CMD -f docker-compose.grafana.yml down
    else
        echo -e "${BLUE}Services are already running:${NC}"
        echo "  - Grafana: http://localhost:3000"
        echo "  - Prometheus: http://localhost:9090"
        exit 0
    fi
fi

# Start services
echo -e "${BLUE}Starting Grafana and Prometheus...${NC}"
$COMPOSE_CMD -f docker-compose.grafana.yml up -d

# Wait for services to start
echo ""
echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 5

# Check if services are running
GRAFANA_RUNNING=$(docker ps | grep "netpulse-grafana" | wc -l)
PROMETHEUS_RUNNING=$(docker ps | grep "netpulse-prometheus" | wc -l)

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║            Setup Complete! ✓                       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""

if [ $GRAFANA_RUNNING -eq 1 ]; then
    echo -e "${GREEN}✓ Grafana is running${NC}"
    echo -e "  URL: ${BLUE}http://localhost:3000${NC}"
    echo -e "  Username: ${YELLOW}admin${NC}"
    echo -e "  Password: ${YELLOW}admin${NC}"
else
    echo -e "${RED}❌ Grafana failed to start${NC}"
    echo "Check logs with: $COMPOSE_CMD -f docker-compose.grafana.yml logs grafana"
fi

echo ""

if [ $PROMETHEUS_RUNNING -eq 1 ]; then
    echo -e "${GREEN}✓ Prometheus is running${NC}"
    echo -e "  URL: ${BLUE}http://localhost:9090${NC}"
else
    echo -e "${RED}❌ Prometheus failed to start${NC}"
    echo "Check logs with: $COMPOSE_CMD -f docker-compose.grafana.yml logs prometheus"
fi

echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Open Grafana at http://localhost:3000"
echo "2. Login with admin/admin (you'll be prompted to change password)"
echo "3. Go to your Netpulse app → Monitoring → Grafana Dashboard"
echo "4. Click Configure and enter:"
echo "   - Grafana Base URL: http://localhost:3000"
echo "   - Dashboard Path: /d/network-topology/network-topology-overview"
echo ""
echo -e "${YELLOW}📚 Documentation:${NC}"
echo "   - Setup Guide: GRAFANA_SETUP.md"
echo "   - Integration Guide: topology-manager/GRAFANA_INTEGRATION.md"
echo ""
echo -e "${YELLOW}🛠️  Useful Commands:${NC}"
echo "   - View logs: $COMPOSE_CMD -f docker-compose.grafana.yml logs -f"
echo "   - Stop services: $COMPOSE_CMD -f docker-compose.grafana.yml down"
echo "   - Restart services: $COMPOSE_CMD -f docker-compose.grafana.yml restart"
echo ""

# Optional: Open browser (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    read -p "Open Grafana in browser? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open http://localhost:3000
    fi
fi


