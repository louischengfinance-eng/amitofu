/**
 * 阿彌陀佛算命系統 - Web API 服務器
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { QimenDivination } = require('./dist/api/divination');
const { ZiweiDivination } = require('./dist/api/ziwei-divination');
const { YijingDivination } = require('./dist/api/yijing-divination');

const PORT = 3000;

// 創建HTTP服務器
const server = http.createServer((req, res) => {
    // CORS設置
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 處理OPTIONS請求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // 路由處理
    if (req.url === '/' || req.url === '/index.html') {
        // 提供首頁
        const filePath = path.join(__dirname, 'public', 'index.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
    } else if (req.url === '/api/qimen' && req.method === 'POST') {
        // 奇門遁甲API
        handleQimen(req, res);
    } else if (req.url === '/api/ziwei' && req.method === 'POST') {
        // 紫微斗數API
        handleZiwei(req, res);
    } else if (req.url === '/api/yijing' && req.method === 'POST') {
        // 易經占卜API
        handleYijing(req, res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// 奇門遁甲處理函數
function handleQimen(req, res) {
    try {
        const qimen = new QimenDivination(new Date());
        const chart = qimen.getChart();

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(chart, null, 2));
    } catch (error) {
        console.error('Qimen error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: error.message }));
    }
}

// 紫微斗數處理函數
function handleZiwei(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            const { year, month, day, hour, gender } = data;

            const birthDate = new Date(year, month - 1, day, hour, 0);
            const ziwei = new ZiweiDivination(birthDate, gender);
            const chart = ziwei.getChart();

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(chart, null, 2));
        } catch (error) {
            console.error('Ziwei error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: error.message }));
        }
    });
}

// 易經占卜處理函數
function handleYijing(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            const { question, method } = data;

            const yijing = new YijingDivination();

            let result;
            if (method === 'coin') {
                result = yijing.coinDivination();
            } else {
                result = yijing.timeDivination(new Date());
            }

            if (question) {
                result.question = question;
            }

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error('Yijing error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: error.message }));
        }
    });
}

// 啟動服務器
server.listen(PORT, () => {
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║     🔮 阿彌陀佛算命系統 Web 服務器已啟動             ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');
    console.log(`📡 服務器地址：http://localhost:${PORT}`);
    console.log(`🌐 網頁訪問：http://localhost:${PORT}/index.html`);
    console.log('\n📚 可用API：');
    console.log(`  POST http://localhost:${PORT}/api/qimen  - 奇門遁甲`);
    console.log(`  POST http://localhost:${PORT}/api/ziwei  - 紫微斗數`);
    console.log(`  POST http://localhost:${PORT}/api/yijing - 易經占卜`);
    console.log('\n💡 使用方法：');
    console.log('  1. 打開瀏覽器訪問：http://localhost:3000');
    console.log('  2. 選擇算命系統');
    console.log('  3. 輸入資料並點擊按鈕');
    console.log('  4. 查看結果\n');
    console.log('⚠️  按 Ctrl+C 停止服務器\n');
    console.log('🙏 阿彌陀佛，願眾生吉祥如意！\n');
});

// 優雅關閉
process.on('SIGINT', () => {
    console.log('\n\n👋 服務器正在關閉...');
    server.close(() => {
        console.log('✅ 服務器已安全關閉');
        process.exit(0);
    });
});
