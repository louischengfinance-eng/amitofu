/**
 * 紫微斗數算命API
 */

import { ZiweiChart } from '../types/ziwei';
import { generateZiweiChart } from '../calculator/ziwei-chart';
import { getTimeInfo } from '../calculator/time-converter';

export class ZiweiDivination {
  private birthDate: Date;
  private gender: '男' | '女';
  private chart: ZiweiChart | null = null;

  constructor(birthDate: Date, gender: '男' | '女' = '男') {
    this.birthDate = birthDate;
    this.gender = gender;
  }

  /**
   * 設置出生時間
   */
  setDate(date: Date): void {
    this.birthDate = date;
    this.chart = null; // 重置命盤
  }

  /**
   * 設置性別
   */
  setGender(gender: '男' | '女'): void {
    this.gender = gender;
    this.chart = null; // 重置命盤
  }

  /**
   * 生成命盤
   */
  generateChart(): ZiweiChart {
    const timeInfo = getTimeInfo(this.birthDate);

    this.chart = generateZiweiChart(
      timeInfo.year,
      timeInfo.month,
      timeInfo.day,
      timeInfo.hour,
      this.gender,
      timeInfo.yearStem,
      timeInfo.yearBranch,
      timeInfo.monthStem,
      timeInfo.monthBranch,
      timeInfo.dayStem,
      timeInfo.dayBranch,
      timeInfo.hourStem,
      timeInfo.hourBranch
    );

    return this.chart;
  }

  /**
   * 獲取命盤（延遲生成）
   */
  getChart(): ZiweiChart {
    if (!this.chart) {
      this.chart = this.generateChart();
    }
    return this.chart;
  }

  /**
   * 獲取特定宮位信息
   */
  getPalaceInfo(palaceName: string) {
    const chart = this.getChart();
    return chart.palaces.find(p => p.palace === palaceName);
  }

  /**
   * 獲取命宮信息
   */
  getMingGongInfo() {
    const chart = this.getChart();
    return chart.palaces[0]; // 命宮始終在第一位
  }

  /**
   * 格式化輸出命盤
   */
  formatChart(): string {
    const chart = this.getChart();
    let output = '\n';
    output += '═══════════════════════════════════════════════════\n';
    output += '                   紫微斗數命盤                    \n';
    output += '═══════════════════════════════════════════════════\n\n';

    // 出生信息
    const birth = chart.birthInfo;
    output += `【出生時間】\n`;
    output += `  陽曆：${birth.year}年${birth.month}月${birth.day}日 ${birth.hour}時\n`;
    output += `  農曆：${birth.yearStem}${birth.yearBranch}年 `;
    output += `${birth.monthStem}${birth.monthBranch}月 `;
    output += `${birth.dayStem}${birth.dayBranch}日 `;
    output += `${birth.hourStem}${birth.hourBranch}時\n`;
    output += `  性別：${birth.gender}  五行局：${chart.fiveElement}四局\n\n`;

    // 命格信息
    output += `【命格分析】\n`;
    output += `  主要命格：${chart.destiny.major}\n`;
    output += `  命格描述：${chart.destiny.description}\n`;
    output += `  命宮位置：${chart.mingGongPosition} (${EARTHLY_BRANCHES_MAP[chart.mingGongPosition]}宮)\n`;
    output += `  身宮位置：${chart.shenGongPosition} (${EARTHLY_BRANCHES_MAP[chart.shenGongPosition]}宮)\n\n`;

    // 十二宮排盤（3x4格式）
    output += `【十二宮排盤】\n\n`;

    // 上排（巳、午、未、申）
    const topRow = [4, 5, 6, 7];
    output += this.formatPalaceRow(chart, topRow);
    output += '─────────┼─────────┼─────────┼─────────\n';

    // 中上排（辰、中央說明、酉）
    output += this.formatMiddleRow(chart);
    output += '─────────┼─────────┼─────────┼─────────\n';

    // 中下排（卯、中央說明、戌）
    output += this.formatMiddleRow2(chart);
    output += '─────────┼─────────┼─────────┼─────────\n';

    // 下排（寅、醜、子、亥）
    const bottomRow = [2, 1, 0, 11];
    output += this.formatPalaceRow(chart, bottomRow);

    output += '\n';

    // 詳細宮位信息
    output += `【宮位詳解】\n\n`;
    for (const palace of chart.palaces) {
      output += `${palace.palace} (${palace.branch}宮 - ${palace.element})\n`;
      output += `  ${palace.description}\n`;

      if (palace.majorStars.length > 0) {
        output += `  主星：${palace.majorStars.map(s => `${s.name}(${s.brightness})`).join('、')}\n`;
      }
      if (palace.luckyStars.length > 0) {
        output += `  吉星：${palace.luckyStars.join('、')}\n`;
      }
      if (palace.unluckyStars.length > 0) {
        output += `  煞星：${palace.unluckyStars.join('、')}\n`;
      }
      output += '\n';
    }

    output += '═══════════════════════════════════════════════════\n';
    return output;
  }

