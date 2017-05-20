#!/bin/sh

echo "SERVER PROVISIONING"
echo "============================="
echo "Installing dependencies.."
sudo npm install
echo "============================="
echo "Provisioning server in AWS EC2.."
node aws.js
echo "============================="
echo "Provisioning server in Digital Ocean as a droplet.."
node droplet.js
echo "============================="