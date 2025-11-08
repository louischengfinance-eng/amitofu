# 🔮 阿彌陀佛算命系統 (Amitofu Fortune Telling System)

一個完整的中國傳統算命系統，整合了三大核心預測體系：**奇門遁甲**、**紫微斗數**、**易經占卜**。

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 功能特點

### 🌟 三大算命系統

1. **奇門遁甲** - 帝王之學，天干地支排盤
   - 完整的天干地支系統
   - 八卦九宮排盤
   - 八門、九星、八神推算
   - 適合擇時、預測吉凶

2. **紫微斗數** - 中華第一神數
   - 十二宮位命盤
   - 十四主星排布
   - 六吉星、六煞星分析
   - 四化系統（化祿、化權、化科、化忌）
   - 適合分析人生命格、性格特質

3. **易經占卜** - 群經之首
   - 六十四卦完整解析
   - 多種起卦方法（金錢卦、時間起卦、數字起卦）
   - 梅花易數
   - 本卦、變卦推算
   - 適合占問具體事項

## 📦 安裝

### 方法一：Docker 部署（推薦，最簡單）🐳

```bash
# 一鍵部署
docker-compose up -d

# 訪問網頁
瀏覽器打開：http://localhost:3000
```

**優點**：
- ✅ 無需安裝 Node.js
- ✅ 一條命令搞定
- ✅ 環境隔離，不影響系統
- ✅ 隨時啟動/停止

詳見 [Docker部署指南](./DOCKER部署指南.md) 或運行 `./快速部署.sh`

### 方法二：傳統方式安裝

```bash
npm install
npm run build
```

## 🚀 快速開始

### 1. 奇門遁甲

```typescript
import { QimenDivination } from 'amitofu';

// 使用當前時間排盤
const qimen = new QimenDivination(new Date());

// 獲取完整排盤信息
const chart = qimen.getChart();
console.log(qimen.formatChart());

// 查詢特定宮位
const palace = qimen.getPalaceInfo(1);
console.log(`第1宮：${palace.bagua} - ${palace.door} - ${palace.star}`);
```

### 2. 紫微斗數

```typescript
import { ZiweiDivination } from 'amitofu';

// 輸入出生時間和性別
const birthDate = new Date('1990-05-15 14:30:00');
const ziwei = new ZiweiDivination(birthDate, '男');

// 獲取完整命盤
const chart = ziwei.getChart();
console.log(ziwei.formatChart());

// 查詢命宮信息
const mingGong = ziwei.getMingGongInfo();
console.log(`命宮主星：${mingGong.majorStars.map(s => s.name).join('、')}`);

// 查詢特定宮位
const career = ziwei.getPalaceInfo('官祿宮');
console.log(`事業運：${career.description}`);
```

### 3. 易經占卜

```typescript
import { YijingDivination } from 'amitofu';

const yijing = new YijingDivination();

// 方法1：時間起卦（梅花易數）
yijing.timeDivination(new Date());

// 方法2：金錢卦（擲硬幣）
yijing.coinDivination();

// 方法3：數字起卦
yijing.numberDivination(23, 45, 6); // 上卦數、下卦數、動爻數

// 方法4：帶問題的占卜
yijing.autoDivination('今年事業運如何？');

// 顯示結果
console.log(yijing.formatResult());

// 獲取簡要信息
console.log(yijing.getSummary());
console.log(yijing.getAdvice());
```

## 📚 系統組成

### 共用基礎系統

#### 天干 (Heavenly Stems)
甲、乙、丙、丁、戊、己、庚、辛、壬、癸

#### 地支 (Earthly Branches)
子、醜、寅、卯、辰、巳、午、未、申、酉、戌、亥

#### 五行 (Five Elements)
金、木、水、火、土

### 奇門遁甲系統

- **八卦 (Bagua)**：坎、坤、震、巽、中、乾、兌、艮、離
- **九宮 (Nine Palaces)**：1-9宮位
- **八門 (Eight Doors)**：開、休、生、傷、杜、景、死、驚
- **九星 (Nine Stars)**：天蓬、天芮、天沖、天輔、天禽、天心、天柱、天任、天英
- **八神 (Eight Gods)**：值符、騰蛇、太陰、六合、白虎、玄武、九地、九天

### 紫微斗數系統

