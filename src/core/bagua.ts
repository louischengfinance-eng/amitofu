/**
 * 八卦系統
 */

import { Bagua, Palace, FiveElement, YinYang } from '../types/qimen';

// 八卦（含中宮）
export const BAGUAS: Bagua[] = ['坎', '坤', '震', '巽', '中', '乾', '兌', '艮', '離'];

// 八卦對應宮位（洛書九宮）
export const BAGUA_PALACES: Record<Bagua, Palace> = {
  '坎': 1,
  '坤': 2,
  '震': 3,
  '巽': 4,
  '中': 5,
  '乾': 6,
  '兌': 7,
  '艮': 8,
  '離': 9
};

// 宮位對應八卦
export const PALACE_BAGUAS: Record<Palace, Bagua> = {
  1: '坎',
  2: '坤',
  3: '震',
  4: '巽',
  5: '中',
  6: '乾',
  7: '兌',
  8: '艮',
  9: '離'
};

// 八卦對應五行
export const BAGUA_ELEMENTS: Record<Bagua, FiveElement> = {
  '坎': '水',
  '坤': '土',
  '震': '木',
  '巽': '木',
  '中': '土',
  '乾': '金',
  '兌': '金',
  '艮': '土',
  '離': '火'
};

// 八卦陰陽
export const BAGUA_YINYANG: Record<Bagua, YinYang> = {
  '坎': '陽',
  '坤': '陰',
  '震': '陽',
  '巽': '陰',
  '中': '陰',
  '乾': '陽',
  '兌': '陰',
  '艮': '陽',
  '離': '陰'
};

// 八卦方位（後天八卦方位）
export const BAGUA_DIRECTIONS: Record<Bagua, string> = {
  '坎': '北',
  '坤': '西南',
  '震': '東',
  '巽': '東南',
  '中': '中央',
  '乾': '西北',
  '兌': '西',
  '艮': '東北',
  '離': '南'
};

// 八卦含義
export const BAGUA_MEANINGS: Record<Bagua, string> = {
  '坎': '水、險難、智慧',
  '坤': '地、柔順、包容',
  '震': '雷、動、長男',
  '巽': '風、入、長女',
  '中': '中央、樞紐',
  '乾': '天、剛健、父',
  '兌': '澤、悅、少女',
  '艮': '山、止、少男',
  '離': '火、明、中女'
};

/**
 * 根據宮位獲取八卦
 */
export function getBaguaByPalace(palace: Palace): Bagua {
  return PALACE_BAGUAS[palace];
}

/**
 * 根據八卦獲取宮位
 */
export function getPalaceByBagua(bagua: Bagua): Palace {
  return BAGUA_PALACES[bagua];
}

/**
 * 獲取八卦的五行屬性
 */
export function getBaguaElement(bagua: Bagua): FiveElement {
  return BAGUA_ELEMENTS[bagua];
}

/**
 * 獲取八卦的陰陽屬性
 */
export function getBaguaYinYang(bagua: Bagua): YinYang {
  return BAGUA_YINYANG[bagua];
}
