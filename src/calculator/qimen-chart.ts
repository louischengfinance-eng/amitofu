/**
 * 奇門遁甲排盤核心邏輯
 */

import {
  QimenChart,
  PalaceInfo,
  Palace,
  TimeInfo,
  PatternInfo,
  EightDoor,
  NineStar,
  EightGod,
  HeavenlyStem
} from '../types/qimen';
import { PALACE_BAGUAS, getBaguaElement } from '../core/bagua';
import { EIGHT_DOORS } from '../core/eight-doors';
import { NINE_STARS } from '../core/nine-stars';
import { EIGHT_GODS } from '../core/eight-gods';
import { HEAVENLY_STEMS } from '../core/stems-branches';

/**
 * 根據局數和陰陽遁排布九星
 */
function arrangeNineStars(pattern: PatternInfo, timeInfo: TimeInfo): Record<Palace, NineStar> {
  const { number, type } = pattern;
  const arrangement: Record<Palace, NineStar> = {} as Record<Palace, NineStar>;

  // 值符星位置（根據局數）
  const dutyStarPalace = number as Palace;

  // 陽遁順排，陰遁逆排
  const direction = type === '陽' ? 1 : -1;

  // 排布九星（以值符星為起點）
  const starOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9] as Palace[];

  for (let i = 0; i < 9; i++) {
    const palace = starOrder[i];
    const starOffset = (i * direction + dutyStarPalace - 1 + 9) % 9;
    arrangement[palace] = NINE_STARS[starOffset];
  }

  return arrangement;
}

/**
 * 根據值使門排布八門
 */
function arrangeEightDoors(pattern: PatternInfo, timeInfo: TimeInfo): Record<Palace, EightDoor | null> {
  const { number, type } = pattern;
  const arrangement: Record<Palace, EightDoor | null> = {} as Record<Palace, EightDoor | null>;

  // 值使門位置（根據時辰）
  const hourBranchIndex = timeInfo.hourBranch.charCodeAt(0) % 8;
  const dutyDoorIndex = (hourBranchIndex + number - 1) % 8;
  const dutyDoorPalace = ((dutyDoorIndex % 8) + 1) as Palace;

  // 陽遁順排，陰遁逆排
  const direction = type === '陽' ? 1 : -1;

  // 八門排布（跳過5宮）
  const palaceOrder = [1, 2, 3, 4, 6, 7, 8, 9] as Palace[];

  for (let i = 0; i < 8; i++) {
    const palace = palaceOrder[i];
    const doorOffset = (i * direction + dutyDoorIndex + 8) % 8;
    arrangement[palace] = EIGHT_DOORS[doorOffset];
  }

  // 5宮無門
  arrangement[5] = null;

  return arrangement;
}

/**
 * 排布八神
 */
function arrangeEightGods(pattern: PatternInfo, timeInfo: TimeInfo, starArrangement: Record<Palace, NineStar>): Record<Palace, EightGod | null> {
  const { type } = pattern;
  const arrangement: Record<Palace, EightGod | null> = {} as Record<Palace, EightGod | null>;

  // 值符神跟隨值符星
  let dutyGodPalace: Palace = 1;
  for (const [palace, star] of Object.entries(starArrangement)) {
    if (star === '天蓬') {
      dutyGodPalace = parseInt(palace) as Palace;
      break;
    }
  }

  // 陽遁順排，陰遁逆排
  const direction = type === '陽' ? 1 : -1;

  // 八神排布（跳過5宮）
  const palaceOrder = [1, 2, 3, 4, 6, 7, 8, 9] as Palace[];

  for (let i = 0; i < 8; i++) {
    const palace = palaceOrder[i];
    const godOffset = (i * direction + 8) % 8;
    arrangement[palace] = EIGHT_GODS[godOffset];
  }

  // 5宮無神（或放天禽）
  arrangement[5] = null;

  return arrangement;
}

/**
 * 排布天干到九宮
 */
function arrangeStems(pattern: PatternInfo, timeInfo: TimeInfo): Record<Palace, HeavenlyStem> {
  const { number, type } = pattern;
  const arrangement: Record<Palace, HeavenlyStem> = {} as Record<Palace, HeavenlyStem>;

  // 甲子戊隱藏在戊下，不顯示
  // 根據局數排布天干

  // 簡化版：按順序排布十天干到九宮
  const palaceOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9] as Palace[];

  for (let i = 0; i < 9; i++) {
    const palace = palaceOrder[i];
    const stemIndex = (i + number - 1) % 10;
    arrangement[palace] = HEAVENLY_STEMS[stemIndex];
  }

  return arrangement;
}

/**
 * 生成奇門遁甲盤
 */
export function generateQimenChart(timeInfo: TimeInfo, pattern: PatternInfo): QimenChart {
  // 排布九星
  const starArrangement = arrangeNineStars(pattern, timeInfo);

  // 排布八門
  const doorArrangement = arrangeEightDoors(pattern, timeInfo);

  // 排布八神
  const godArrangement = arrangeEightGods(pattern, timeInfo, starArrangement);

  // 排布天干
  const stemArrangement = arrangeStems(pattern, timeInfo);

  // 組合成九宮信息
  const palaces: PalaceInfo[] = [];

  for (let p = 1; p <= 9; p++) {
    const palace = p as Palace;
    const bagua = PALACE_BAGUAS[palace];

    palaces.push({
      palace,
      bagua,
      door: doorArrangement[palace]!,
      star: starArrangement[palace],
      god: godArrangement[palace]!,
      stem: stemArrangement[palace],
      element: getBaguaElement(bagua)
    });
  }

  // 確定值使門和值符星
  const dutyDoor = doorArrangement[pattern.number as Palace]!;
  const dutyStar = starArrangement[pattern.number as Palace];

  return {
    timeInfo,
    pattern,
    palaces,
    dutyDoor,
    dutyStar
  };
}
