import { format} from 'date-fns'
import { sv } from 'date-fns/esm/locale'

export const formatTime = (dateString) => {
    let date = new Date(dateString)
    let form = "H:mm"

    return format(date, form, { locale: sv })
}

export const formatDay = (dateString) => {
    let date = new Date(dateString)
    let form = "PPPP"

    return format(date, form, { locale: sv })
}