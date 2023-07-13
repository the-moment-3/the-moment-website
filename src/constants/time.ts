import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const TASK_START_TIME = dayjs('2023-06-25T00:00').valueOf();
export const TASK_END_TIME = dayjs('2023-07-6T00:00').valueOf();
export const LOTTERY_TIME = dayjs('2023-07-6T12:00').valueOf();
export const FREE_MINT_START_TIME = dayjs('2023-07-6T14:00').valueOf();
export const FREE_MINT_END_TIME = dayjs('2023-07-13T14:00').valueOf();

export const NOW = dayjs();
