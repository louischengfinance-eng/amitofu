/**
 * 易經起卦算法
 */

import { Bagua } from '../types/qimen';
import { Hexagram, DivinationResult, HexagramInfo, YaoPosition } from '../types/yijing';
import { TRIGRAM_BINARY, getHexagramByBinary, getHexagramInfo } from '../core/yijing-hexagrams';
import { EARTHLY_BRANCHES } from '../core/stems-branches';
import { EarthlyBranch } from '../types/qimen';

/**
 * 金錢卦起卦（擲三枚硬幣六次）
 * 每次擲幣：3個正面=老陽（9），3個反面=老陰（6），2正1反=少陽（7），2反1正=少陰（8）
 */
export function coinDivination(): DivinationResult {
  const yaos: number[] = [];
  const changingYaos: YaoPosition[] = [];

  // 擲六次硬幣（從下往上）
  for (let i = 0; i < 6; i++) {
    const coins = [
      Math.random() > 0.5 ? 3 : 2, // 正面3，反面2
      Math.random() > 0.5 ? 3 : 2,
      Math.random() > 0.5 ? 3 : 2
    ];
    const sum = coins.reduce((a, b) => a + b, 0);

    yaos.push(sum);

    // 老陽（9）或老陰（6）為變爻
    if (sum === 6 || sum === 9) {
      changingYaos.push((i + 1) as YaoPosition);
    }
  }

  return buildDivinationResult(yaos, changingYaos, '金錢卦', new Date());
}

/**
 * 時間起卦（梅花易數）
 * 使用年月日時起卦
 */
export function timeDivination(date: Date): DivinationResult {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  // 上卦 = (年 + 月 + 日) % 8
  const upperNum = (year + month + day) % 8;
  const upperTrigram = getTrigramByNumber(upperNum);

  // 下卦 = (年 + 月 + 日 + 時) % 8
  const lowerNum = (year + month + day + hour) % 8;
  const lowerTrigram = getTrigramByNumber(lowerNum);

  // 動爻 = (年 + 月 + 日 + 時) % 6
  let movingYao = (year + month + day + hour) % 6;
  if (movingYao === 0) movingYao = 6;

  const binaryCode = TRIGRAM_BINARY[upperTrigram] + TRIGRAM_BINARY[lowerTrigram];
  const hexagramName = getHexagramByBinary(binaryCode);

  if (!hexagramName) {
    throw new Error('無法識別卦象');
  }

  const changingYaos: YaoPosition[] = [movingYao as YaoPosition];
  const originalHexagram = getHexagramInfo(hexagramName);

  // 計算變卦
  const changingHexagram = calculateChangingHexagram(originalHexagram, changingYaos);

  return {
    date,
    method: '梅花易數',
    originalHexagram,
    changingHexagram,
    changingYaos,
    interpretation: generateInterpretation(originalHexagram, changingHexagram, changingYaos)
  };
}

/**
 * 數字起卦
 * 輸入兩個數字（或一個數字拆分）
 */
export function numberDivination(upperNum: number, lowerNum: number, movingYaoNum: number): DivinationResult {
  const upperTrigram = getTrigramByNumber(upperNum % 8);
  const lowerTrigram = getTrigramByNumber(lowerNum % 8);

  let movingYao = movingYaoNum % 6;
  if (movingYao === 0) movingYao = 6;

  const binaryCode = TRIGRAM_BINARY[upperTrigram] + TRIGRAM_BINARY[lowerTrigram];
  const hexagramName = getHexagramByBinary(binaryCode);

  if (!hexagramName) {
    throw new Error('無法識別卦象');
  }

  const changingYaos: YaoPosition[] = [movingYao as YaoPosition];
  const originalHexagram = getHexagramInfo(hexagramName);
  const changingHexagram = calculateChangingHexagram(originalHexagram, changingYaos);

  return {
    date: new Date(),
    method: '數字起卦',
    originalHexagram,
    changingHexagram,
    changingYaos,
    interpretation: generateInterpretation(originalHexagram, changingHexagram, changingYaos)
  };
}

