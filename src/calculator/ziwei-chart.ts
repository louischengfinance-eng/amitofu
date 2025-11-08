/**
 * 紫微斗數排盤算法
 */

import { HeavenlyStem, EarthlyBranch } from '../types/qimen';
import { ZiweiChart, ZiweiPalaceInfo, StarInfo, ZiweiMajorStar } from '../types/ziwei';
import { EARTHLY_BRANCHES } from '../core/stems-branches';
import { TWELVE_PALACES, PALACE_MEANINGS, FIVE_ELEMENT_BUREAU, MAJOR_STAR_ATTRIBUTES } from '../core/ziwei-stars';

/**
 * 計算命宮位置
 */
export function calculateMingGong(monthBranch: EarthlyBranch, hourBranch: EarthlyBranch): number {
  const monthIndex = EARTHLY_BRANCHES.indexOf(monthBranch);
  const hourIndex = EARTHLY_BRANCHES.indexOf(hourBranch);

  // 命宮 = 寅 + (月支 - 時支) mod 12
  // 寅為起點（索引2）
  let position = (2 + monthIndex - hourIndex) % 12;
  if (position < 0) position += 12;
  if (position === 0) position = 12;

  return position;
}

/**
 * 計算身宮位置
 */
export function calculateShenGong(monthBranch: EarthlyBranch, hourBranch: EarthlyBranch): number {
  const monthIndex = EARTHLY_BRANCHES.indexOf(monthBranch);
  const hourIndex = EARTHLY_BRANCHES.indexOf(hourBranch);

  // 身宮 = 寅 + (月支 + 時支) mod 12
  let position = (2 + monthIndex + hourIndex) % 12;
  if (position === 0) position = 12;

  return position;
}

/**
 * 計算紫微星位置
 */
export function calculateZiweiPosition(day: number, fiveElementBureau: string): number {
  // 五行局對應的數字
  const bureauNumbers: Record<string, number> = {
    '水': 2, '木': 3, '金': 4, '土': 5, '火': 6
  };

  const bureauNum = bureauNumbers[fiveElementBureau] || 5;

  // 紫微星位置 = (日數 + 五行局數 - 1) / 10 的餘數
  const position = Math.floor((day + bureauNum - 1) / 10);
  let ziweiPos = ((day + bureauNum - 1) % 10);

  // 從寅宮開始數
  if (ziweiPos === 0) ziweiPos = 10;

  // 計算在十二宮中的位置
  const result = (ziweiPos + 1) % 12;
  return result === 0 ? 12 : result;
}

/**
 * 安排十四主星
 */
export function arrangeMajorStars(ziweiPosition: number, mingGongPosition: number): Map<number, ZiweiMajorStar[]> {
  const starMap = new Map<number, ZiweiMajorStar[]>();

  // 初始化
  for (let i = 1; i <= 12; i++) {
    starMap.set(i, []);
  }

  // 紫微星系（順時針）
  const ziweiStars: ZiweiMajorStar[] = ['紫微', '天機', '太陽', '武曲', '天同', '廉貞'];
  for (let i = 0; i < ziweiStars.length; i++) {
    const pos = ((ziweiPosition - 1 + i * 2) % 12) + 1;
    starMap.get(pos)?.push(ziweiStars[i]);
  }

  // 天府星系（逆時針）
  const tianfuPosition = (14 - ziweiPosition) % 12;
  const finalTianfuPos = tianfuPosition === 0 ? 12 : tianfuPosition;

  const tianfuStars: ZiweiMajorStar[] = ['天府', '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍'];
  for (let i = 0; i < tianfuStars.length; i++) {
    let pos = finalTianfuPos - i;
    if (pos <= 0) pos += 12;
    starMap.get(pos)?.push(tianfuStars[i]);
  }

  return starMap;
}

/**
 * 計算星曜亮度
 */
export function calculateBrightness(star: ZiweiMajorStar, position: number): '廟' | '旺' | '得' | '利' | '平' | '不' | '陷' {
  // 簡化版亮度計算
  // 實際應用中需要根據更複雜的規則
  const brightness: ('廟' | '旺' | '得' | '利' | '平' | '不' | '陷')[] = ['廟', '旺', '得', '利', '平', '不', '陷'];
  const index = (position + star.length) % 7;
  return brightness[index];
}

/**
 * 安排六吉星
 */
export function arrangeLuckyStars(yearStem: HeavenlyStem, monthBranch: EarthlyBranch, hourBranch: EarthlyBranch): Map<number, string[]> {
  const luckyStarMap = new Map<number, string[]>();

  // 初始化
  for (let i = 1; i <= 12; i++) {
    luckyStarMap.set(i, []);
  }

  // 簡化版吉星安排
  // 文昌、文曲根據時辰
  const hourIndex = EARTHLY_BRANCHES.indexOf(hourBranch);
  const wenChangPos = ((10 - hourIndex) % 12) + 1;
  const wenQuPos = ((4 + hourIndex) % 12) + 1;

  luckyStarMap.get(wenChangPos)?.push('文昌');
  luckyStarMap.get(wenQuPos)?.push('文曲');

  // 左輔、右弼根據月支
  const monthIndex = EARTHLY_BRANCHES.indexOf(monthBranch);
  const zuofuPos = ((monthIndex + 1) % 12) + 1;
  const youbiPos = ((11 - monthIndex) % 12) + 1;

  luckyStarMap.get(zuofuPos)?.push('左輔');
  luckyStarMap.get(youbiPos)?.push('右弼');

  return luckyStarMap;
}

