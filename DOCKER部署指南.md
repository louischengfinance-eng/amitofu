# 🐳 Docker 部署指南

## 📦 快速開始

### 方法一：使用 docker-compose（推薦）

```bash
# 1. 構建並啟動
docker-compose up -d

# 2. 訪問網頁
# 瀏覽器打開：http://localhost:3000
```

就這麼簡單！✨

---

### 方法二：使用 Docker 命令

```bash
# 1. 構建鏡像
docker build -t amitofu-fortune-telling .

# 2. 運行容器
docker run -d \
  --name amitofu \
  -p 3000:3000 \
  --restart unless-stopped \
  amitofu-fortune-telling

# 3. 訪問網頁
# 瀏覽器打開：http://localhost:3000
```

---

## 🎯 完整部署步驟

### 前置要求

確保已安裝：
- Docker (20.10+)
- Docker Compose (2.0+)

檢查版本：
```bash
docker --version
docker-compose --version
```

### 步驟 1：克隆或下載代碼

```bash
# 如果是從 GitHub 克隆
git clone <your-repo-url>
cd amitofu

# 或者直接在項目目錄下操作
cd /path/to/amitofu
```

### 步驟 2：構建鏡像

```bash
# 使用 docker-compose
docker-compose build

# 或使用 docker 命令
docker build -t amitofu-fortune-telling .
```

### 步驟 3：啟動容器

```bash
# 使用 docker-compose（推薦）
docker-compose up -d

# 或使用 docker 命令
docker run -d \
  --name amitofu \
  -p 3000:3000 \
  --restart unless-stopped \
  amitofu-fortune-telling
```

### 步驟 4：驗證運行

```bash
# 檢查容器狀態
docker ps

# 查看日誌
docker-compose logs -f
# 或
docker logs -f amitofu

# 測試 API
curl http://localhost:3000/
```

---

## 🔧 常用命令

### 啟動和停止

```bash
# 啟動
docker-compose up -d

# 停止
docker-compose down

# 重啟
docker-compose restart

# 停止但保留容器
docker-compose stop

# 啟動已停止的容器
docker-compose start
```

### 查看狀態和日誌

```bash
# 查看容器狀態
docker-compose ps

# 查看實時日誌
docker-compose logs -f

# 查看最近100行日誌
docker-compose logs --tail 100

# 查看特定服務日誌
docker-compose logs fortune-telling
```

### 更新和重建

```bash
# 更新代碼後重建
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 或使用一條命令
docker-compose up -d --build
```

### 清理

```bash
# 停止並刪除容器
docker-compose down

# 停止並刪除容器、網絡、卷
docker-compose down -v

# 刪除鏡像
docker rmi amitofu-fortune-telling

# 清理所有未使用的資源
docker system prune -a
```

---

## 🌐 部署到生產環境

### 雲服務器部署（阿里雲、騰訊雲、AWS等）

#### 1. 準備服務器

```bash
# SSH 登錄服務器
ssh root@your-server-ip

# 安裝 Docker
curl -fsSL https://get.docker.com | sh

# 安裝 Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 啟動 Docker 服務
systemctl start docker
systemctl enable docker
```

#### 2. 上傳代碼

```bash
# 方法1：使用 Git
git clone <your-repo-url>
cd amitofu

# 方法2：使用 SCP
# 在本地執行
scp -r /path/to/amitofu root@your-server-ip:/opt/

# 在服務器上
cd /opt/amitofu
```

#### 3. 啟動服務

```bash
# 構建並啟動
docker-compose up -d

# 查看日誌確認啟動成功
docker-compose logs -f
```

#### 4. 配置防火牆

```bash
# 開放 3000 端口
# Ubuntu/Debian
ufw allow 3000/tcp

# CentOS/RHEL
firewall-cmd --permanent --add-port=3000/tcp
firewall-cmd --reload
```

#### 5. 訪問網站

```
http://your-server-ip:3000
```

---

### 使用 Nginx 反向代理（可選）

#### 1. 安裝 Nginx

```bash
# Ubuntu/Debian
apt update && apt install nginx -y

# CentOS/RHEL
yum install nginx -y
```

#### 2. 配置 Nginx

創建配置文件 `/etc/nginx/conf.d/amitofu.conf`：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 改成你的域名

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 3. 啟動 Nginx

```bash
# 測試配置
nginx -t

# 重啟 Nginx
systemctl restart nginx
systemctl enable nginx
```

現在可以通過域名訪問：`http://your-domain.com`

