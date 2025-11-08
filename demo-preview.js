/**
 * 完整的算命系統演示
 */
const { QimenDivination } = require('./dist/api/divination');
const { ZiweiDivination } = require('./dist/api/ziwei-divination');
const { YijingDivination } = require('./dist/api/yijing-divination');

console.log('\n╔═══════════════════════════════════════════════════════╗');
console.log('║     🔮 阿彌陀佛算命系統 - 完整功能展示               ║');
console.log('╚═══════════════════════════════════════════════════════╝\n');

// ============================================
// 演示 1: 奇門遁甲 - 查看當前時運
// ============================================
console.log('┌─────────────────────────────────────────────────────┐');
console.log('│  【系統一】奇門遁甲 - 帝王之學，擇時決策            │');
console.log('└─────────────────────────────────────────────────────┘\n');

const qimen = new QimenDivination(new Date());
const qimenChart = qimen.getChart();

console.log('⏰ 當前時間分析：');
console.log('   年：' + qimenChart.timeInfo.yearStem + qimenChart.timeInfo.yearBranch + '年');
console.log('   月：' + qimenChart.timeInfo.monthStem + qimenChart.timeInfo.monthBranch + '月');
console.log('   日：' + qimenChart.timeInfo.dayStem + qimenChart.timeInfo.dayBranch + '日');
console.log('   時：' + qimenChart.timeInfo.hourStem + qimenChart.timeInfo.hourBranch + '時');
console.log('\n🎯 局數：' + qimenChart.pattern.type + '遁 ' + qimenChart.pattern.number + '局');
console.log('⭐ 值符：' + qimenChart.dutyStar + '（主星）');
console.log('🚪 值使：' + qimenChart.dutyDoor + '（主門）\n');

console.log('📊 九宮簡要分析：');
qimenChart.palaces.slice(0, 3).forEach(p => {
  const godName = p.god || '無神';
  console.log('   ' + p.palace + '宮 - ' + p.star + ' ' + p.door + ' (' + godName + ')');
});
console.log('   ... 其他宮位詳見完整排盤\n');

// ============================================
// 演示 2: 紫微斗數 - 命盤分析
// ============================================
console.log('\n┌─────────────────────────────────────────────────────┐');
console.log('│  【系統二】紫微斗數 - 中華第一神數，命理分析        │');
console.log('└─────────────────────────────────────────────────────┘\n');

const birthDate = new Date('1995-08-20 14:30:00');
const ziwei = new ZiweiDivination(birthDate, '女');
const ziweiChart = ziwei.getChart();

console.log('👤 命主資料：');
console.log('   出生：' + birthDate.toLocaleString('zh-CN'));
console.log('   性別：' + ziweiChart.birthInfo.gender);
console.log('   農曆：' + ziweiChart.birthInfo.yearStem + ziweiChart.birthInfo.yearBranch + '年');
console.log('   五行局：' + ziweiChart.fiveElement + '四局\n');

console.log('🌟 命格分析：');
console.log('   ' + ziweiChart.destiny.major);
console.log('   特質：' + ziweiChart.destiny.description + '\n');

const mingGong = ziwei.getMingGongInfo();
console.log('💫 命宮（個性特質）：');
console.log('   主星：' + mingGong.majorStars.map(s => s.name + '(' + s.brightness + ')').join('、'));
if (mingGong.luckyStars.length > 0) {
  console.log('   吉星：' + mingGong.luckyStars.join('、'));
}
if (mingGong.unluckyStars.length > 0) {
  console.log('   煞星：' + mingGong.unluckyStars.join('、'));
}

const career = ziwei.getPalaceInfo('官祿宮');
console.log('\n💼 官祿宮（事業運）：');
console.log('   主星：' + (career.majorStars.map(s => s.name).join('、') || '無主星'));
console.log('   ' + career.description);

const wealth = ziwei.getPalaceInfo('財帛宮');
console.log('\n💰 財帛宮（財運）：');
console.log('   主星：' + (wealth.majorStars.map(s => s.name).join('、') || '無主星'));
console.log('   ' + wealth.description + '\n');

// ============================================
// 演示 3: 易經占卜 - 占問吉凶
// ============================================
console.log('\n┌─────────────────────────────────────────────────────┐');
console.log('│  【系統三】易經占卜 - 群經之首，占問吉凶            │');
console.log('└─────────────────────────────────────────────────────┘\n');

// 方法1：時間起卦
console.log('🎲 方法一：時間起卦（梅花易數）');
const yijing1 = new YijingDivination();
const result1 = yijing1.timeDivination(new Date());
console.log('   本卦：' + result1.originalHexagram.name + '（' + result1.originalHexagram.fortune + '）');
console.log('   卦意：' + result1.originalHexagram.meaning);
if (result1.changingHexagram) {
  console.log('   變卦：' + result1.changingHexagram.name + '（' + result1.changingHexagram.fortune + '）');
}
console.log('   建議：' + result1.interpretation.advice.substring(0, 40) + '...\n');

// 方法2：金錢卦
console.log('🪙 方法二：金錢卦（擲硬幣）');
const yijing2 = new YijingDivination();
const result2 = yijing2.coinDivination();
console.log('   本卦：' + result2.originalHexagram.name + '（' + result2.originalHexagram.fortune + '）');
console.log('   卦辭：' + result2.originalHexagram.judgement);
if (result2.changingYaos.length > 0) {
  console.log('   變爻：第' + result2.changingYaos.join('、') + '爻');
}
console.log();

// 方法3：帶問題占卜
console.log('🤔 方法三：占問具體事項');
const yijing3 = new YijingDivination();
const question = '今年事業發展如何？';
const result3 = yijing3.autoDivination(question);
console.log('   問題：' + question);
console.log('   ' + yijing3.getSummary());
console.log('   解析：' + result3.interpretation.summary + '\n');

// ============================================
// 綜合分析
// ============================================
console.log('\n┌─────────────────────────────────────────────────────┐');
console.log('│  【綜合分析】三合一算命系統                          │');
console.log('└─────────────────────────────────────────────────────┘\n');

console.log('📝 綜合建議：');
console.log('   1️⃣  奇門遁甲：當前' + qimenChart.pattern.type + '遁' + qimenChart.pattern.number + '局，值符' + qimenChart.dutyStar);
console.log('   2️⃣  紫微斗數：' + ziweiChart.destiny.major + '，' + ziweiChart.destiny.description.substring(0, 30) + '...');
console.log('   3️⃣  易經占卜：' + result1.originalHexagram.name + '，' + result1.originalHexagram.meaning + '\n');

console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║  ✅ 系統功能完整，運行正常！                          ║');
console.log('║  📚 可用於：命理分析、擇時決策、占問吉凶             ║');
console.log('║  ⚠️  結果僅供參考，請勿過度迷信                       ║');
console.log('╚═══════════════════════════════════════════════════════╝\n');

console.log('🙏 阿彌陀佛，願眾生吉祥如意！\n');
