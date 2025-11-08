#!/bin/bash

echo "╔═══════════════════════════════════════════════════════╗"
echo "║     🔮 阿彌陀佛算命系統 - Docker 快速部署            ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# 檢查 Docker 是否安裝
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安裝！"
    echo ""
    echo "請先安裝 Docker："
    echo "  Ubuntu/Debian: curl -fsSL https://get.docker.com | sh"
    echo "  或訪問: https://docs.docker.com/get-docker/"
    exit 1
fi

# 檢查 Docker Compose 是否安裝
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安裝！"
    echo ""
    echo "請先安裝 Docker Compose："
    echo "  curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose"
    echo "  chmod +x /usr/local/bin/docker-compose"
    exit 1
fi

echo "✅ Docker 環境檢查通過"
echo ""

# 停止舊容器（如果存在）
echo "📦 停止舊容器..."
docker-compose down 2>/dev/null

# 構建鏡像
echo "🔨 構建 Docker 鏡像..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ 構建失敗！請檢查錯誤信息"
    exit 1
fi

# 啟動容器
echo "🚀 啟動容器..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ 啟動失敗！請檢查錯誤信息"
    exit 1
fi

# 等待服務啟動
echo "⏳ 等待服務啟動..."
sleep 5

# 檢查容器狀態
echo ""
echo "📊 容器狀態："
docker-compose ps

# 測試服務
echo ""
echo "🧪 測試服務..."
if curl -s http://localhost:3000/ > /dev/null; then
    echo "✅ 服務運行正常！"
    echo ""
    echo "╔═══════════════════════════════════════════════════════╗"
    echo "║              🎉 部署成功！                            ║"
    echo "╚═══════════════════════════════════════════════════════╝"
    echo ""
    echo "🌐 訪問地址："
    echo "   http://localhost:3000"
    echo ""
    echo "📚 查看日誌："
    echo "   docker-compose logs -f"
    echo ""
    echo "⏹️  停止服務："
    echo "   docker-compose down"
    echo ""
    echo "🙏 阿彌陀佛，願眾生吉祥如意！"
else
    echo "⚠️  服務可能還在啟動中，請稍後訪問："
    echo "   http://localhost:3000"
    echo ""
    echo "📋 查看日誌："
    echo "   docker-compose logs -f"
fi

echo ""