/**
 * 安排六煞星
 */
export function arrangeUnluckyStars(yearBranch: EarthlyBranch, monthBranch: EarthlyBranch): Map<number, string[]> {
  const unluckyStarMap = new Map<number, string[]>();

  // 初始化
  for (let i = 1; i <= 12; i++) {
    unluckyStarMap.set(i, []);
  }

  // 簡化版煞星安排
  const yearIndex = EARTHLY_BRANCHES.indexOf(yearBranch);
  const monthIndex = EARTHLY_BRANCHES.indexOf(monthBranch);

  // 火星、鈴星
  const fireStarPos = ((yearIndex + monthIndex) % 12) + 1;
  const bellStarPos = ((yearIndex + monthIndex + 6) % 12) + 1;

  unluckyStarMap.get(fireStarPos)?.push('火星');
  unluckyStarMap.get(bellStarPos)?.push('鈴星');

  // 擎羊、陀羅
  const qingyangPos = ((yearIndex + 1) % 12) + 1;
  const tuoluoPos = ((yearIndex - 1 + 12) % 12) + 1;

  unluckyStarMap.get(qingyangPos)?.push('擎羊');
  unluckyStarMap.get(tuoluoPos)?.push('陀羅');

  return unluckyStarMap;
}

/**
 * 生成紫微斗數命盤
 */
export function generateZiweiChart(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender: '男' | '女',
  yearStem: HeavenlyStem,
  yearBranch: EarthlyBranch,
  monthStem: HeavenlyStem,
  monthBranch: EarthlyBranch,
  dayStem: HeavenlyStem,
  dayBranch: EarthlyBranch,
  hourStem: HeavenlyStem,
  hourBranch: EarthlyBranch
): ZiweiChart {
  // 計算命宮和身宮位置
  const mingGongPosition = calculateMingGong(monthBranch, hourBranch);
  const shenGongPosition = calculateShenGong(monthBranch, hourBranch);

  // 計算五行局
  const yearGanzhi = yearStem + yearBranch;
  const fiveElement = FIVE_ELEMENT_BUREAU[yearGanzhi] || '土';

  // 計算紫微星位置
  const ziweiPosition = calculateZiweiPosition(day, fiveElement);

  // 安排主星
  const majorStarMap = arrangeMajorStars(ziweiPosition, mingGongPosition);

  // 安排吉星
  const luckyStarMap = arrangeLuckyStars(yearStem, monthBranch, hourBranch);

  // 安排煞星
  const unluckyStarMap = arrangeUnluckyStars(yearBranch, monthBranch);

  // 創建十二宮位信息
  const palaces: ZiweiPalaceInfo[] = [];

  for (let i = 0; i < 12; i++) {
    const position = i + 1;
    const palaceIndex = (mingGongPosition + i - 1) % 12;
    const palace = TWELVE_PALACES[palaceIndex];
    const branch = EARTHLY_BRANCHES[i];

    const majorStars = majorStarMap.get(position) || [];
    const starInfos: StarInfo[] = majorStars.map(star => ({
      name: star,
      type: 'major' as const,
      brightness: calculateBrightness(star, position)
    }));

    palaces.push({
      palace,
      position,
      branch,
      stem: yearStem, // 簡化處理
      element: MAJOR_STAR_ATTRIBUTES[majorStars[0]]?.element || '土',
      majorStars: starInfos,
      luckyStars: luckyStarMap.get(position) || [],
      unluckyStars: unluckyStarMap.get(position) || [],
      fourTransforms: [],
      description: PALACE_MEANINGS[palace] || ''
    });
  }

  // 分析命格
  const mingGongStars = majorStarMap.get(mingGongPosition) || [];
  const mainStar = mingGongStars[0] || '紫微';
  const starAttr = MAJOR_STAR_ATTRIBUTES[mainStar];

  return {
    birthInfo: {
      year,
      month,
      day,
      hour,
      gender,
      yearStem,
      yearBranch,
      monthStem,
      monthBranch,
      dayStem,
      dayBranch,
      hourStem,
      hourBranch
    },
    mingGongPosition,
    shenGongPosition,
    palaces,
    fiveElement,
    destiny: {
      major: `${mainStar}坐命`,
      description: starAttr?.meaning || '',
      strengths: [`具有${mainStar}星特質`, `${fiveElement}五行局特性`],
      weaknesses: ['需注意煞星影響', '四化變化需留意']
    }
  };
}
