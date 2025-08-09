#!/bin/bash

# Easy Broker Setup Script
# This script helps you get started with Easy Broker quickly

set -e

echo "🚀 Easy Broker Setup Script"
echo "==========================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env file with your specific configuration"
else
    echo "✅ .env file already exists"
fi

# Stop any running containers
echo "🛑 Stopping any running containers..."
docker-compose down 2>/dev/null || true

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Wait for containers to be ready
echo "⏳ Waiting for containers to be ready..."
sleep 10

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Containers are running successfully!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   API:        http://localhost:3333"
    echo "   Health:     http://localhost:3333/health"
    echo "   PHPMyAdmin: http://localhost:8080"
    echo ""
    echo "💾 Database Credentials:"
    echo "   Host:     localhost:3306"
    echo "   Database: easybroker"
    echo "   User:     easybroker"
    echo "   Password: (check your .env file)"
    echo ""
    echo "📖 Next Steps:"
    echo "   1. Test the health endpoint: curl http://localhost:3333/health"
    echo "   2. Check the API documentation in README.md"
    echo "   3. Import sample data or start creating your portfolio!"
    echo ""
    echo "🎉 Setup completed successfully!"
else
    echo "❌ Containers failed to start properly"
    echo "📋 Checking logs..."
    docker-compose logs
    exit 1
fi
