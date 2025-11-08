# 阿彌陀佛算命系統 - Docker 鏡像
FROM node:20-alpine

# 設置工作目錄
WORKDIR /app

# 設置環境變量
ENV NODE_ENV=production
ENV PORT=3000

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴（包括開發依賴，因為需要編譯TypeScript）
RUN npm install

# 複製所有源代碼
COPY . .

# 編譯 TypeScript
RUN npm run build

# 刪除開發依賴（減小鏡像大小）
RUN npm prune --production

# 創建非root用戶
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# 更改文件所有權
RUN chown -R nodejs:nodejs /app

# 切換到非root用戶
USER nodejs

# 暴露端口
EXPOSE 3000

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 啟動應用
CMD ["node", "server.js"]
