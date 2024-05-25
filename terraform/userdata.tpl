#!/bin/bash
apt-get update -y &&
apt-get install -y \
apt-transport-https \
ca-certificates \
curl \
gnupg-agent \
software-properties-common \
nginx && \
systemctl start nginx.service && \
sudo systemctl status nginx.service