- **十二宮位**：命宮、父母宮、福德宮、田宅宮、官祿宮、僕役宮、遷移宮、疾厄宮、財帛宮、子女宮、夫妻宮、兄弟宮
- **十四主星**：紫微、天機、太陽、武曲、天同、廉貞、天府、太陰、貪狼、巨門、天相、天梁、七殺、破軍
- **六吉星**：文昌、文曲、左輔、右弼、天魁、天鉞
- **六煞星**：火星、鈴星、擎羊、陀羅、地空、地劫
- **四化**：化祿、化權、化科、化忌

### 易經系統

- **六十四卦**：完整的卦象數據庫
- **八卦**：乾、坤、震、巽、坎、離、艮、兌
- **起卦方法**：金錢卦、時間起卦、數字起卦、梅花易數
- **六爻系統**：初爻至上爻
- **變卦推算**：老陽、老陰變化

## 🛠️ 開發

```bash
# 開發模式
npm run dev

# 編譯
npm run build

# 運行示例
npm start

# 運行完整示例
ts-node examples/fortune-telling-demo.ts
```

## 📖 API 文檔

### QimenDivination (奇門遁甲)

```typescript
class QimenDivination {
  constructor(date?: Date);
  setDate(date: Date): void;
  generateChart(): QimenChart;
  getChart(): QimenChart;
  getPalaceInfo(palace: number): PalaceInfo;
  formatChart(): string;
}
```

### ZiweiDivination (紫微斗數)

```typescript
class ZiweiDivination {
  constructor(birthDate: Date, gender: '男' | '女');
  setDate(date: Date): void;
  setGender(gender: '男' | '女'): void;
  generateChart(): ZiweiChart;
  getChart(): ZiweiChart;
  getPalaceInfo(palaceName: string): ZiweiPalaceInfo;
  getMingGongInfo(): ZiweiPalaceInfo;
  formatChart(): string;
}
```

### YijingDivination (易經占卜)

```typescript
class YijingDivination {
  coinDivination(): DivinationResult;
  timeDivination(date?: Date): DivinationResult;
  numberDivination(upperNum: number, lowerNum: number, movingYaoNum: number): DivinationResult;
  autoDivination(question?: string): DivinationResult;
  getResult(): DivinationResult | null;
  formatResult(): string;
  getSummary(): string;
  getAdvice(): string;
  exportResult(): string;
}
```

## 📁 項目結構

```
amitofu/
├── src/
│   ├── api/                      # API層
│   │   ├── divination.ts         # 奇門遁甲API
│   │   ├── ziwei-divination.ts   # 紫微斗數API
│   │   └── yijing-divination.ts  # 易經占卜API
│   ├── calculator/               # 計算層
│   │   ├── qimen-chart.ts        # 奇門遁甲排盤
│   │   ├── ziwei-chart.ts        # 紫微斗數排盤
│   │   ├── yijing-divination.ts  # 易經起卦
│   │   └── time-converter.ts     # 時間轉換（共用）
│   ├── core/                     # 核心數據
│   │   ├── stems-branches.ts     # 天干地支（共用）
│   │   ├── bagua.ts              # 八卦
│   │   ├── eight-doors.ts        # 八門
│   │   ├── nine-stars.ts         # 九星
│   │   ├── eight-gods.ts         # 八神
│   │   ├── ziwei-stars.ts        # 紫微星曜
│   │   └── yijing-hexagrams.ts   # 易經卦象
│   ├── types/                    # 類型定義
│   │   ├── qimen.ts              # 奇門遁甲類型
│   │   ├── ziwei.ts              # 紫微斗數類型
│   │   └── yijing.ts             # 易經類型
│   └── index.ts                  # 主入口
├── examples/                     # 示例代碼
│   ├── basic-usage.ts
│   └── fortune-telling-demo.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 使用場景

1. **擇時決策**：使用奇門遁甲選擇吉時良辰
2. **命理分析**：使用紫微斗數分析人生命格
3. **占問吉凶**：使用易經占卜具體事項
4. **綜合分析**：結合三種系統得出全面結論

## ⚠️ 免責聲明

本系統僅供學習、研究和娛樂使用。算命結果僅供參考，請勿過度迷信。人生的命運掌握在自己手中，積極進取才是正道。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🙏 致謝

感謝中華傳統文化的智慧結晶，讓我們能夠學習和傳承這些珍貴的知識。

---

**阿彌陀佛** 🙏 願眾生吉祥如意！
