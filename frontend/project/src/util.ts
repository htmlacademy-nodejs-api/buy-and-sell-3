import dayjs from 'dayjs';
import {AuthorizationStatus, TICKET_DATE_RANGE} from './const';

export const isAuthorization = (status: AuthorizationStatus) =>
  status === AuthorizationStatus.Auth;

export const isAuthorizationUnknown = (status: AuthorizationStatus) =>
  status === AuthorizationStatus.Unknown;

export const generateRandomValue = (
  min: number,
  max: number,
  numAfterDigit = 0,
): number =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomDateToISOString = (): string =>
  dayjs()
    .subtract(generateRandomValue(0, TICKET_DATE_RANGE), 'day')
    .toISOString();

export const getFormatedDate = (date: string) =>
  dayjs(date)
    .format('DD MMMM YYYY');
