/**
 * 易經系統類型定義
 */

import { HeavenlyStem, EarthlyBranch, FiveElement, YinYang, Bagua } from './qimen';

// 六十四卦名稱
export type Hexagram =
  | '乾為天' | '坤為地' | '水雷屯' | '山水蒙' | '水天需' | '天水訟' | '地水師' | '水地比'
  | '風天小畜' | '天澤履' | '地天泰' | '天地否' | '天火同人' | '火天大有' | '地山謙' | '雷地豫'
  | '澤雷隨' | '山風蠱' | '地澤臨' | '風地觀' | '火雷噬嗑' | '山火賁' | '山地剝' | '地雷復'
  | '天雷無妄' | '山天大畜' | '山雷頤' | '澤風大過' | '坎為水' | '離為火' | '澤山咸' | '雷風恆'
  | '天山遯' | '雷天大壯' | '火地晉' | '地火明夷' | '風火家人' | '火澤睽' | '水山蹇' | '雷水解'
  | '山澤損' | '風雷益' | '澤天夬' | '天風姤' | '澤地萃' | '地風升' | '澤水困' | '水風井'
  | '澤火革' | '火風鼎' | '震為雷' | '艮為山' | '風山漸' | '雷澤歸妹' | '雷火豐' | '火山旅'
  | '巽為風' | '兌為澤' | '風水渙' | '水澤節' | '風澤中孚' | '雷山小過' | '水火既濟' | '火水未濟';

// 爻位（1-6，從下到上）
export type YaoPosition = 1 | 2 | 3 | 4 | 5 | 6;

// 爻的陰陽
export type YaoType = '陽爻' | '陰爻' | '老陽' | '老陰';

// 卦象信息
export interface HexagramInfo {
  name: Hexagram;
  number: number; // 卦序（1-64）
  upperTrigram: Bagua; // 上卦（外卦）
  lowerTrigram: Bagua; // 下卦（內卦）
  binaryCode: string; // 二進制表示（111111表示乾卦）
  yaos: YaoInfo[]; // 六爻信息（從下到上）
  element: FiveElement; // 五行屬性
  meaning: string; // 卦意
  judgement: string; // 卦辭
  image: string; // 象辭
  fortune: '大吉' | '吉' | '中吉' | '平' | '凶' | '大凶'; // 吉凶
}

// 爻的信息
export interface YaoInfo {
  position: YaoPosition;
  type: YaoType;
  isChanging: boolean; // 是否為變爻
  text: string; // 爻辭
}

// 占卜結果
export interface DivinationResult {
  date: Date;
  question?: string; // 占問事項
  method: '金錢卦' | '時間起卦' | '數字起卦' | '梅花易數'; // 起卦方法
  originalHexagram: HexagramInfo; // 本卦
  changingHexagram?: HexagramInfo; // 變卦
  changingYaos: YaoPosition[]; // 變爻位置
  interpretation: {
    summary: string; // 總體解釋
    fortune: string; // 運勢分析
    advice: string; // 建議
    details: string[]; // 詳細解讀
  };
  timeInfo?: {
    yearStem: HeavenlyStem;
    yearBranch: EarthlyBranch;
    monthStem: HeavenlyStem;
    monthBranch: EarthlyBranch;
    dayStem: HeavenlyStem;
    dayBranch: EarthlyBranch;
    hourStem: HeavenlyStem;
    hourBranch: EarthlyBranch;
  };
}

// 八宮卦序
export interface BagongGroup {
  palace: Bagua; // 所屬宮
  hexagrams: Hexagram[]; // 八個卦
}

// 卦象的五行屬性
export const HEXAGRAM_ELEMENTS: Record<Bagua, FiveElement> = {
  '乾': '金',
  '兌': '金',
  '離': '火',
  '震': '木',
  '巽': '木',
  '坎': '水',
  '艮': '土',
  '坤': '土',
  '中': '土'
};

// 六十四卦序號對照
export const HEXAGRAM_NUMBERS: Record<Hexagram, number> = {
  '乾為天': 1, '坤為地': 2, '水雷屯': 3, '山水蒙': 4,
  '水天需': 5, '天水訟': 6, '地水師': 7, '水地比': 8,
  '風天小畜': 9, '天澤履': 10, '地天泰': 11, '天地否': 12,
  '天火同人': 13, '火天大有': 14, '地山謙': 15, '雷地豫': 16,
  '澤雷隨': 17, '山風蠱': 18, '地澤臨': 19, '風地觀': 20,
  '火雷噬嗑': 21, '山火賁': 22, '山地剝': 23, '地雷復': 24,
  '天雷無妄': 25, '山天大畜': 26, '山雷頤': 27, '澤風大過': 28,
  '坎為水': 29, '離為火': 30, '澤山咸': 31, '雷風恆': 32,
  '天山遯': 33, '雷天大壯': 34, '火地晉': 35, '地火明夷': 36,
  '風火家人': 37, '火澤睽': 38, '水山蹇': 39, '雷水解': 40,
  '山澤損': 41, '風雷益': 42, '澤天夬': 43, '天風姤': 44,
  '澤地萃': 45, '地風升': 46, '澤水困': 47, '水風井': 48,
  '澤火革': 49, '火風鼎': 50, '震為雷': 51, '艮為山': 52,
  '風山漸': 53, '雷澤歸妹': 54, '雷火豐': 55, '火山旅': 56,
  '巽為風': 57, '兌為澤': 58, '風水渙': 59, '水澤節': 60,
  '風澤中孚': 61, '雷山小過': 62, '水火既濟': 63, '火水未濟': 64
};
