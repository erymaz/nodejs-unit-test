export const MBTI_LIST = [
  'INFP',
  'INFJ',
  'ENFP',
  'ENFJ',
  'INTJ',
  'INTP',
  'ENTP',
  'ENTJ',
  'ISFP',
  'ISFJ',
  'ESFP',
  'ESFJ',
  'ISTP',
  'ISTJ',
  'ESTP',
  'ESTJ',
] as const;
export type MbtiType = typeof MBTI_LIST[number];

export const ENNEAGRAM_LIST = [
  '1w2',
  '2w3',
  '3w2',
  '3w4',
  '4w3',
  '4w5',
  '5w4',
  '5w6',
  '6w5',
  '6w7',
  '7w6',
  '7w8',
  '8w7',
  '8w9',
  '9w8',
  '9w1',
] as const;    // Todo: add more
export type EnneagramType = typeof ENNEAGRAM_LIST[number];

export const SOCIONICS_LIST = ['ILE', 'LII', 'ESE'] as const;    // Todo: add more
export type SocionicsType = typeof SOCIONICS_LIST[number];

export const ZODIAC_LIST = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const;
export type ZodiacType = typeof ZODIAC_LIST[number];

export interface IPersonalities {
  mbti: MbtiType;
  enneagram: EnneagramType;
  socionics: SocionicsType;
  // add more ...
};

export const CATEGORIES = [
  'Anime',
  'Music',
  'Politics',
  'Business',
  'Technology',
  // add more ...
] as const;
export type CategoryType = typeof CATEGORIES[number];

export interface IVote {
  mbti?: MbtiType;
  enneagram?: EnneagramType;
  zodiac?: ZodiacType;
};

export const COMMENT_FILTER_VALUES = ['mbti', 'enneagram', 'zodiac'] as const;
export type CommentFilterType = typeof COMMENT_FILTER_VALUES[number];

export const COMMENT_SORT_VALUES = ['recent', 'best'] as const;
export type CommentSortType = typeof COMMENT_SORT_VALUES[number];
