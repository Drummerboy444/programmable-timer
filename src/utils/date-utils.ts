import { flow } from 'fp-ts/lib/function';

const leftPad = (character: string, count: number) => (n: number) =>
  `${Array.from({ length: count - n.toString().length }).map(
    () => character,
  )}${n}`;

const formatDay = flow((date: Date) => date.getDate(), leftPad('0', 2));
const formatMonth = flow((date: Date) => date.getMonth() + 1, leftPad('0', 2));
const formatYear = flow((date: Date) => date.getFullYear(), leftPad('0', 4));

const getDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const day = formatDay(date);
  const month = formatMonth(date);
  const year = formatYear(date);

  return `${day}/${month}/${year}`;
};

const formatHours = leftPad('0', 2);
const formatMinutes = leftPad('0', 2);
const formatSeconds = leftPad('0', 2);

const getTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const hours = formatHours(date.getHours());
  const minutes = formatMinutes(date.getMinutes());
  const seconds = formatSeconds(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
};

export const renderTimestamp =
  ({
    includeDate,
    includeTime,
  }: {
    includeDate: boolean;
    includeTime: boolean;
  }) =>
  (timestamp: number) =>
    `${includeDate ? getDate(timestamp) : ''}${
      includeDate && includeTime ? ':' : ''
    }${includeTime ? getTime(timestamp) : ''}`;
