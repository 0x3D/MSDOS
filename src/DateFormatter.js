import { format} from 'date-fns'
import { sv } from 'date-fns/esm/locale'


/**
 * Function to format a date to a human readable time
 * 
 * @param {String} dateString A date as a string to extract the time from in swedish locale 
 * @returns 
 */
export const formatTime = (dateString) => {
    let date = new Date(dateString)
    let form = "H:mm"

    return format(date, form, { locale: sv })
}

/**
 * Function to format a date to a human readable day
 * 
 * @param {String} dateString A date as a string to extract the day from in swedish locale 
 * @returns 
 */
export const formatDay = (dateString) => {
    let date = new Date(dateString)
    let form = "PPPP"

    return format(date, form, { locale: sv })
}