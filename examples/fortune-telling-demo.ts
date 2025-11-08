/**
 * 阿彌陀佛算命系統示例
 * 展示如何使用奇門遁甲、紫微斗數、易經占卜三大系統
 */

import { QimenDivination } from '../src/api/divination';
import { ZiweiDivination } from '../src/api/ziwei-divination';
import { YijingDivination } from '../src/api/yijing-divination';

console.log('\n═══════════════════════════════════════════════════');
console.log('     🔮 阿彌陀佛算命系統完整示例');
console.log('═══════════════════════════════════════════════════\n');

// ============================================
// 示例 1: 奇門遁甲算命
// ============================================
console.log('【示例 1：奇門遁甲排盤】\n');
console.log('奇門遁甲是古代帝王之學，用於預測吉凶、選擇時機。\n');

// 使用當前時間排盤
const qimen = new QimenDivination(new Date());
console.log(qimen.formatChart());

// 獲取特定宮位信息
const palace1 = qimen.getPalaceInfo(1);
console.log('\n查詢第1宮信息：');
console.log(`  八卦：${palace1?.bagua}`);
console.log(`  八門：${palace1?.door}`);
console.log(`  九星：${palace1?.star}`);
console.log(`  八神：${palace1?.god}\n`);

// ============================================
// 示例 2: 紫微斗數算命
// ============================================
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('【示例 2：紫微斗數命盤】\n');
console.log('紫微斗數是中國古代最重要的命理學體系之一。\n');

// 設定出生時間和性別
const birthDate = new Date('1990-05-15 14:30:00');
const gender = '男';

const ziwei = new ZiweiDivination(birthDate, gender);
console.log(ziwei.formatChart());

// 獲取命宮信息
const mingGong = ziwei.getMingGongInfo();
console.log('\n命宮詳細信息：');
console.log(`  宮位：${mingGong.palace}`);
console.log(`  地支：${mingGong.branch}`);
console.log(`  主星：${mingGong.majorStars.map(s => s.name).join('、')}`);
console.log(`  吉星：${mingGong.luckyStars.join('、') || '無'}`);
console.log(`  煞星：${mingGong.unluckyStars.join('、') || '無'}\n`);

// 查詢特定宮位
const career = ziwei.getPalaceInfo('官祿宮');
console.log('事業運（官祿宮）：');
console.log(`  ${career?.description}`);
console.log(`  主星：${career?.majorStars.map(s => s.name).join('、') || '無'}\n`);

// ============================================
// 示例 3: 易經占卜
// ============================================
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('【示例 3：易經占卜】\n');
console.log('易經是中華文化的源頭活水，包含六十四卦，用於占問吉凶。\n');

// 方法1：時間起卦（梅花易數）
console.log('◆ 方法1：時間起卦（梅花易數）');
const yijing1 = new YijingDivination();
yijing1.timeDivination(new Date());
console.log(yijing1.formatResult());

// 方法2：金錢卦（擲硬幣）
console.log('\n◆ 方法2：金錢卦（模擬擲硬幣）');
const yijing2 = new YijingDivination();
yijing2.coinDivination();
console.log(yijing2.formatResult());

// 方法3：數字起卦
console.log('\n◆ 方法3：數字起卦');
const yijing3 = new YijingDivination();
yijing3.numberDivination(23, 45, 6); // 上卦數、下卦數、動爻數
console.log(yijing3.formatResult());

// 帶問題的占卜
console.log('\n◆ 帶問題的占卜');
const yijing4 = new YijingDivination();
yijing4.autoDivination('今年事業運如何？');
console.log(yijing4.formatResult());

// 獲取簡要信息
console.log('\n簡要信息：');
console.log(yijing4.getSummary());
console.log('\n建議：');
console.log(yijing4.getAdvice());

// ============================================
// 綜合應用示例
// ============================================
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('【綜合應用：三合一算命分析】\n');
console.log('結合三種算命系統，得出全面分析：\n');

const analysisDate = new Date();

// 1. 奇門遁甲看時機
const qimenAnalysis = new QimenDivination(analysisDate);
const chart = qimenAnalysis.getChart();
console.log(`1. 奇門遁甲：當前時間 ${chart.timeInfo.yearStem}${chart.timeInfo.yearBranch}年 ${chart.timeInfo.monthStem}${chart.timeInfo.monthBranch}月`);
console.log(`   局數：${chart.pattern.type}遁${chart.pattern.number}局`);
console.log(`   值符：${chart.dutyStar}，值使：${chart.dutyDoor}\n`);

// 2. 紫微斗數看命格
const ziweiAnalysis = new ZiweiDivination(new Date('1990-01-01'), '男');
const destiny = ziweiAnalysis.getChart().destiny;
console.log(`2. 紫微斗數：命格 - ${destiny.major}`);
console.log(`   特質：${destiny.description}\n`);

// 3. 易經看當下情況
const yijingAnalysis = new YijingDivination();
yijingAnalysis.timeDivination(analysisDate);
const result = yijingAnalysis.getResult();
console.log(`3. 易經占卜：${result?.originalHexagram.name}`);
console.log(`   吉凶：${result?.originalHexagram.fortune}`);
console.log(`   建議：${result?.interpretation.advice.substring(0, 50)}...\n`);

console.log('═══════════════════════════════════════════════════');
console.log('              示例運行完成！');
console.log('═══════════════════════════════════════════════════\n');

console.log('💡 提示：');
console.log('  - 算命結果僅供參考，請勿過度迷信');
console.log('  - 三種系統各有所長，可以綜合參考');
console.log('  - 奇門遁甲適合擇時，紫微斗數適合看命格，易經適合占問具體事項\n');
