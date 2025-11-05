/**
 * 奇門遁甲系統類型定義
 */

// 天干 (Heavenly Stems)
export type HeavenlyStem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';

// 地支 (Earthly Branches)
export type EarthlyBranch = '子' | '醜' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

// 八卦 (Bagua)
export type Bagua = '坎' | '坤' | '震' | '巽' | '中' | '乾' | '兌' | '艮' | '離';

// 九宮 (Nine Palaces) - 1-9
export type Palace = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// 八門 (Eight Doors)
export type EightDoor = '開門' | '休門' | '生門' | '傷門' | '杜門' | '景門' | '死門' | '驚門';

// 九星 (Nine Stars)
export type NineStar = '天蓬' | '天芮' | '天沖' | '天輔' | '天禽' | '天心' | '天柱' | '天任' | '天英';

// 八神 (Eight Gods)
export type EightGod = '值符' | '騰蛇' | '太陰' | '六合' | '白虎' | '玄武' | '九地' | '九天';

// 陰陽 (Yin-Yang)
export type YinYang = '陽' | '陰';

// 五行 (Five Elements)
export type FiveElement = '金' | '木' | '水' | '火' | '土';

// 節氣 (Solar Terms)
export type SolarTerm =
  | '立春' | '雨水' | '驚蟄' | '春分' | '清明' | '穀雨'
  | '立夏' | '小滿' | '芒種' | '夏至' | '小暑' | '大暑'
  | '立秋' | '處暑' | '白露' | '秋分' | '寒露' | '霜降'
  | '立冬' | '小雪' | '大雪' | '冬至' | '小寒' | '大寒';

// 局數 (Pattern Number)
export interface PatternInfo {
  number: number; // 局數 (1-9)
  type: YinYang; // 陰遁或陽遁
}

// 時辰信息
export interface TimeInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  yearStem: HeavenlyStem;
  yearBranch: EarthlyBranch;
  monthStem: HeavenlyStem;
  monthBranch: EarthlyBranch;
  dayStem: HeavenlyStem;
  dayBranch: EarthlyBranch;
  hourStem: HeavenlyStem;
  hourBranch: EarthlyBranch;
}

// 宮位信息
export interface PalaceInfo {
  palace: Palace;
  bagua: Bagua;
  door: EightDoor;
  star: NineStar;
  god: EightGod;
  stem: HeavenlyStem;
  element: FiveElement;
}

// 奇門遁甲盤
export interface QimenChart {
  timeInfo: TimeInfo;
  pattern: PatternInfo;
  palaces: PalaceInfo[];
  dutyDoor: EightDoor; // 值使門
  dutyStar: NineStar; // 值符星
}