/**
 * 根據數字獲取卦象
 */
function getTrigramByNumber(num: number): Bagua {
  const trigrams: Bagua[] = ['坤', '震', '坎', '兌', '艮', '離', '巽', '乾'];
  let index = num % 8;
  if (index === 0) index = 8;
  return trigrams[index - 1];
}

/**
 * 構建占卜結果
 */
function buildDivinationResult(
  yaos: number[],
  changingYaos: YaoPosition[],
  method: '金錢卦' | '時間起卦' | '數字起卦' | '梅花易數',
  date: Date
): DivinationResult {
  // 根據爻數生成二進制碼
  let binaryCode = '';
  for (let i = 5; i >= 0; i--) {
    // 9(老陽)和7(少陽)為陽爻(1)，6(老陰)和8(少陰)為陰爻(0)
    binaryCode += (yaos[i] === 9 || yaos[i] === 7) ? '1' : '0';
  }

  const hexagramName = getHexagramByBinary(binaryCode);
  if (!hexagramName) {
    throw new Error('無法識別卦象');
  }

  const originalHexagram = getHexagramInfo(hexagramName);
  let changingHexagram: HexagramInfo | undefined = undefined;

  // 如果有變爻，計算變卦
  if (changingYaos.length > 0) {
    changingHexagram = calculateChangingHexagram(originalHexagram, changingYaos);
  }

  return {
    date,
    method,
    originalHexagram,
    changingHexagram,
    changingYaos,
    interpretation: generateInterpretation(originalHexagram, changingHexagram, changingYaos)
  };
}

/**
 * 計算變卦
 */
function calculateChangingHexagram(original: HexagramInfo, changingYaos: YaoPosition[]): HexagramInfo {
  let newBinaryCode = original.binaryCode;

  // 反轉變爻
  for (const yaoPos of changingYaos) {
    const index = 6 - yaoPos; // 轉換為二進制碼的索引
    const bit = newBinaryCode[index];
    const newBit = bit === '1' ? '0' : '1';
    newBinaryCode = newBinaryCode.substring(0, index) + newBit + newBinaryCode.substring(index + 1);
  }

  const newHexagramName = getHexagramByBinary(newBinaryCode);
  if (!newHexagramName) {
    return original; // 如果找不到，返回原卦
  }

  return getHexagramInfo(newHexagramName);
}

/**
 * 生成解釋
 */
function generateInterpretation(
  original: HexagramInfo,
  changing?: HexagramInfo,
  changingYaos?: YaoPosition[]
): DivinationResult['interpretation'] {
  const hasChanging = changing && changingYaos && changingYaos.length > 0;

  let summary = `本卦為【${original.name}】`;
  if (hasChanging) {
    summary += `，變卦為【${changing!.name}】`;
  }
  summary += `。${original.meaning}`;

  let fortune = `本卦吉凶：${original.fortune}。${original.judgement}`;
  if (hasChanging) {
    fortune += ` 變卦吉凶：${changing!.fortune}。當前情況會發生變化，需要注意${changing!.meaning}`;
  }

  let advice = original.image;
  if (hasChanging) {
    advice += ` 變化之後：${changing!.image}`;
  }

  const details: string[] = [
    `【卦象】${original.name}`,
    `【卦意】${original.meaning}`,
    `【卦辭】${original.judgement}`,
    `【象辭】${original.image}`,
    `【上卦】${original.upperTrigram}卦（${original.element}）`,
    `【下卦】${original.lowerTrigram}卦`
  ];

  if (hasChanging && changingYaos) {
    details.push(`【變爻】第${changingYaos.join('、')}爻`);
    details.push(`【變卦】${changing!.name}`);
    details.push(`【變卦意】${changing!.meaning}`);
  }

  return {
    summary,
    fortune,
    advice,
    details
  };
}

/**
 * 根據問題自動選擇起卦方法
 */
export function autoDivination(question?: string): DivinationResult {
  // 默認使用時間起卦
  const result = timeDivination(new Date());
  if (question) {
    result.question = question;
  }
  return result;
}
