/**
 * 個人專屬算命腳本
 * 修改下面的參數，然後運行：node my-fortune.js
 */

const { QimenDivination } = require('./dist/api/divination');
const { ZiweiDivination } = require('./dist/api/ziwei-divination');
const { YijingDivination } = require('./dist/api/yijing-divination');

console.log('\n🔮 個人專屬算命系統\n');

// ========================================
// 📝 請在這裡修改您的個人資料
// ========================================

// 您的出生資料（紫微斗數用）
const 出生年 = 1990;
const 出生月 = 5;      // 1-12月
const 出生日 = 15;     // 1-31日
const 出生時 = 14;     // 0-23時
const 出生分 = 30;     // 0-59分
const 性別 = '男';     // '男' 或 '女'

// 占卜問題（易經用）
const 我的問題 = '今年事業運如何？';

// ========================================
// 開始算命
// ========================================

console.log('══════════════════════════════════════════\n');

// 1️⃣ 奇門遁甲 - 看當前時運
console.log('【1. 奇門遁甲 - 當前時運】\n');
const qimen = new QimenDivination(new Date());
const qimenChart = qimen.getChart();

console.log('📅 當前時間：');
console.log(`   ${qimenChart.timeInfo.yearStem}${qimenChart.timeInfo.yearBranch}年 ${qimenChart.timeInfo.monthStem}${qimenChart.timeInfo.monthBranch}月 ${qimenChart.timeInfo.dayStem}${qimenChart.timeInfo.dayBranch}日 ${qimenChart.timeInfo.hourStem}${qimenChart.timeInfo.hourBranch}時\n`);

console.log('🎯 時運分析：');
console.log(`   局數：${qimenChart.pattern.type}遁 ${qimenChart.pattern.number}局`);
console.log(`   值符：${qimenChart.dutyStar}（主星）`);
console.log(`   值使：${qimenChart.dutyDoor}（主門）\n`);

// 找出吉門和吉星
const 吉門 = ['開門', '休門', '生門'];
const 吉星 = ['天輔', '天心', '天任'];
const 吉宮 = qimenChart.palaces.filter(p =>
  吉門.includes(p.door) || 吉星.includes(p.star)
);

console.log('✨ 吉利方位：');
吉宮.slice(0, 3).forEach(p => {
  console.log(`   ${p.bagua}方（${p.palace}宮）- ${p.star} ${p.door}`);
});

console.log('\n══════════════════════════════════════════\n');

// 2️⃣ 紫微斗數 - 看命盤
console.log('【2. 紫微斗數 - 您的命盤】\n');

const birthDate = new Date(出生年, 出生月-1, 出生日, 出生時, 出生分);
const ziwei = new ZiweiDivination(birthDate, 性別);
const ziweiChart = ziwei.getChart();

console.log('👤 您的資料：');
console.log(`   出生：${出生年}年${出生月}月${出生日}日 ${出生時}:${出生分}`);
console.log(`   性別：${性別}`);
console.log(`   農曆：${ziweiChart.birthInfo.yearStem}${ziweiChart.birthInfo.yearBranch}年`);
console.log(`   五行局：${ziweiChart.fiveElement}四局\n`);

console.log('🌟 命格：');
console.log(`   ${ziweiChart.destiny.major}`);
console.log(`   ${ziweiChart.destiny.description}\n`);

// 顯示重要宮位
const mingGong = ziwei.getMingGongInfo();
console.log('💫 命宮（性格特質）：');
console.log(`   主星：${mingGong.majorStars.map(s => s.name).join('、') || '無主星'}`);
if (mingGong.luckyStars.length > 0) {
  console.log(`   吉星：${mingGong.luckyStars.join('、')}`);
}
if (mingGong.unluckyStars.length > 0) {
  console.log(`   煞星：${mingGong.unluckyStars.join('、')}`);
}
console.log();

const career = ziwei.getPalaceInfo('官祿宮');
console.log('💼 官祿宮（事業）：');
console.log(`   主星：${career.majorStars.map(s => s.name).join('、') || '無主星'}`);
console.log();

const wealth = ziwei.getPalaceInfo('財帛宮');
console.log('💰 財帛宮（財運）：');
console.log(`   主星：${wealth.majorStars.map(s => s.name).join('、') || '無主星'}`);
console.log();

const marriage = ziwei.getPalaceInfo('夫妻宮');
console.log('💕 夫妻宮（感情）：');
console.log(`   主星：${marriage.majorStars.map(s => s.name).join('、') || '無主星'}`);
console.log();

console.log('══════════════════════════════════════════\n');

// 3️⃣ 易經占卜 - 問事
console.log('【3. 易經占卜 - 您的問題】\n');

const yijing = new YijingDivination();
const result = yijing.autoDivination(我的問題);

console.log(`❓ 問題：${我的問題}\n`);

console.log(`📿 卦象：${result.originalHexagram.name}（${result.originalHexagram.fortune}）`);
console.log(`   ${result.originalHexagram.meaning}\n`);

if (result.changingHexagram) {
  console.log(`🔄 變卦：${result.changingHexagram.name}（${result.changingHexagram.fortune}）`);
  console.log(`   ${result.changingHexagram.meaning}\n`);
}

console.log('📖 解析：');
console.log(`   ${result.interpretation.summary}\n`);

console.log('💡 建議：');
console.log(`   ${result.interpretation.advice}\n`);

console.log('══════════════════════════════════════════\n');

// 綜合建議
console.log('【✨ 綜合建議】\n');
console.log(`1️⃣  當前時運：${qimenChart.pattern.type}遁${qimenChart.pattern.number}局，吉方在${吉宮[0]?.bagua}方`);
console.log(`2️⃣  命格特質：${ziweiChart.destiny.major}`);
console.log(`3️⃣  占卜結果：${result.originalHexagram.name}（${result.originalHexagram.fortune}）\n`);

console.log('⚠️  提醒：結果僅供參考，命運掌握在自己手中！');
console.log('🙏 阿彌陀佛，願您吉祥如意！\n');
