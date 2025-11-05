/**
 * 八門系統
 */

import { EightDoor, Palace } from '../types/qimen';

// 八門順序（按順時針排列）
export const EIGHT_DOORS: EightDoor[] = [
  '休門',  // 1宮 坎
  '死門',  // 2宮 坤
  '傷門',  // 3宮 震
  '杜門',  // 4宮 巽
  // 5宮中央無門
  '開門',  // 6宮 乾
  '驚門',  // 7宮 兌
  '生門',  // 8宮 艮
  '景門'   // 9宮 離
];

// 八門固定宮位（原始位置）
export const DOOR_ORIGINAL_PALACES: Record<EightDoor, Palace> = {
  '休門': 1,
  '死門': 2,
  '傷門': 3,
  '杜門': 4,
  '開門': 6,
  '驚門': 7,
  '生門': 8,
  '景門': 9
};

// 八門吉凶
export const DOOR_FORTUNES: Record<EightDoor, '吉' | '凶' | '平'> = {
  '開門': '吉',  // 大吉
  '休門': '吉',  // 上吉
  '生門': '吉',  // 上吉
  '傷門': '凶',  // 小凶
  '杜門': '凶',  // 中凶
  '景門': '平',  // 中平
  '死門': '凶',  // 大凶
  '驚門': '凶'   // 小凶
};

// 八門含義
export const DOOR_MEANINGS: Record<EightDoor, string> = {
  '開門': '開通、開創、事業、工作、升遷',
  '休門': '休息、休養、娛樂、和平、安寧',
  '生門': '生育、生長、生財、創業、求財',
  '傷門': '傷害、官司、疾病、競爭、武力',
  '杜門': '閉塞、杜絕、隱藏、技術、手藝',
  '景門': '文書、考試、學業、名聲、禮儀',
  '死門': '死亡、凶險、絕境、終結、疾病',
  '驚門': '驚恐、意外、口舌、訴訟、變動'
};

/**
 * 獲取八門的吉凶
 */
export function getDoorFortune(door: EightDoor): '吉' | '凶' | '平' {
  return DOOR_FORTUNES[door];
}

/**
 * 獲取八門的原始宮位
 */
export function getDoorOriginalPalace(door: EightDoor): Palace {
  return DOOR_ORIGINAL_PALACES[door];
}

/**
 * 獲取八門索引（0-7）
 */
export function getDoorIndex(door: EightDoor): number {
  return EIGHT_DOORS.indexOf(door);
}

/**
 * 根據索引獲取八門
 */
export function getDoorByIndex(index: number): EightDoor {
  return EIGHT_DOORS[index % 8];
}
