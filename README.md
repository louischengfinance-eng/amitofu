# 奇門遁甲算命系統 (Qimen Dunjia Divination System)

一個完整的奇門遁甲排盤和解讀系統。

## 功能特點

- 🌟 完整的天干地支系統
- 🔮 八卦（Bagua）系統
- 📊 九宮格局排盤
- 🚪 八門排布（開、休、生、傷、杜、景、死、驚）
- ⭐ 九星排布（天蓬、天芮、天沖、天輔、天禽、天心、天柱、天任、天英）
- 👻 八神排布（值符、騰蛇、太陰、六合、白虎、玄武、九地、九天）
- ⏰ 基於時間的自動排盤

## 安裝

```bash
npm install
npm run build
```

## 使用方法

```typescript
import { QimenDivination } from './src';

// 創建一個基於當前時間的奇門遁甲盤
const divination = new QimenDivination(new Date());
const chart = divination.getChart();

console.log(chart);
```

## 系統組成

### 1. 天干 (Heavenly Stems)
甲、乙、丙、丁、戊、己、庚、辛、壬、癸

### 2. 地支 (Earthly Branches)
子、醜、寅、卯、辰、巳、午、未、申、酉、戌、亥

### 3. 八卦 (Bagua)
坎、坤、震、巽、中、乾、兌、艮、離

### 4. 九宮 (Nine Palaces)
1坎、2坤、3震、4巽、5中、6乾、7兌、8艮、9離

### 5. 八門 (Eight Doors)
開門、休門、生門、傷門、杜門、景門、死門、驚門

### 6. 九星 (Nine Stars)
天蓬、天芮、天沖、天輔、天禽、天心、天柱、天任、天英

### 7. 八神 (Eight Gods)
值符、騰蛇、太陰、六合、白虎、玄武、九地、九天

## 開發

```bash
npm run dev
```

## 測試

```bash
npm test
```

## 授權

MIT License
