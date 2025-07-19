# Quick Reference - EC2 Deployment

## 🚀 Initial Deployment

```bash
# 1. Upload files to EC2
scp -i "your-key.pem" -r backend/ ubuntu@your-ec2-ip:/home/ubuntu/

# 2. Connect to EC2
ssh -i "your-key.pem" ubuntu@your-ec2-ip

# 3. Run deployment script
cd /home/ubuntu/backend
chmod +x deploy.sh
./deploy.sh

# 4. Configure environment
sudo nano /var/www/panacea-backend/.env
```

## 📱 Application Management

```bash
# Start application
npm run pm2:start

# Restart application
npm run pm2:restart

# Stop application
npm run pm2:stop

# View logs
npm run pm2:logs

# Monitor application
npm run pm2:monit

# Check status
pm2 status
```

## 🔧 Server Management

```bash
# Check application health
curl http://localhost:5000/health

# Restart nginx
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx

# Test nginx config
sudo nginx -t
```

## 📊 Monitoring & Logs

```bash
# Application logs
pm2 logs panacea-backend --lines 50

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# System resources
htop
df -h
free -h
```

## 🔄 Updates & Maintenance

```bash
# Update application code
cd /var/www/panacea-backend
git pull origin main
npm install --production
npm run pm2:restart

# Update system packages
sudo apt update && sudo apt upgrade

# Backup database (if using local MongoDB)
mongodump --db panacea --out /backup/$(date +%Y%m%d)
```

## 🛡️ Security

```bash
# Check open ports
sudo netstat -tulpn

# Update SSL certificate
sudo certbot renew

# Check SSL certificate expiry
sudo certbot certificates

# View security group (from AWS Console)
# - Remove port 5000 access after testing
# - Restrict SSH to your IP only
```

## 🆘 Troubleshooting

```bash
# Check if app is running
ps aux | grep node

# Check port usage
sudo netstat -tulpn | grep :5000

# Kill process on port 5000
sudo lsof -t -i:5000 | xargs sudo kill -9

# Restart everything
npm run pm2:restart
sudo systemctl restart nginx

# Check disk space
df -h

# Check memory usage
free -h
```

## 📞 Important Endpoints

- Health Check: `http://your-domain.com/health`
- API Test: `http://your-domain.com/api/test`
- Waitlist: `http://your-domain.com/api/waitlist` (POST)

## 🔑 Important Files

- Application: `/var/www/panacea-backend/`
- Environment: `/var/www/panacea-backend/.env`
- Nginx Config: `/etc/nginx/sites-available/panacea-backend`
- PM2 Config: `/var/www/panacea-backend/ecosystem.config.js`
- Logs: `/var/www/panacea-backend/logs/`
