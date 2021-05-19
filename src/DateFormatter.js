import { format } from 'date-fns'
import { sv } from 'date-fns/esm/locale'

/**
 * Function to format a date to the format H:mm which looks like 17:32
 *
 * @param {String} dateString A date as a string to extract the time from in swedish locale
 * @returns
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString)
  const form = 'H:mm'

  return format(date, form, { locale: sv })
}

/**
 * Function to format a date to a human readable day
 *
 * @param {String} dateString A date as a string to extract the day from in swedish locale
 * @returns
 */
export const formatDay = (dateString) => {
  const date = new Date(dateString)
  const form = 'PPPP'

  return format(date, form, { locale: sv })
}

/**
 * Function to format a date to a human readable date + time
 *
 * @param {String} dateString A date as a string to extract the day and time from in swedish locale
 * @returns
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const form = 'Pp'

  return format(date, form, { locale: sv })
}
