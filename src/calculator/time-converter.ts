/**
 * 時間轉換系統 - 陽曆轉天干地支
 */

import {
  HeavenlyStem,
  EarthlyBranch,
  TimeInfo,
  PatternInfo,
  YinYang
} from '../types/qimen';
import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  getStemByIndex,
  getBranchByIndex
} from '../core/stems-branches';

// 1900年1月1日的基準日（庚子年）
const BASE_YEAR = 1900;
const BASE_YEAR_STEM_INDEX = 6; // 庚
const BASE_YEAR_BRANCH_INDEX = 0; // 子

/**
 * 計算年份的天干地支
 */
export function getYearStemBranch(year: number): { stem: HeavenlyStem, branch: EarthlyBranch } {
  const yearOffset = year - BASE_YEAR;
  const stemIndex = (BASE_YEAR_STEM_INDEX + yearOffset) % 10;
  const branchIndex = (BASE_YEAR_BRANCH_INDEX + yearOffset) % 12;

  return {
    stem: getStemByIndex(stemIndex),
    branch: getBranchByIndex(branchIndex)
  };
}

/**
 * 計算月份的天干地支
 * 月建：正月建寅，二月建卯...（農曆）
 * 簡化版：使用公曆月份
 */
export function getMonthStemBranch(year: number, month: number): { stem: HeavenlyStem, branch: EarthlyBranch } {
  // 月份地支：寅月（正月）開始
  // 公曆1月約對應農曆12月（子月），2月對應1月（寅月）
  // 簡化處理：公曆3月起為寅月
  const branchIndex = (month + 1) % 12; // 簡化版
  const branch = getBranchByIndex(branchIndex);

  // 月干計算：根據年干和月支
  const yearStem = getYearStemBranch(year).stem;
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem);

  // 五虎遁月訣
  const stemIndex = (yearStemIndex * 2 + month) % 10;
  const stem = getStemByIndex(stemIndex);

  return { stem, branch };
}

/**
 * 計算日期的天干地支
 * 使用蔡勒公式的變體
 */
export function getDayStemBranch(year: number, month: number, day: number): { stem: HeavenlyStem, branch: EarthlyBranch } {
  // 計算從基準日到指定日期的天數
  // 簡化版：使用公元元年作為基準
  const baseDate = new Date(1900, 0, 1); // 1900年1月1日是庚子日
  const targetDate = new Date(year, month - 1, day);
  const daysDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  // 1900年1月1日是庚子日（庚=6，子=0）
  const stemIndex = (6 + daysDiff) % 10;
  const branchIndex = (0 + daysDiff) % 12;

  return {
    stem: getStemByIndex(stemIndex),
    branch: getBranchByIndex(branchIndex)
  };
}

/**
 * 計算時辰的天干地支
 */
export function getHourStemBranch(dayStem: HeavenlyStem, hour: number): { stem: HeavenlyStem, branch: EarthlyBranch } {
  // 時辰地支
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
  const branch = getBranchByIndex(hourBranchIndex);

  // 時干計算：五鼠遁日起時
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const stemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;
  const stem = getStemByIndex(stemIndex);

  return { stem, branch };
}

/**
 * 獲取完整的時間信息
 */
export function getTimeInfo(date: Date): TimeInfo {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  const { stem: yearStem, branch: yearBranch } = getYearStemBranch(year);
  const { stem: monthStem, branch: monthBranch } = getMonthStemBranch(year, month);
  const { stem: dayStem, branch: dayBranch } = getDayStemBranch(year, month, day);
  const { stem: hourStem, branch: hourBranch } = getHourStemBranch(dayStem, hour);

  return {
    year,
    month,
    day,
    hour,
    yearStem,
    yearBranch,
    monthStem,
    monthBranch,
    dayStem,
    dayBranch,
    hourStem,
    hourBranch
  };
}

/**
 * 計算局數和陰陽遁
 * 簡化版：根據節氣和時辰
 * 冬至到夏至為陽遁（1-9局），夏至到冬至為陰遁（9-1局）
 */
export function getPattern(timeInfo: TimeInfo): PatternInfo {
  const { month, day, hourBranch } = timeInfo;

  // 簡化判斷：根據月份
  // 冬至約在12月22日，夏至約在6月21日
  let isYangDun: boolean;

  if (month >= 12 || month <= 5) {
    // 冬至到夏至期間，陽遁
    if (month === 12 && day < 22) {
      isYangDun = false; // 冬至前為陰遁
    } else if (month === 6 && day >= 21) {
      isYangDun = false; // 夏至後為陰遁
    } else {
      isYangDun = true;
    }
  } else {
    // 夏至到冬至期間，陰遁
    isYangDun = false;
  }

  // 根據節氣和時辰確定局數（簡化版）
  // 完整版需要根據節氣和三元（上元、中元、下元）
  const branchIndex = EARTHLY_BRANCHES.indexOf(hourBranch);
  const patternNumber = ((branchIndex % 9) + 1) as number;

  return {
    number: patternNumber,
    type: isYangDun ? '陽' : '陰'
  };
}
