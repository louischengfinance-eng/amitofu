/**
 * 阿彌陀佛算命系統
 * Amitofu Fortune Telling System
 * 包含：奇門遁甲、紫微斗數、易經占卜
 */

// ============ 奇門遁甲 API ============
export { QimenDivination } from './api/divination';

// ============ 紫微斗數 API ============
export { ZiweiDivination } from './api/ziwei-divination';

// ============ 易經占卜 API ============
export { YijingDivination } from './api/yijing-divination';

// ============ 類型定義 ============
export * from './types/qimen';
export * from './types/ziwei';
export * from './types/yijing';

// ============ 核心模組 ============
// 天干地支系統（共用）
export * from './core/stems-branches';

// 奇門遁甲核心
export * from './core/bagua';
export * from './core/eight-doors';
export * from './core/nine-stars';
export * from './core/eight-gods';

// 紫微斗數核心
export * from './core/ziwei-stars';

// 易經核心
export * from './core/yijing-hexagrams';

// ============ 計算器 ============
export * from './calculator/time-converter';
export * from './calculator/qimen-chart';
export * from './calculator/ziwei-chart';
export * from './calculator/yijing-divination';

// 命令行工具
if (require.main === module) {
  const { QimenDivination } = require('./api/divination');
  const { ZiweiDivination } = require('./api/ziwei-divination');
  const { YijingDivination } = require('./api/yijing-divination');

  console.log('\n═══════════════════════════════════════════════════');
  console.log('     🔮 阿彌陀佛算命系統 Amitofu v2.0.0');
  console.log('═══════════════════════════════════════════════════\n');

  console.log('📚 支持以下算命系統：');
  console.log('  1. 奇門遁甲 - 天干地支排盤');
  console.log('  2. 紫微斗數 - 命盤分析');
  console.log('  3. 易經占卜 - 六十四卦解析\n');

  // 示範三種算命系統
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('【1. 奇門遁甲】');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const qimen = new QimenDivination();
  console.log(qimen.formatChart());

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('【2. 紫微斗數】');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const ziwei = new ZiweiDivination(new Date('1990-01-01 10:00:00'), '男');
  console.log(ziwei.formatChart());

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('【3. 易經占卜】');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const yijing = new YijingDivination();
  yijing.timeDivination(new Date());
  console.log(yijing.formatResult());

  console.log('\n💡 使用方法：\n');
  console.log('// 奇門遁甲');
  console.log('const qimen = new QimenDivination(new Date());');
  console.log('console.log(qimen.formatChart());\n');

  console.log('// 紫微斗數');
  console.log('const ziwei = new ZiweiDivination(new Date(), "男");');
  console.log('console.log(ziwei.formatChart());\n');

  console.log('// 易經占卜');
  console.log('const yijing = new YijingDivination();');
  console.log('yijing.timeDivination(new Date());');
  console.log('console.log(yijing.formatResult());\n');
}
