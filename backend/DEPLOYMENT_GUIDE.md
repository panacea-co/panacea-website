# AWS EC2 Deployment Guide for Panacea Backend

## Prerequisites

1. **AWS Account** with EC2 access
2. **Domain name** (optional but recommended)
3. **MongoDB database** (MongoDB Atlas recommended)

## Step 1: Launch EC2 Instance

1. **Go to AWS EC2 Console**

   - Navigate to https://console.aws.amazon.com/ec2/

2. **Launch Instance**

   - Click "Launch Instance"
   - **Name**: `panacea-backend-server`
   - **AMI**: Ubuntu Server 22.04 LTS (Free Tier Eligible)
   - **Instance Type**: t2.micro (Free Tier) or t3.small for production
   - **Key Pair**: Create new or use existing (download .pem file)
   - **Security Group**: Create new with these rules:
     - SSH (22) - Your IP only
     - HTTP (80) - Anywhere (0.0.0.0/0)
     - HTTPS (443) - Anywhere (0.0.0.0/0)
     - Custom TCP (5000) - Anywhere (for testing, remove later)

3. **Launch Instance**

## Step 2: Connect to Your EC2 Instance

### Using SSH (Windows with PowerShell)

```bash
# Navigate to your key file directory
cd C:\path\to\your\keyfile

# Connect to instance
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

### Using AWS Connect (Browser-based)

- Select your instance and click "Connect"
- Choose "EC2 Instance Connect"

## Step 3: Upload Your Application Files

### Option A: Using SCP (Recommended)

```bash
# From your local machine, navigate to your project directory
cd /path/to/your/panacea-website

# Upload the backend folder to EC2
scp -i "your-key.pem" -r backend/ ubuntu@your-ec2-public-ip:/home/ubuntu/
```

### Option B: Using Git

```bash
# On EC2 instance
git clone https://github.com/your-username/panacea-website.git
cd panacea-website/backend
```

## Step 4: Run the Deployment Script

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

## Step 5: Configure Environment Variables

```bash
# Edit the .env file
sudo nano /var/www/panacea-backend/.env
```

Add your actual values:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/panacea?retryWrites=true&w=majority
```

## Step 6: Configure Domain (If you have one)

```bash
# Edit nginx configuration
sudo nano /etc/nginx/sites-available/panacea-backend
```

Replace `your_domain.com` with your actual domain.

## Step 7: Restart Services

```bash
# Restart PM2 application
pm2 restart panacea-backend

# Restart nginx
sudo systemctl restart nginx

# Check status
pm2 status
sudo systemctl status nginx
```

## Step 8: Test Your Deployment

```bash
# Test locally on the server
curl http://localhost:5000/api/test

# Test from your browser
http://your-ec2-public-ip/api/test
# or
http://your-domain.com/api/test
```

## Step 9: Set up SSL (Optional but Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

## Database Options

### Option A: MongoDB Atlas (Recommended)

1. Go to https://cloud.mongodb.com/
2. Create a free cluster
3. Add your EC2 IP to IP Whitelist
4. Get connection string and add to .env

### Option B: Local MongoDB on EC2

```bash
# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Update .env
MONGODB_URI=mongodb://localhost:27017/panacea
```

## Useful Commands

```bash
# View application logs
pm2 logs panacea-backend

# Monitor application
pm2 monit

# Restart application
pm2 restart panacea-backend

# Stop application
pm2 stop panacea-backend

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Check application status
curl http://localhost:5000/health
```

## Security Best Practices

1. **Remove SSH access for port 22 from 0.0.0.0/0** - restrict to your IP only
2. **Remove port 5000 access** from security group after testing
3. **Set up SSL** with Let's Encrypt
4. **Regular updates**: `sudo apt update && sudo apt upgrade`
5. **Use environment variables** for all sensitive data
6. **Monitor logs** regularly with `pm2 logs`

## Troubleshooting

### Application won't start

```bash
# Check PM2 logs
pm2 logs panacea-backend

# Check if port is in use
sudo netstat -tulpn | grep :5000

# Restart everything
pm2 restart panacea-backend
sudo systemctl restart nginx
```

### Database connection issues

```bash
# Test MongoDB connection
mongo "your-mongodb-uri"

# Check environment variables
cat /var/www/panacea-backend/.env
```

### Nginx issues

```bash
# Test nginx configuration
sudo nginx -t

# Check nginx status
sudo systemctl status nginx

# Restart nginx
sudo systemctl restart nginx
```

## Updating Your Application

```bash
# Pull latest changes
cd /var/www/panacea-backend
git pull origin main

# Install new dependencies (if any)
npm install --production

# Restart application
pm2 restart panacea-backend
```

Your backend should now be accessible at:

- `http://your-ec2-public-ip/api/test`
- `http://your-domain.com/api/test` (if domain configured)
- `https://your-domain.com/api/test` (if SSL configured)