---

### 使用 HTTPS（可選但推薦）

```bash
# 安裝 Certbot
apt install certbot python3-certbot-nginx -y

# 獲取免費 SSL 證書
certbot --nginx -d your-domain.com

# 自動續期
certbot renew --dry-run
```

現在可以通過 HTTPS 訪問：`https://your-domain.com`

---

## 🔒 安全建議

### 1. 修改默認端口

編輯 `docker-compose.yml`：
```yaml
ports:
  - "8080:3000"  # 改成其他端口
```

### 2. 設置環境變量

創建 `.env` 文件：
```bash
PORT=3000
NODE_ENV=production
```

修改 `docker-compose.yml`：
```yaml
env_file:
  - .env
```

### 3. 限制資源使用

在 `docker-compose.yml` 中添加：
```yaml
services:
  fortune-telling:
    # ... 其他配置
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

---

## 📊 監控和維護

### 查看容器資源使用

```bash
# 實時監控
docker stats

# 查看特定容器
docker stats amitofu
```

### 自動重啟配置

```yaml
# 已在 docker-compose.yml 中配置
restart: unless-stopped
```

重啟策略：
- `no`: 不自動重啟
- `always`: 總是重啟
- `unless-stopped`: 除非手動停止，否則重啟
- `on-failure`: 失敗時重啟

### 健康檢查

容器已配置健康檢查：
```bash
# 查看健康狀態
docker ps
# 或
docker inspect amitofu | grep -A 10 Health
```

---

## 🐛 故障排除

### 容器無法啟動

```bash
# 查看詳細錯誤
docker-compose logs

# 查看容器狀態
docker ps -a

# 嘗試重建
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 端口被占用

```bash
# 查看端口占用
netstat -tulnp | grep 3000
# 或
lsof -i :3000

# 修改端口
# 編輯 docker-compose.yml，改成其他端口
ports:
  - "8080:3000"
```

### 無法訪問網頁

```bash
# 1. 檢查容器是否運行
docker ps

# 2. 檢查防火牆
ufw status
firewall-cmd --list-all

# 3. 測試本地訪問
curl http://localhost:3000

# 4. 查看日誌
docker-compose logs -f
```

### 鏡像構建失敗

```bash
# 清理緩存重建
docker-compose build --no-cache

# 或使用 Docker 命令
docker build --no-cache -t amitofu-fortune-telling .
```

---

## 📝 高級配置

### 多環境部署

創建不同的 compose 文件：

**docker-compose.prod.yml**（生產環境）：
```yaml
version: '3.8'
services:
  fortune-telling:
    image: amitofu-fortune-telling:latest
    environment:
      - NODE_ENV=production
    restart: always
```

**docker-compose.dev.yml**（開發環境）：
```yaml
version: '3.8'
services:
  fortune-telling:
    build: .
    volumes:
      - ./src:/app/src
    environment:
      - NODE_ENV=development
    restart: unless-stopped
```

使用：
```bash
# 生產環境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 開發環境
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### 使用 Docker Swarm（集群部署）

```bash
# 初始化 Swarm
docker swarm init

# 部署服務
docker stack deploy -c docker-compose.yml amitofu

# 查看服務
docker service ls

# 擴展服務
docker service scale amitofu_fortune-telling=3

# 更新服務
docker service update amitofu_fortune-telling

# 刪除服務
docker stack rm amitofu
```

---

## 🎯 快速參考

### 一鍵部署腳本

創建 `deploy.sh`：
```bash
#!/bin/bash
echo "🔮 開始部署阿彌陀佛算命系統..."

# 拉取最新代碼
git pull

# 停止舊容器
docker-compose down

# 構建新鏡像
docker-compose build --no-cache

# 啟動新容器
docker-compose up -d

# 查看狀態
docker-compose ps

echo "✅ 部署完成！"
echo "🌐 訪問：http://localhost:3000"
```

使用：
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🙏 總結

### 最簡單的部署方式

```bash
# 一條命令搞定
docker-compose up -d

# 訪問
http://localhost:3000
```

### 生產環境推薦配置

1. ✅ 使用 docker-compose
2. ✅ 配置 Nginx 反向代理
3. ✅ 啟用 HTTPS
4. ✅ 設置防火牆
5. ✅ 配置自動重啟
6. ✅ 定期備份數據

---

**🎉 完成！現在您的算命系統已經在 Docker 容器中運行了！**

**🙏 阿彌陀佛，願眾生吉祥如意！**
