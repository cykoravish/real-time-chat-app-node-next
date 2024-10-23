# #!/bin/bash
# set -e

# echo "Deployment started..."

# # Pull the latest version of the app
# git pull origin main
# echo "New changes copied to server !"

# echo "Installing Dependencies..."
# npm install --yes

# echo "Creating Production Build..."
# npm run build

# echo "PM2 Reload"
# pm2 reload 0

# echo "Deployment Finished!"

#!/bin/bash
set -e

exec > >(tee -i /var/log/deploy.log)
exec 2>&1

echo "Deployment started..."

# Navigate to the app directory
cd ~/real-time-chat-app-node-next

# Pull the latest changes
git fetch --all
git reset --hard origin/main
echo "New changes copied to server!"

echo "Installing Dependencies..."
npm install

echo "Creating Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload your-app-name

echo "Deployment Finished!"
