/**
 * 紫微斗數系統類型定義
 */

import { HeavenlyStem, EarthlyBranch, FiveElement, YinYang } from './qimen';

// 十二宮位
export type ZiweiPalace =
  | '命宮' | '父母宮' | '福德宮' | '田宅宮'
  | '官祿宮' | '僕役宮' | '遷移宮' | '疾厄宮'
  | '財帛宮' | '子女宮' | '夫妻宮' | '兄弟宮';

// 紫微斗數主星（十四主星）
export type ZiweiMajorStar =
  | '紫微' | '天機' | '太陽' | '武曲' | '天同' | '廉貞' | '天府'
  | '太陰' | '貪狼' | '巨門' | '天相' | '天梁' | '七殺' | '破軍';

// 紫微斗數六吉星
export type ZiweiLuckyStar =
  | '文昌' | '文曲' | '左輔' | '右弼' | '天魁' | '天鉞';

// 紫微斗數六煞星
export type ZiweiUnluckyStar =
  | '火星' | '鈴星' | '擎羊' | '陀羅' | '地空' | '地劫';

// 紫微斗數四化
export type ZiweiFourTransform =
  | '化祿' | '化權' | '化科' | '化忌';

// 星曜類型
export type StarType = 'major' | 'lucky' | 'unlucky' | 'transform';

// 星曜資訊
export interface StarInfo {
  name: ZiweiMajorStar | ZiweiLuckyStar | ZiweiUnluckyStar;
  type: StarType;
  brightness: '廟' | '旺' | '得' | '利' | '平' | '不' | '陷'; // 亮度
  transforms?: ZiweiFourTransform[]; // 四化
}

// 宮位資訊
export interface ZiweiPalaceInfo {
  palace: ZiweiPalace;
  position: number; // 1-12 地支位置
  branch: EarthlyBranch;
  stem: HeavenlyStem;
  element: FiveElement;
  majorStars: StarInfo[]; // 主星
  luckyStars: string[]; // 吉星
  unluckyStars: string[]; // 煞星
  fourTransforms: ZiweiFourTransform[]; // 四化
  description: string; // 宮位意義
}

// 命盤資訊
export interface ZiweiChart {
  birthInfo: {
    year: number;
    month: number;
    day: number;
    hour: number;
    gender: '男' | '女';
    yearStem: HeavenlyStem;
    yearBranch: EarthlyBranch;
    monthStem: HeavenlyStem;
    monthBranch: EarthlyBranch;
    dayStem: HeavenlyStem;
    dayBranch: EarthlyBranch;
    hourStem: HeavenlyStem;
    hourBranch: EarthlyBranch;
  };
  mingGongPosition: number; // 命宮位置（1-12）
  shenGongPosition: number; // 身宮位置（1-12）
  palaces: ZiweiPalaceInfo[]; // 十二宮位
  fiveElement: FiveElement; // 五行局
  destiny: {
    major: string; // 主要命格
    description: string; // 命格描述
    strengths: string[]; // 優勢
    weaknesses: string[]; // 劣勢
  };
}

// 紫微斗數星曜屬性
export interface StarAttribute {
  name: string;
  element: FiveElement;
  yinYang: YinYang;
  nature: '吉' | '凶' | '平';
  meaning: string;
}