  private formatPalaceRow(chart: ZiweiChart, positions: number[]): string {
    let row = '';
    const lines = [0, 1, 2].map(() => positions.map(() => ''));

    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      const palace = chart.palaces[pos];
      const branch = palace.branch;

      lines[0][i] = this.padString(`${palace.palace}`, 9);

      const stars = palace.majorStars.map(s => s.name).slice(0, 2).join('');
      lines[1][i] = this.padString(stars || branch, 9);

      const lucky = palace.luckyStars.slice(0, 2).join('');
      lines[2][i] = this.padString(lucky, 9);
    }

    for (const line of lines) {
      row += line.join('│') + '\n';
    }

    return row;
  }

  private formatMiddleRow(chart: ZiweiChart): string {
    const left = chart.palaces[3]; // 辰
    const right = chart.palaces[8]; // 酉

    let row = '';
    const lines = [
      [this.padString(`${left.palace}`, 9), this.padString('命盤中央', 9), this.padString('', 9), this.padString(`${right.palace}`, 9)],
      [this.padString(left.majorStars[0]?.name || left.branch, 9), this.padString(chart.destiny.major, 9), this.padString('', 9), this.padString(right.majorStars[0]?.name || right.branch, 9)],
      [this.padString(left.luckyStars[0] || '', 9), this.padString(`${chart.fiveElement}四局`, 9), this.padString('', 9), this.padString(right.luckyStars[0] || '', 9)]
    ];

    for (const line of lines) {
      row += line.join('│') + '\n';
    }

    return row;
  }

  private formatMiddleRow2(chart: ZiweiChart): string {
    const left = chart.palaces[2]; // 卯
    const right = chart.palaces[9]; // 戌

    let row = '';
    const lines = [
      [this.padString(`${left.palace}`, 9), this.padString('', 9), this.padString('', 9), this.padString(`${right.palace}`, 9)],
      [this.padString(left.majorStars[0]?.name || left.branch, 9), this.padString('', 9), this.padString('', 9), this.padString(right.majorStars[0]?.name || right.branch, 9)],
      [this.padString(left.luckyStars[0] || '', 9), this.padString('', 9), this.padString('', 9), this.padString(right.luckyStars[0] || '', 9)]
    ];

    for (const line of lines) {
      row += line.join('│') + '\n';
    }

    return row;
  }

  private padString(str: string, length: number): string {
    const strLen = this.getDisplayLength(str);
    const padding = length - strLen;
    if (padding <= 0) return str.slice(0, length);

    const leftPad = Math.floor(padding / 2);
    const rightPad = padding - leftPad;
    return ' '.repeat(leftPad) + str + ' '.repeat(rightPad);
  }

  private getDisplayLength(str: string): number {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
      len += str.charCodeAt(i) > 255 ? 2 : 1;
    }
    return len;
  }
}

// 地支對應宮位
const EARTHLY_BRANCHES_MAP: Record<number, string> = {
  0: '子', 1: '醜', 2: '寅', 3: '卯',
  4: '辰', 5: '巳', 6: '午', 7: '未',
  8: '申', 9: '酉', 10: '戌', 11: '亥',
  12: '亥'
};
