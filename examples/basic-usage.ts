/**
 * 奇門遁甲系統基本使用示例
 */

import { QimenDivination } from '../src';

// 示例1：使用當前時間進行占卜
console.log('=== 示例1：當前時間占卜 ===\n');
const divination1 = new QimenDivination();
console.log(divination1.formatChart());

// 示例2：指定時間進行占卜
console.log('\n=== 示例2：指定時間占卜 ===\n');
const customDate = new Date(2024, 0, 1, 10, 30); // 2024年1月1日 10:30
const divination2 = new QimenDivination(customDate);
console.log(divination2.formatChart());

// 示例3：獲取特定宮位信息
console.log('\n=== 示例3：查詢特定宮位 ===\n');
const palaceInfo = divination2.getPalaceInfo(1);
if (palaceInfo) {
  console.log(`1宮信息：`);
  console.log(`  八卦：${palaceInfo.bagua}`);
  console.log(`  九星：${palaceInfo.star}`);
  console.log(`  八門：${palaceInfo.door || '無'}`);
  console.log(`  八神：${palaceInfo.god || '無'}`);
  console.log(`  天干：${palaceInfo.stem}`);
  console.log(`  五行：${palaceInfo.element}`);
}

// 示例4：獲取原始數據
console.log('\n=== 示例4：獲取原始JSON數據 ===\n');
const chart = divination2.getChart();
console.log(JSON.stringify(chart, null, 2));
