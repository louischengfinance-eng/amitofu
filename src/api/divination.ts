/**
 * 奇門遁甲占卜API
 */

import { QimenChart } from '../types/qimen';
import { getTimeInfo, getPattern } from '../calculator/time-converter';
import { generateQimenChart } from '../calculator/qimen-chart';

/**
 * 奇門遁甲占卜類
 */
export class QimenDivination {
  private date: Date;
  private chart: QimenChart | null = null;

  constructor(date?: Date) {
    this.date = date || new Date();
  }

  /**
   * 生成奇門遁甲盤
   */
  public generateChart(): QimenChart {
    const timeInfo = getTimeInfo(this.date);
    const pattern = getPattern(timeInfo);
    this.chart = generateQimenChart(timeInfo, pattern);
    return this.chart;
  }

  /**
   * 獲取已生成的盤
   */
  public getChart(): QimenChart {
    if (!this.chart) {
      this.generateChart();
    }
    return this.chart!;
  }

  /**
   * 格式化輸出盤面
   */
  public formatChart(): string {
    const chart = this.getChart();
    let output = '\n';

    output += '═══════════════════════════════════════════\n';
    output += '           奇門遁甲排盤結果\n';
    output += '═══════════════════════════════════════════\n\n';

    // 時間信息
    output += `📅 時間：${chart.timeInfo.year}年${chart.timeInfo.month}月${chart.timeInfo.day}日 ${chart.timeInfo.hour}時\n`;
    output += `📆 干支：${chart.timeInfo.yearStem}${chart.timeInfo.yearBranch}年 `;
    output += `${chart.timeInfo.monthStem}${chart.timeInfo.monthBranch}月 `;
    output += `${chart.timeInfo.dayStem}${chart.timeInfo.dayBranch}日 `;
    output += `${chart.timeInfo.hourStem}${chart.timeInfo.hourBranch}時\n`;
    output += `🎯 局數：${chart.pattern.type}遁 ${chart.pattern.number}局\n`;
    output += `⭐ 值符：${chart.dutyStar}\n`;
    output += `🚪 值使：${chart.dutyDoor}\n\n`;

    // 九宮排盤（3x3格式）
    output += '┌─────────────┬─────────────┬─────────────┐\n';

    const rows = [
      [4, 9, 2],  // 上排：巽離坤
      [3, 5, 7],  // 中排：震中兌
      [8, 1, 6]   // 下排：艮坎乾
    ];

    for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
      const row = rows[rowIdx];

      // 每個宮位3行信息
      // 第1行：八神
      output += '│';
      for (const palace of row) {
        const info = chart.palaces.find(p => p.palace === palace)!;
        const god = info.god || '    ';
        output += ` ${god.padEnd(4, ' ')}     │`;
      }
      output += '\n';

      // 第2行：九星 + 八卦
      output += '│';
      for (const palace of row) {
        const info = chart.palaces.find(p => p.palace === palace)!;
        output += ` ${info.star} ${info.bagua} │`;
      }
      output += '\n';

      // 第3行：天干 + 八門
      output += '│';
      for (const palace of row) {
        const info = chart.palaces.find(p => p.palace === palace)!;
        const door = info.door || '    ';
        output += ` ${info.stem}  ${door} │`;
      }
      output += '\n';

      if (rowIdx < rows.length - 1) {
        output += '├─────────────┼─────────────┼─────────────┤\n';
      }
    }

    output += '└─────────────┴─────────────┴─────────────┘\n\n';

    // 宮位詳細信息
    output += '宮位詳細信息：\n';
    output += '─────────────────────────────────────────\n';

    for (const info of chart.palaces) {
      output += `${info.palace}宮 ${info.bagua}  `;
      output += `天干:${info.stem} `;
      output += `九星:${info.star} `;
      output += `八門:${info.door || '無'} `;
      output += `八神:${info.god || '無'} `;
      output += `五行:${info.element}\n`;
    }

    output += '═══════════════════════════════════════════\n';

    return output;
  }

  /**
   * 獲取指定宮位的詳細信息
   */
  public getPalaceInfo(palace: number) {
    const chart = this.getChart();
    return chart.palaces.find(p => p.palace === palace);
  }

  /**
   * 設置新的占卜時間
   */
  public setDate(date: Date): void {
    this.date = date;
    this.chart = null; // 清空舊的盤
  }
}
