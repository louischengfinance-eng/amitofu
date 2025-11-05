/**
 * 九星系統
 */

import { NineStar, Palace } from '../types/qimen';

// 九星順序
export const NINE_STARS: NineStar[] = [
  '天蓬',  // 1宮 坎
  '天芮',  // 2宮 坤
  '天沖',  // 3宮 震
  '天輔',  // 4宮 巽
  '天禽',  // 5宮 中
  '天心',  // 6宮 乾
  '天柱',  // 7宮 兌
  '天任',  // 8宮 艮
  '天英'   // 9宮 離
];

// 九星固定宮位（原始位置）
export const STAR_ORIGINAL_PALACES: Record<NineStar, Palace> = {
  '天蓬': 1,
  '天芮': 2,
  '天沖': 3,
  '天輔': 4,
  '天禽': 5,
  '天心': 6,
  '天柱': 7,
  '天任': 8,
  '天英': 9
};

// 九星吉凶
export const STAR_FORTUNES: Record<NineStar, '吉' | '凶' | '平'> = {
  '天蓬': '凶',  // 水星，主盜賊
  '天芮': '凶',  // 病星
  '天沖': '凶',  // 武曲，衝動
  '天輔': '吉',  // 文曲，大吉
  '天禽': '平',  // 中和之星
  '天心': '吉',  // 財星，大吉
  '天柱': '平',  // 破財
  '天任': '吉',  // 富星，中吉
  '天英': '平'   // 火星，虛名
};

// 九星含義
export const STAR_MEANINGS: Record<NineStar, string> = {
  '天蓬': '智慧、盜賊、隱匿、陰謀、謀略',
  '天芮': '疾病、毒害、死亡、農業、土地',
  '天沖': '衝動、勇猛、軍事、武力、爭鬥',
  '天輔': '文化、教育、智慧、輔助、科技',
  '天禽': '中正、權力、土地、中介、調和',
  '天心': '財富、醫療、領導、仁慈、高尚',
  '天柱': '法律、阻礙、破敗、口舌、訴訟',
  '天任': '富貴、財富、信用、穩定、踏實',
  '天英': '文書、虛名、火災、炎熱、婚姻'
};

/**
 * 獲取九星的吉凶
 */
export function getStarFortune(star: NineStar): '吉' | '凶' | '平' {
  return STAR_FORTUNES[star];
}

/**
 * 獲取九星的原始宮位
 */
export function getStarOriginalPalace(star: NineStar): Palace {
  return STAR_ORIGINAL_PALACES[star];
}

/**
 * 獲取九星索引（0-8）
 */
export function getStarIndex(star: NineStar): number {
  return NINE_STARS.indexOf(star);
}

/**
 * 根據索引獲取九星
 */
export function getStarByIndex(index: number): NineStar {
  return NINE_STARS[index % 9];
}
