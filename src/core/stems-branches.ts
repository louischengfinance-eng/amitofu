/**
 * 天干地支系統
 */

import { HeavenlyStem, EarthlyBranch, FiveElement, YinYang } from '../types/qimen';

// 十天干
export const HEAVENLY_STEMS: HeavenlyStem[] = [
  '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'
];

// 十二地支
export const EARTHLY_BRANCHES: EarthlyBranch[] = [
  '子', '醜', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'
];

// 天干對應五行
export const STEM_ELEMENTS: Record<HeavenlyStem, FiveElement> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 天干陰陽
export const STEM_YINYANG: Record<HeavenlyStem, YinYang> = {
  '甲': '陽', '乙': '陰',
  '丙': '陽', '丁': '陰',
  '戊': '陽', '己': '陰',
  '庚': '陽', '辛': '陰',
  '壬': '陽', '癸': '陰'
};

// 地支對應五行
export const BRANCH_ELEMENTS: Record<EarthlyBranch, FiveElement> = {
  '子': '水', '醜': '土',
  '寅': '木', '卯': '木',
  '辰': '土', '巳': '火',
  '午': '火', '未': '土',
  '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
};

// 地支陰陽
export const BRANCH_YINYANG: Record<EarthlyBranch, YinYang> = {
  '子': '陽', '醜': '陰',
  '寅': '陽', '卯': '陰',
  '辰': '陽', '巳': '陰',
  '午': '陽', '未': '陰',
  '申': '陽', '酉': '陰',
  '戌': '陽', '亥': '陰'
};

/**
 * 獲取天干索引
 */
export function getStemIndex(stem: HeavenlyStem): number {
  return HEAVENLY_STEMS.indexOf(stem);
}

/**
 * 獲取地支索引
 */
export function getBranchIndex(branch: EarthlyBranch): number {
  return EARTHLY_BRANCHES.indexOf(branch);
}

/**
 * 根據索引獲取天干
 */
export function getStemByIndex(index: number): HeavenlyStem {
  return HEAVENLY_STEMS[index % 10];
}

/**
 * 根據索引獲取地支
 */
export function getBranchByIndex(index: number): EarthlyBranch {
  return EARTHLY_BRANCHES[index % 12];
}

/**
 * 計算六十甲子序號（0-59）
 */
export function getSixtyJiaziIndex(stem: HeavenlyStem, branch: EarthlyBranch): number {
  const stemIdx = getStemIndex(stem);
  const branchIdx = getBranchIndex(branch);

  // 六十甲子循環
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) {
      return i;
    }
  }
  return 0;
}

/**
 * 根據六十甲子序號獲取天干地支
 */
export function getStemBranchByJiaziIndex(index: number): { stem: HeavenlyStem, branch: EarthlyBranch } {
  const normalizedIndex = index % 60;
  return {
    stem: getStemByIndex(normalizedIndex),
    branch: getBranchByIndex(normalizedIndex)
  };
}
