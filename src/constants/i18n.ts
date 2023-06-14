export const LANGUAGES = {
  EN: 'en-us',
  KO: 'ko-kr',
};

type Timezone = {
  [key in TIMEZONE_ABBR]: string;
};
export const TIMEZONE: Timezone = {
  EST: 'America/New_York',
  KST: 'Asia/Seoul',
};

export enum TIMEZONE_ABBR {
  EST = 'EST',
  KST = 'KST',
}
