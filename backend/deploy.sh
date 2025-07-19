#!/bin/bash

# EC2 Deployment Script for Panacea Backend
echo "🚀 Starting deployment of Panacea Backend..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install nginx
echo "📦 Installing nginx..."
sudo apt install -y nginx

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/panacea-backend
sudo chown -R $USER:$USER /var/www/panacea-backend

# Navigate to app directory
cd /var/www/panacea-backend

# Copy application files (assuming you've uploaded them)
echo "📁 Setting up application files..."
# Note: You'll need to upload your files here first

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Create logs directory
mkdir -p logs

# Setup environment variables
echo "⚙️ Setting up environment variables..."
# Create .env file with your variables
sudo tee .env > /dev/null <<EOF
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string_here
EOF

echo "🔧 Please edit /var/www/panacea-backend/.env with your actual environment variables"

# Start the application with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# Setup nginx configuration
echo "🔧 Setting up nginx..."
sudo tee /etc/nginx/sites-available/panacea-backend > /dev/null <<EOF
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the nginx site
sudo ln -s /etc/nginx/sites-available/panacea-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Enable nginx to start on boot
sudo systemctl enable nginx

echo "✅ Deployment completed!"
echo "🔧 Don't forget to:"
echo "   1. Edit /var/www/panacea-backend/.env with your MongoDB URI"
echo "   2. Update the nginx config with your domain name"
echo "   3. Set up SSL with Let's Encrypt (optional but recommended)"
echo "   4. Configure your security groups to allow HTTP (80) and HTTPS (443)"

# Show PM2 status
pm2 status 