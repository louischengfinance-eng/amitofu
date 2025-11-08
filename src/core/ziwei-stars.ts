/**
 * 紫微斗數星曜系統
 */

import { ZiweiMajorStar, ZiweiLuckyStar, ZiweiUnluckyStar, StarAttribute } from '../types/ziwei';
import { FiveElement, YinYang } from '../types/qimen';

// 十四主星屬性
export const MAJOR_STAR_ATTRIBUTES: Record<ZiweiMajorStar, StarAttribute> = {
  '紫微': {
    name: '紫微',
    element: '土',
    yinYang: '陰',
    nature: '吉',
    meaning: '帝王之星，主尊貴、領導、權威。為北斗主星，能化解煞星，有統御之能。'
  },
  '天機': {
    name: '天機',
    element: '木',
    yinYang: '陰',
    nature: '平',
    meaning: '智慧之星，主聰明、機巧、謀略。善於策劃，但較勞心勞力。'
  },
  '太陽': {
    name: '太陽',
    element: '火',
    yinYang: '陽',
    nature: '吉',
    meaning: '光明之星，主貴人、名聲、權威。為日之精，照耀萬物，喜晝生。'
  },
  '武曲': {
    name: '武曲',
    element: '金',
    yinYang: '陰',
    nature: '平',
    meaning: '財星，主財富、決斷、剛毅。有財務管理能力，個性剛強。'
  },
  '天同': {
    name: '天同',
    element: '水',
    yinYang: '陽',
    nature: '吉',
    meaning: '福星，主享福、溫和、快樂。性情溫和，喜歡安逸生活。'
  },
  '廉貞': {
    name: '廉貞',
    element: '火',
    yinYang: '陰',
    nature: '平',
    meaning: '桃花殺星，主感情、藝術、變化。具有魅力，但感情波折較多。'
  },
  '天府': {
    name: '天府',
    element: '土',
    yinYang: '陽',
    nature: '吉',
    meaning: '財庫之星，主財富、穩重、保守。財富穩定，為人謹慎。'
  },
  '太陰': {
    name: '太陰',
    element: '水',
    yinYang: '陰',
    nature: '吉',
    meaning: '月之精，主田宅、母親、女性。為夜之精，喜夜生，主財。'
  },
  '貪狼': {
    name: '貪狼',
    element: '水',
    yinYang: '陽',
    nature: '平',
    meaning: '欲望之星，主慾望、才藝、交際。多才多藝，但慾望強烈。'
  },
  '巨門': {
    name: '巨門',
    element: '水',
    yinYang: '陰',
    nature: '凶',
    meaning: '暗曜，主口舌、是非、研究。言辭犀利，易有口舌是非。'
  },
  '天相': {
    name: '天相',
    element: '水',
    yinYang: '陽',
    nature: '吉',
    meaning: '印星，主貴人、服務、助人。為官祿主，善於溝通協調。'
  },
  '天梁': {
    name: '天梁',
    element: '土',
    yinYang: '陽',
    nature: '吉',
    meaning: '蔭星，主長輩、貴人、清高。為父星，有解厄之能。'
  },
  '七殺': {
    name: '七殺',
    element: '金',
    yinYang: '陽',
    nature: '凶',
    meaning: '將星，主殺伐、果斷、孤獨。剛毅果決，但較孤獨。'
  },
  '破軍': {
    name: '破軍',
    element: '水',
    yinYang: '陰',
    nature: '凶',
    meaning: '耗星，主破壞、變動、開創。勇於改變，但較不穩定。'
  }
};

// 六吉星屬性
export const LUCKY_STAR_ATTRIBUTES: Record<ZiweiLuckyStar, StarAttribute> = {
  '文昌': {
    name: '文昌',
    element: '金',
    yinYang: '陽',
    nature: '吉',
    meaning: '科甲之星，主文采、考試、學業。利於讀書考試。'
  },
  '文曲': {
    name: '文曲',
    element: '水',
    yinYang: '陰',
    nature: '吉',
    meaning: '文藝之星，主才藝、口才、文學。具有藝術天賦。'
  },
  '左輔': {
    name: '左輔',
    element: '土',
    yinYang: '陽',
    nature: '吉',
    meaning: '輔佐之星，主助力、貴人、領導。能得他人相助。'
  },
  '右弼': {
    name: '右弼',
    element: '土',
    yinYang: '陰',
    nature: '吉',
    meaning: '輔佐之星，主助力、貴人、協調。能得他人相助。'
  },
  '天魁': {
    name: '天魁',
    element: '火',
    yinYang: '陽',
    nature: '吉',
    meaning: '貴人之星，主白天貴人、男性貴人。能得男性長輩提攜。'
  },
  '天鉞': {
    name: '天鉞',
    element: '火',
    yinYang: '陰',
    nature: '吉',
    meaning: '貴人之星，主夜晚貴人、女性貴人。能得女性長輩提攜。'
  }
};

