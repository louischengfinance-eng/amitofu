/**
 * 八神系統
 */

import { EightGod } from '../types/qimen';

// 八神順序（陽遁順時針，陰遁逆時針）
export const EIGHT_GODS: EightGod[] = [
  '值符',  // 跟隨值符星
  '騰蛇',
  '太陰',
  '六合',
  '白虎',  // 也稱"勾陳"
  '玄武',
  '九地',
  '九天'
];

// 八神吉凶
export const GOD_FORTUNES: Record<EightGod, '吉' | '凶' | '平'> = {
  '值符': '吉',  // 大吉
  '騰蛇': '凶',  // 虛驚、怪異
  '太陰': '吉',  // 陰私、密謀
  '六合': '吉',  // 婚姻、合作
  '白虎': '凶',  // 凶惡、傷亡
  '玄武': '凶',  // 盜賊、欺詐
  '九地': '平',  // 穩定、守成
  '九天': '吉'   // 顯揚、發展
};

// 八神含義
export const GOD_MEANINGS: Record<EightGod, string> = {
  '值符': '貴人、領導、權威、正統、護佑',
  '騰蛇': '虛驚、怪異、纏繞、憂慮、驚恐',
  '太陰': '陰私、密謀、謀劃、暗中、女性',
  '六合': '婚姻、合作、和諧、交易、中介',
  '白虎': '凶惡、傷亡、血光、爭鬥、疾病',
  '玄武': '盜賊、欺詐、失竊、陰謀、不誠',
  '九地': '穩定、守成、低調、土地、隱藏',
  '九天': '顯揚、發展、高遠、天空、飛揚'
};

/**
 * 獲取八神的吉凶
 */
export function getGodFortune(god: EightGod): '吉' | '凶' | '平' {
  return GOD_FORTUNES[god];
}

/**
 * 獲取八神索引（0-7）
 */
export function getGodIndex(god: EightGod): number {
  return EIGHT_GODS.indexOf(god);
}

/**
 * 根據索引獲取八神
 */
export function getGodByIndex(index: number): EightGod {
  return EIGHT_GODS[index % 8];
}
