import { format } from 'date-fns'
import { sv } from 'date-fns/locale'

/**
 * Function to format a date to the format H:mm which looks like '17:32', also converts the given time to swedish locale
 *
 * @param {String} dateString A date as a string to extract the time from
 * @returns
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString)
  const form = 'H:mm'

  return format(date, form, { locale: sv })
}

/**
 * Function to format a date to the format PPPP which looks like 'lördag 15 maj 2021', also converts the given time to swedish locale
 *
 * @param {String} dateString A date as a string to extract the day from
 * @returns
 */
export const formatDay = (dateString) => {
  const date = new Date(dateString)
  const form = 'PPPP'

  return format(date, form, { locale: sv })
}

/**
 * Function to format a date to the format Pp which looks like '2021-05-16 14:00', also converts the given time to swedish locale
 *
 * @param {String} dateString A date as a string to extract the day and time from
 * @returns
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const form = 'Pp'

  return format(date, form, { locale: sv })
}