// 六煞星屬性
export const UNLUCKY_STAR_ATTRIBUTES: Record<ZiweiUnluckyStar, StarAttribute> = {
  '火星': {
    name: '火星',
    element: '火',
    yinYang: '陽',
    nature: '凶',
    meaning: '殺星，主急躁、暴躁、衝動。性情急躁，易生意外。'
  },
  '鈴星': {
    name: '鈴星',
    element: '火',
    yinYang: '陰',
    nature: '凶',
    meaning: '殺星，主陰毒、暗傷、慢性。性情陰沉，易生暗疾。'
  },
  '擎羊': {
    name: '擎羊',
    element: '金',
    yinYang: '陽',
    nature: '凶',
    meaning: '刑星，主刑剋、災禍、急性。性情剛烈，易生刑傷。'
  },
  '陀羅': {
    name: '陀羅',
    element: '金',
    yinYang: '陰',
    nature: '凶',
    meaning: '刑星，主拖延、糾纏、慢性。易生拖延，事情不順。'
  },
  '地空': {
    name: '地空',
    element: '火',
    yinYang: '陽',
    nature: '凶',
    meaning: '空劫之星，主空想、破財、不實。易有空想，財來財去。'
  },
  '地劫': {
    name: '地劫',
    element: '火',
    yinYang: '陰',
    nature: '凶',
    meaning: '空劫之星，主劫財、損失、變動。易有損失，較不穩定。'
  }
};

// 十二宮位順序
export const TWELVE_PALACES = [
  '命宮', '父母宮', '福德宮', '田宅宮',
  '官祿宮', '僕役宮', '遷移宮', '疾厄宮',
  '財帛宮', '子女宮', '夫妻宮', '兄弟宮'
] as const;

// 宮位意義
export const PALACE_MEANINGS: Record<string, string> = {
  '命宮': '主個性、外貌、先天命運、人生觀',
  '兄弟宮': '主兄弟姐妹、合夥人、同事關係',
  '夫妻宮': '主配偶、婚姻、感情狀況',
  '子女宮': '主子女、晚輩、創造力、性生活',
  '財帛宮': '主財運、理財能力、賺錢方式',
  '疾厄宮': '主健康、疾病、意外災難',
  '遷移宮': '主外出、變動、貴人、環境適應',
  '僕役宮': '主朋友、部屬、社交關係',
  '官祿宮': '主事業、工作、社會地位',
  '田宅宮': '主不動產、家庭、生活環境',
  '福德宮': '主精神享受、興趣愛好、福報',
  '父母宮': '主父母、長輩、上司、學業'
};

// 五行局數對照表（根據出生年干支）
export const FIVE_ELEMENT_BUREAU: Record<string, FiveElement> = {
  '甲子': '金', '乙丑': '金', '丙寅': '火', '丁卯': '火',
  '戊辰': '木', '己巳': '木', '庚午': '土', '辛未': '土',
  '壬申': '金', '癸酉': '金', '甲戌': '火', '乙亥': '火',
  '丙子': '水', '丁丑': '水', '戊寅': '土', '己卯': '土',
  '庚辰': '金', '辛巳': '金', '壬午': '木', '癸未': '木',
  '甲申': '水', '乙酉': '水', '丙戌': '土', '丁亥': '土',
  '戊子': '火', '己丑': '火', '庚寅': '木', '辛卯': '木',
  '壬辰': '水', '癸巳': '水', '甲午': '金', '乙未': '金',
  '丙申': '火', '丁酉': '火', '戊戌': '木', '己亥': '木',
  '庚子': '土', '辛丑': '土', '壬寅': '金', '癸卯': '金',
  '甲辰': '火', '乙巳': '火', '丙午': '水', '丁未': '水',
  '戊申': '土', '己酉': '土', '庚戌': '金', '辛亥': '金',
  '壬子': '木', '癸丑': '木', '甲寅': '水', '乙卯': '水',
  '丙辰': '土', '丁巳': '土', '戊午': '火', '己未': '火',
  '庚申': '木', '辛酉': '木', '壬戌': '水', '癸亥': '水'
};
