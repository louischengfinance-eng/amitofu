/**
 * 奇門遁甲算命系統
 * Qimen Dunjia Divination System
 */

// 導出API
export { QimenDivination } from './api/divination';

// 導出類型
export * from './types/qimen';

// 導出核心模組
export * from './core/stems-branches';
export * from './core/bagua';
export * from './core/eight-doors';
export * from './core/nine-stars';
export * from './core/eight-gods';

// 導出計算器
export * from './calculator/time-converter';
export * from './calculator/qimen-chart';

// 命令行工具
if (require.main === module) {
  const { QimenDivination } = require('./api/divination');

  console.log('\n🔮 奇門遁甲算命系統 v1.0.0\n');

  // 使用當前時間進行占卜
  const divination = new QimenDivination();
  console.log(divination.formatChart());

  console.log('\n💡 使用方法：');
  console.log('  const divination = new QimenDivination(new Date());');
  console.log('  console.log(divination.formatChart());\n');
}
