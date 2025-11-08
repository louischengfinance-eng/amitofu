/**
 * 易經六十四卦系統
 */

import { Bagua } from '../types/qimen';
import { Hexagram, HexagramInfo, YaoInfo, HEXAGRAM_ELEMENTS } from '../types/yijing';

// 八卦二進制表示（111為陽爻，000為陰爻）
export const TRIGRAM_BINARY: Record<Bagua, string> = {
  '乾': '111', // ☰
  '兌': '011', // ☱
  '離': '101', // ☲
  '震': '001', // ☳
  '巽': '110', // ☴
  '坎': '010', // ☵
  '艮': '100', // ☶
  '坤': '000', // ☷
  '中': '111'  // 特殊情況
};

// 六十四卦完整數據庫
export const HEXAGRAM_DATABASE: Record<Hexagram, Omit<HexagramInfo, 'yaos'>> = {
  '乾為天': {
    name: '乾為天',
    number: 1,
    upperTrigram: '乾',
    lowerTrigram: '乾',
    binaryCode: '111111',
    element: '金',
    meaning: '剛健中正，自強不息',
    judgement: '元亨利貞。乾，元亨利貞。',
    image: '天行健，君子以自強不息。',
    fortune: '大吉'
  },
  '坤為地': {
    name: '坤為地',
    number: 2,
    upperTrigram: '坤',
    lowerTrigram: '坤',
    binaryCode: '000000',
    element: '土',
    meaning: '柔順承載，厚德載物',
    judgement: '元亨，利牝馬之貞。',
    image: '地勢坤，君子以厚德載物。',
    fortune: '吉'
  },
  '水雷屯': {
    name: '水雷屯',
    number: 3,
    upperTrigram: '坎',
    lowerTrigram: '震',
    binaryCode: '010001',
    element: '水',
    meaning: '始生艱難，宜守不宜進',
    judgement: '元亨利貞，勿用有攸往，利建侯。',
    image: '雲雷屯，君子以經綸。',
    fortune: '平'
  },
  '山水蒙': {
    name: '山水蒙',
    number: 4,
    upperTrigram: '艮',
    lowerTrigram: '坎',
    binaryCode: '100010',
    element: '水',
    meaning: '啟蒙教育，匪我求童蒙',
    judgement: '亨。匪我求童蒙，童蒙求我。',
    image: '山下出泉，蒙。君子以果行育德。',
    fortune: '中吉'
  },
  '水天需': {
    name: '水天需',
    number: 5,
    upperTrigram: '坎',
    lowerTrigram: '乾',
    binaryCode: '010111',
    element: '水',
    meaning: '等待時機，需時而動',
    judgement: '有孚，光亨，貞吉，利涉大川。',
    image: '雲上於天，需。君子以飲食宴樂。',
    fortune: '吉'
  },
  '天水訟': {
    name: '天水訟',
    number: 6,
    upperTrigram: '乾',
    lowerTrigram: '坎',
    binaryCode: '111010',
    element: '金',
    meaning: '爭訟不利，宜和解',
    judgement: '有孚窒惕，中吉，終凶。',
    image: '天與水違行，訟。君子以作事謀始。',
    fortune: '凶'
  },
  '地水師': {
    name: '地水師',
    number: 7,
    upperTrigram: '坤',
    lowerTrigram: '坎',
    binaryCode: '000010',
    element: '土',
    meaning: '用兵之道，以正治國',
    judgement: '貞，丈人吉，無咎。',
    image: '地中有水，師。君子以容民畜眾。',
    fortune: '中吉'
  },
  '水地比': {
    name: '水地比',
    number: 8,
    upperTrigram: '坎',
    lowerTrigram: '坤',
    binaryCode: '010000',
    element: '水',
    meaning: '親比輔助，吉祥和睦',
    judgement: '吉。原筮，元永貞，無咎。',
    image: '地上有水，比。先王以建萬國，親諸侯。',
    fortune: '吉'
  },
  '風天小畜': {
    name: '風天小畜',
    number: 9,
    upperTrigram: '巽',
    lowerTrigram: '乾',
    binaryCode: '110111',
    element: '木',
    meaning: '小有積蓄，密雲不雨',
    judgement: '亨。密雲不雨，自我西郊。',
    image: '風行天上，小畜。君子以懿文德。',
    fortune: '中吉'
  },
  '天澤履': {
    name: '天澤履',
    number: 10,
    upperTrigram: '乾',
    lowerTrigram: '兌',
    binaryCode: '111011',
    element: '金',
    meaning: '履行正道，如履虎尾',
    judgement: '履虎尾，不咥人，亨。',
    image: '上天下澤，履。君子以辨上下，定民志。',
    fortune: '吉'
  },
  '地天泰': {
    name: '地天泰',
    number: 11,
    upperTrigram: '坤',
    lowerTrigram: '乾',
    binaryCode: '000111',
    element: '土',
    meaning: '天地交泰，通達順暢',
    judgement: '小往大來，吉亨。',
    image: '天地交，泰。后以財成天地之道，輔相天地之宜，以左右民。',
    fortune: '大吉'
  },
  '天地否': {
    name: '天地否',
    number: 12,
    upperTrigram: '乾',
    lowerTrigram: '坤',
    binaryCode: '111000',
    element: '金',
    meaning: '天地不交，閉塞不通',
    judgement: '否之匪人，不利君子貞，大往小來。',
    image: '天地不交，否。君子以儉德辟難，不可榮以祿。',
    fortune: '凶'
  },
  '天火同人': {
    name: '天火同人',
    number: 13,
    upperTrigram: '乾',
    lowerTrigram: '離',
    binaryCode: '111101',
    element: '金',
    meaning: '上下同心，團結和諧',
    judgement: '同人于野，亨。利涉大川，利君子貞。',
    image: '天與火，同人。君子以類族辨物。',
    fortune: '吉'
  },
  '火天大有': {
    name: '火天大有',
    number: 14,
    upperTrigram: '離',
    lowerTrigram: '乾',
    binaryCode: '101111',
    element: '火',
    meaning: '日中天盛，豐收富有',
    judgement: '元亨。',
    image: '火在天上，大有。君子以遏惡揚善，順天休命。',
    fortune: '大吉'
  },
  '地山謙': {
    name: '地山謙',
    number: 15,
    upperTrigram: '坤',
    lowerTrigram: '艮',
    binaryCode: '000100',
    element: '土',
    meaning: '謙虛謹慎，獲得吉祥',
    judgement: '亨，君子有終。',
    image: '地中有山，謙。君子以裒多益寡，稱物平施。',
    fortune: '吉'
  },
  '雷地豫': {
    name: '雷地豫',
    number: 16,
    upperTrigram: '震',
    lowerTrigram: '坤',
    binaryCode: '001000',
    element: '木',
    meaning: '順應自然，安樂和悅',
    judgement: '利建侯行師。',
    image: '雷出地奮，豫。先王以作樂崇德，殷薦之上帝，以配祖考。',
    fortune: '吉'
  },

  // 其他卦象（簡化版）
  '澤雷隨': { name: '澤雷隨', number: 17, upperTrigram: '兌', lowerTrigram: '震', binaryCode: '011001', element: '金', meaning: '隨機應變，順勢而為', judgement: '元亨利貞，無咎。', image: '澤中有雷，隨。', fortune: '吉' },
  '山風蠱': { name: '山風蠱', number: 18, upperTrigram: '艮', lowerTrigram: '巽', binaryCode: '100110', element: '土', meaning: '撥亂反正，整飭弊端', judgement: '元亨，利涉大川。', image: '山下有風，蠱。', fortune: '中吉' },
  '地澤臨': { name: '地澤臨', number: 19, upperTrigram: '坤', lowerTrigram: '兌', binaryCode: '000011', element: '土', meaning: '以上臨下，君臨天下', judgement: '元亨利貞。', image: '地上有澤，臨。', fortune: '吉' },
  '風地觀': { name: '風地觀', number: 20, upperTrigram: '巽', lowerTrigram: '坤', binaryCode: '110000', element: '木', meaning: '觀察省思，慎重行事', judgement: '盥而不薦，有孚顒若。', image: '風行地上，觀。', fortune: '中吉' },
  '火雷噬嗑': { name: '火雷噬嗑', number: 21, upperTrigram: '離', lowerTrigram: '震', binaryCode: '101001', element: '火', meaning: '剛柔相濟，執法公正', judgement: '亨，利用獄。', image: '雷電噬嗑。', fortune: '吉' },
  '山火賁': { name: '山火賁', number: 22, upperTrigram: '艮', lowerTrigram: '離', binaryCode: '100101', element: '土', meaning: '文飾修養，外表光彩', judgement: '亨，小利有攸往。', image: '山下有火，賁。', fortune: '中吉' },
  '山地剝': { name: '山地剝', number: 23, upperTrigram: '艮', lowerTrigram: '坤', binaryCode: '100000', element: '土', meaning: '剝落衰退，宜靜不宜動', judgement: '不利有攸往。', image: '山附於地，剝。', fortune: '凶' },
  '地雷復': { name: '地雷復', number: 24, upperTrigram: '坤', lowerTrigram: '震', binaryCode: '000001', element: '土', meaning: '陽氣復返，萬物更新', judgement: '亨。出入無疾，朋來無咎。', image: '雷在地中，復。', fortune: '吉' },
  '天雷無妄': { name: '天雷無妄', number: 25, upperTrigram: '乾', lowerTrigram: '震', binaryCode: '111001', element: '金', meaning: '順應自然，不妄為', judgement: '元亨利貞。', image: '天下雷行，無妄。', fortune: '吉' },
  '山天大畜': { name: '山天大畜', number: 26, upperTrigram: '艮', lowerTrigram: '乾', binaryCode: '100111', element: '土', meaning: '積蓄實力，厚積薄發', judgement: '利貞，不家食吉。', image: '天在山中，大畜。', fortune: '吉' },
  '山雷頤': { name: '山雷頤', number: 27, upperTrigram: '艮', lowerTrigram: '震', binaryCode: '100001', element: '土', meaning: '養生之道，謹慎飲食', judgement: '貞吉。觀頤，自求口實。', image: '山下有雷，頤。', fortune: '中吉' },
  '澤風大過': { name: '澤風大過', number: 28, upperTrigram: '兌', lowerTrigram: '巽', binaryCode: '011110', element: '金', meaning: '非常時期，需果斷處理', judgement: '棟撓，利有攸往，亨。', image: '澤滅木，大過。', fortune: '平' },
  '坎為水': { name: '坎為水', number: 29, upperTrigram: '坎', lowerTrigram: '坎', binaryCode: '010010', element: '水', meaning: '險難重重，誠信渡劫', judgement: '有孚，維心亨，行有尚。', image: '水洊至，習坎。', fortune: '凶' },
  '離為火': { name: '離為火', number: 30, upperTrigram: '離', lowerTrigram: '離', binaryCode: '101101', element: '火', meaning: '光明照耀，文明昌盛', judgement: '利貞，亨。畜牝牛，吉。', image: '明兩作，離。', fortune: '吉' },

  // 繼續其他32個卦（為簡潔，使用簡化版）
  '澤山咸': { name: '澤山咸', number: 31, upperTrigram: '兌', lowerTrigram: '艮', binaryCode: '011100', element: '金', meaning: '感應和合，男女相感', judgement: '亨，利貞，取女吉。', image: '山上有澤，咸。', fortune: '吉' },
  '雷風恆': { name: '雷風恆', number: 32, upperTrigram: '震', lowerTrigram: '巽', binaryCode: '001110', element: '木', meaning: '持之以恆，長久不變', judgement: '亨，無咎，利貞。', image: '雷風，恆。', fortune: '吉' },
  '天山遯': { name: '天山遯', number: 33, upperTrigram: '乾', lowerTrigram: '艮', binaryCode: '111100', element: '金', meaning: '君子遠避，退隱待時', judgement: '亨，小利貞。', image: '天下有山，遯。', fortune: '平' },
  '雷天大壯': { name: '雷天大壯', number: 34, upperTrigram: '震', lowerTrigram: '乾', binaryCode: '001111', element: '木', meaning: '陽剛強盛，大展宏圖', judgement: '利貞。', image: '雷在天上，大壯。', fortune: '吉' },
  '火地晉': { name: '火地晉', number: 35, upperTrigram: '離', lowerTrigram: '坤', binaryCode: '101000', element: '火', meaning: '光明上進，晉升發展', judgement: '康侯用錫馬蕃庶，晝日三接。', image: '明出地上，晉。', fortune: '吉' },
  '地火明夷': { name: '地火明夷', number: 36, upperTrigram: '坤', lowerTrigram: '離', binaryCode: '000101', element: '土', meaning: '光明受傷，艱難困頓', judgement: '利艱貞。', image: '明入地中，明夷。', fortune: '凶' },
  '風火家人': { name: '風火家人', number: 37, upperTrigram: '巽', lowerTrigram: '離', binaryCode: '110101', element: '木', meaning: '家道興隆，治家有道', judgement: '利女貞。', image: '風自火出，家人。', fortune: '吉' },
  '火澤睽': { name: '火澤睽', number: 38, upperTrigram: '離', lowerTrigram: '兌', binaryCode: '101011', element: '火', meaning: '乖違背離，事多不順', judgement: '小事吉。', image: '上火下澤，睽。', fortune: '平' },
  '水山蹇': { name: '水山蹇', number: 39, upperTrigram: '坎', lowerTrigram: '艮', binaryCode: '010100', element: '水', meaning: '艱難險阻，進退維谷', judgement: '利西南，不利東北。', image: '山上有水，蹇。', fortune: '凶' },
  '雷水解': { name: '雷水解', number: 40, upperTrigram: '震', lowerTrigram: '坎', binaryCode: '001010', element: '木', meaning: '化險為夷，解除困難', judgement: '利西南，無所往，其來復吉。', image: '雷雨作，解。', fortune: '吉' },
  '山澤損': { name: '山澤損', number: 41, upperTrigram: '艮', lowerTrigram: '兌', binaryCode: '100011', element: '土', meaning: '損己利人，損下益上', judgement: '有孚，元吉，無咎。', image: '山下有澤，損。', fortune: '中吉' },
  '風雷益': { name: '風雷益', number: 42, upperTrigram: '巽', lowerTrigram: '震', binaryCode: '110001', element: '木', meaning: '增益補給，利他益己', judgement: '利有攸往，利涉大川。', image: '風雷，益。', fortune: '吉' },
  '澤天夬': { name: '澤天夬', number: 43, upperTrigram: '兌', lowerTrigram: '乾', binaryCode: '011111', element: '金', meaning: '決斷果敢，剛決柔', judgement: '揚于王庭，孚號有厲。', image: '澤上於天，夬。', fortune: '平' },
  '天風姤': { name: '天風姤', number: 44, upperTrigram: '乾', lowerTrigram: '巽', binaryCode: '111110', element: '金', meaning: '不期而遇，邂逅相逢', judgement: '女壯，勿用取女。', image: '天下有風，姤。', fortune: '平' },
  '澤地萃': { name: '澤地萃', number: 45, upperTrigram: '兌', lowerTrigram: '坤', binaryCode: '011000', element: '金', meaning: '聚合團結，集眾成事', judgement: '亨，王假有廟。', image: '澤上於地，萃。', fortune: '吉' },
  '地風升': { name: '地風升', number: 46, upperTrigram: '坤', lowerTrigram: '巽', binaryCode: '000110', element: '土', meaning: '上升發展，步步高升', judgement: '元亨，用見大人。', image: '地中生木，升。', fortune: '吉' },
  '澤水困': { name: '澤水困', number: 47, upperTrigram: '兌', lowerTrigram: '坎', binaryCode: '011010', element: '金', meaning: '困頓窮乏，堅守正道', judgement: '亨，貞大人吉，無咎。', image: '澤無水，困。', fortune: '凶' },
  '水風井': { name: '水風井', number: 48, upperTrigram: '坎', lowerTrigram: '巽', binaryCode: '010110', element: '水', meaning: '滋養不竭，德澤天下', judgement: '改邑不改井，無喪無得。', image: '木上有水，井。', fortune: '吉' },
  '澤火革': { name: '澤火革', number: 49, upperTrigram: '兌', lowerTrigram: '離', binaryCode: '011101', element: '金', meaning: '變革更新，革故鼎新', judgement: '己日乃孚，元亨利貞。', image: '澤中有火，革。', fortune: '平' },
  '火風鼎': { name: '火風鼎', number: 50, upperTrigram: '離', lowerTrigram: '巽', binaryCode: '101110', element: '火', meaning: '鼎新之象，穩定發展', judgement: '元吉，亨。', image: '木上有火，鼎。', fortune: '吉' },
  '震為雷': { name: '震為雷', number: 51, upperTrigram: '震', lowerTrigram: '震', binaryCode: '001001', element: '木', meaning: '震動奮起，驚懼修省', judgement: '亨。震來虩虩，笑言啞啞。', image: '洊雷，震。', fortune: '平' },
  '艮為山': { name: '艮為山', number: 52, upperTrigram: '艮', lowerTrigram: '艮', binaryCode: '100100', element: '土', meaning: '止欲修行，審時度勢', judgement: '艮其背，不獲其身。', image: '兼山，艮。', fortune: '平' },
  '風山漸': { name: '風山漸', number: 53, upperTrigram: '巽', lowerTrigram: '艮', binaryCode: '110100', element: '木', meaning: '循序漸進，穩步發展', judgement: '女歸吉，利貞。', image: '山上有木，漸。', fortune: '吉' },
  '雷澤歸妹': { name: '雷澤歸妹', number: 54, upperTrigram: '震', lowerTrigram: '兌', binaryCode: '001011', element: '木', meaning: '少女出嫁，行動需慎', judgement: '征凶，無攸利。', image: '澤上有雷，歸妹。', fortune: '平' },
  '雷火豐': { name: '雷火豐', number: 55, upperTrigram: '震', lowerTrigram: '離', binaryCode: '001101', element: '木', meaning: '豐盛之象，盛極當慎', judgement: '亨，王假之。', image: '雷電皆至，豐。', fortune: '吉' },
  '火山旅': { name: '火山旅', number: 56, upperTrigram: '離', lowerTrigram: '艮', binaryCode: '101100', element: '火', meaning: '旅途奔波，謹慎前行', judgement: '小亨，旅貞吉。', image: '山上有火，旅。', fortune: '平' },
  '巽為風': { name: '巽為風', number: 57, upperTrigram: '巽', lowerTrigram: '巽', binaryCode: '110110', element: '木', meaning: '順從謙遜，隨風而動', judgement: '小亨，利有攸往。', image: '隨風，巽。', fortune: '中吉' },
  '兌為澤': { name: '兌為澤', number: 58, upperTrigram: '兌', lowerTrigram: '兌', binaryCode: '011011', element: '金', meaning: '喜悅和合，以和為貴', judgement: '亨，利貞。', image: '麗澤，兌。', fortune: '吉' },
  '風水渙': { name: '風水渙', number: 59, upperTrigram: '巽', lowerTrigram: '坎', binaryCode: '110010', element: '木', meaning: '渙散離析，宜聚不宜散', judgement: '亨，王假有廟。', image: '風行水上，渙。', fortune: '平' },
  '水澤節': { name: '水澤節', number: 60, upperTrigram: '坎', lowerTrigram: '兌', binaryCode: '010011', element: '水', meaning: '節制有度，適可而止', judgement: '亨，苦節不可貞。', image: '澤上有水，節。', fortune: '中吉' },
  '風澤中孚': { name: '風澤中孚', number: 61, upperTrigram: '巽', lowerTrigram: '兌', binaryCode: '110011', element: '木', meaning: '誠信至上，心懷坦蕩', judgement: '豚魚吉，利涉大川。', image: '澤上有風，中孚。', fortune: '吉' },
  '雷山小過': { name: '雷山小過', number: 62, upperTrigram: '震', lowerTrigram: '艮', binaryCode: '001100', element: '木', meaning: '小事可為，大事宜守', judgement: '亨，利貞。可小事，不可大事。', image: '山上有雷，小過。', fortune: '平' },
  '水火既濟': { name: '水火既濟', number: 63, upperTrigram: '坎', lowerTrigram: '離', binaryCode: '010101', element: '水', meaning: '功成圓滿，盛極當慎', judgement: '亨小，利貞。', image: '水在火上，既濟。', fortune: '吉' },
  '火水未濟': { name: '火水未濟', number: 64, upperTrigram: '離', lowerTrigram: '坎', binaryCode: '101010', element: '火', meaning: '事未完成，繼續努力', judgement: '亨，小狐汔濟，濡其尾，無攸利。', image: '火在水上，未濟。', fortune: '平' }
};

/**
 * 根據二進制碼獲取卦名
 */
export function getHexagramByBinary(binaryCode: string): Hexagram | null {
  for (const [name, info] of Object.entries(HEXAGRAM_DATABASE)) {
    if (info.binaryCode === binaryCode) {
      return name as Hexagram;
    }
  }
  return null;
}

/**
 * 獲取卦象完整信息
 */
export function getHexagramInfo(hexagramName: Hexagram): HexagramInfo {
  const baseInfo = HEXAGRAM_DATABASE[hexagramName];
  const yaos: YaoInfo[] = [];

  // 解析六爻
  for (let i = 0; i < 6; i++) {
    const isYang = baseInfo.binaryCode[5 - i] === '1';
    yaos.push({
      position: (i + 1) as any,
      type: isYang ? '陽爻' : '陰爻',
      isChanging: false,
      text: `${isYang ? '九' : '六'}${['初', '二', '三', '四', '五', '上'][i]}`
    });
  }

  return {
    ...baseInfo,
    yaos
  };
}
