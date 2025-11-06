/**
 * 易經算命API
 */

import { DivinationResult, HexagramInfo } from '../types/yijing';
import { coinDivination, timeDivination, numberDivination, autoDivination } from '../calculator/yijing-divination';

export class YijingDivination {
  private result: DivinationResult | null = null;

  /**
   * 金錢卦占卜（擲硬幣）
   */
  coinDivination(): DivinationResult {
    this.result = coinDivination();
    return this.result;
  }

  /**
   * 時間起卦（梅花易數）
   */
  timeDivination(date: Date = new Date()): DivinationResult {
    this.result = timeDivination(date);
    return this.result;
  }

  /**
   * 數字起卦
   */
  numberDivination(upperNum: number, lowerNum: number, movingYaoNum: number): DivinationResult {
    this.result = numberDivination(upperNum, lowerNum, movingYaoNum);
    return this.result;
  }

  /**
   * 自動起卦（使用當前時間）
   */
  autoDivination(question?: string): DivinationResult {
    this.result = autoDivination(question);
    return this.result;
  }

  /**
   * 獲取占卜結果
   */
  getResult(): DivinationResult | null {
    return this.result;
  }

  /**
   * 格式化輸出占卜結果
   */
  formatResult(): string {
    if (!this.result) {
      return '尚未進行占卜，請先使用起卦方法。';
    }

    const result = this.result;
    let output = '\n';
    output += '═══════════════════════════════════════════════════\n';
    output += '                    易經占卜結果                    \n';
    output += '═══════════════════════════════════════════════════\n\n';

    // 基本信息
    output += `【占卜時間】${result.date.toLocaleString('zh-CN')}\n`;
    output += `【起卦方法】${result.method}\n`;
    if (result.question) {
      output += `【占問事項】${result.question}\n`;
    }
    output += '\n';

    // 本卦
    output += `【本卦】${result.originalHexagram.name}（第${result.originalHexagram.number}卦）\n\n`;
    output += this.formatHexagram(result.originalHexagram);
    output += '\n';

    // 變卦
    if (result.changingHexagram && result.changingYaos.length > 0) {
      output += `【變爻】第 ${result.changingYaos.join('、')} 爻\n\n`;
      output += `【變卦】${result.changingHexagram.name}（第${result.changingHexagram.number}卦）\n\n`;
      output += this.formatHexagram(result.changingHexagram);
      output += '\n';
    }

    // 解釋
    output += '【占卜解析】\n\n';
    output += `${result.interpretation.summary}\n\n`;
    output += `【運勢】\n${result.interpretation.fortune}\n\n`;
    output += `【建議】\n${result.interpretation.advice}\n\n`;

    // 詳細信息
    output += '【詳細資訊】\n';
    for (const detail of result.interpretation.details) {
      output += `  ${detail}\n`;
    }

    output += '\n';
    output += '═══════════════════════════════════════════════════\n';
    return output;
  }

  /**
   * 格式化卦象
   */
  private formatHexagram(hexagram: HexagramInfo): string {
    let output = '';

    // 卦象圖
    output += '  卦象：\n';
    output += '  ┌─────────┐\n';

    // 從上往下顯示六爻
    for (let i = 5; i >= 0; i--) {
      const yao = hexagram.yaos[i];
      const yaoSymbol = yao.type.includes('陽') ? '━━━━━' : '━━ ━━';
      const changingMark = yao.isChanging ? ' ○' : '';
      const positionName = ['初', '二', '三', '四', '五', '上'][i];

      output += `  │ ${yaoSymbol}${changingMark} │ ${yao.type.includes('陽') ? '九' : '六'}${positionName}\n`;
    }

    output += '  └─────────┘\n\n';

    // 卦象信息
    output += `  上卦：${hexagram.upperTrigram}（${hexagram.element}）\n`;
    output += `  下卦：${hexagram.lowerTrigram}\n\n`;

    output += `  【卦意】${hexagram.meaning}\n`;
    output += `  【吉凶】${hexagram.fortune}\n`;
    output += `  【卦辭】${hexagram.judgement}\n`;
    output += `  【象辭】${hexagram.image}\n`;

    return output;
  }

  /**
   * 獲取卦象簡要信息
   */
  getSummary(): string {
    if (!this.result) {
      return '尚未進行占卜';
    }

    let summary = `本卦：${this.result.originalHexagram.name}（${this.result.originalHexagram.fortune}）`;

    if (this.result.changingHexagram) {
      summary += ` → 變卦：${this.result.changingHexagram.name}（${this.result.changingHexagram.fortune}）`;
    }

    return summary;
  }

  /**
   * 獲取占卜建議
   */
  getAdvice(): string {
    if (!this.result) {
      return '請先進行占卜';
    }

    return this.result.interpretation.advice;
  }

  /**
   * 導出占卜記錄（JSON格式）
   */
  exportResult(): string {
    if (!this.result) {
      return '{}';
    }

    return JSON.stringify(this.result, null, 2);
  }
}
