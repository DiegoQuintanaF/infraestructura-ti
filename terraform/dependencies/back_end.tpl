#!/bin/bash
apt-get update -y &&
apt-get install -y \
apt-transport-https \
ca-certificates \
curl \
gnupg-agent \
software-properties-common && \
sudo install -m 0755 -d /etc/apt/keyrings && \
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc && \
sudo chmod a+r /etc/apt/keyrings/docker.asc && \
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
sudo apt-get update && \
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin && \
sudo groupadd docker && \
sudo usermod -aG docker $USER && \
newgrp docker && \
docker run --name emovie-back -p 80:80 \
  -e STAGE=prod \
  -e HOST_API=/api/v1 \
  -e PORT=80 \
  -e DB_PASSWORD="${db_password}" \
  -e DB_NAME="${db_name}" \
  -e DB_HOST="${db_host} \
  -e DB_PORT=${db_port} \
  -e DB_USER="${db_user}" \
  -e JWT_SECRET="219186f168fb67adc8bc6dde0dbea4627e595825d467dc7f0e88100a7de1fbb8" \
  -e BCRYPT_SALT=10 \
  dquintanaf/custumer_app_backend:latest