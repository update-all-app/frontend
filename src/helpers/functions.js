
function strip(str){
    return str.replace(/^\s+|\s+$/g, '')
}

function hash(str){
    let hash = 0 
    let chr
    for (let i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

function validatePhoneNumber(num){
    const re = /[0-9]{3}-[0-9]{3}-[0-9]{4}/
    return re.test(String(num))
}

function unformatPhoneNumber(num){
    return num.replace(/\D/g, '')
}

function formatPhoneNumber(num){
    const numStr = String(num)
    let formatted = numStr.substring(0,3) + '-' + numStr.substring(3,6) + '-' + numStr.substring(6,10)
    if(numStr.length <= 3){
        formatted = formatted.substring(0, formatted.length - 2)
    }else if(numStr.length <= 6){
        formatted = formatted.substring(0, formatted.length - 1)
    }
    return formatted
}

function validatePassword(pass){
    const errors = []

    function regexMatchCount(iterator, n=1){
        for(let i = 0; i < n; i++){
            let res = iterator.next()
            if(res.done){
                return false
            }
        }
        return true
    }

    function validateLength(){
        const valid = pass.length > 8
        if(!valid){
            errors.push("Must have at least 8 characters")
        }
        return valid
    }

    function containsNumber(){
        const re = /[0-9]/g
        const valid = regexMatchCount(pass.matchAll(re), 1)
        if(!valid){
            errors.push("Must have at least one number")
        }
        return valid
    }

    function containsSpecialCharacter(){
        const re = /[!@#$%^&]/g
        const valid = regexMatchCount(pass.matchAll(re), 1)
        if(!valid){
            errors.push("Contains one of the charcters !,@,#,$,%,^,&")
        }
        return valid
    }
    const validLength = validateLength()
    const hasNumber = containsNumber()
    const hasCharacters = containsSpecialCharacter()
    const valid = validLength && hasNumber && hasCharacters
    return {
        valid,
        errors
    }

}

function dateTo24Time(date){
    return `${pad(date.getHours(),2)}:${pad(date.getMinutes(),2)}`
}

function protectNullArgs(val, fn, ...args){
    return function (){
        if(args !== null){
            return fn(...args)
        }else{
            return val
        }     
    }
}

function safeCallWithDefault(val, fn, ...args){
    try{
        return fn(...args)
    }catch(err){
        return val
    }
}

function dateToHTMLString(date){
    return `${date.getFullYear()}-${pad(String(date.getMonth() + 1), 2)}-${pad(String(date.getDate()),2)}`
}


function formatDateShort(date){
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function pad(val, padLen, padVal="0"){
    val = String(val)
    if(val.length < padLen){
        const padAmount = padLen - val.length
        let newVal = val
        for(let i = 0; i < padAmount; i++){
            newVal = padVal + newVal
        }
        return newVal
    }else{
        return val
    }
}

function time24To12(milTime){
    const [hourStr, minStr] = milTime.split(":")
    const hour = Number.parseInt(hourStr)
    const min = Number.parseInt(minStr)
    if(hour === 0){
        return `12:${pad(min,2)} AM`
    }else if(hour < 12){
        return `${hour}:${pad(min,2)} AM`
    }else{
        return `${hour - 12}:${pad(min,2)} PM`
    }
}

function time12To24(timeStr){
    const [time, suffix] = timeStr.split(" ")
    const [hrStr, minStr] = time.split(":")
    const hour = Number.parseInt(hrStr)
    const min = Number.parseInt(minStr)
    if(suffix == "AM"){
        if(hour === 12){
            return `00:${pad(min,2)}`
        }
        return `${pad(hour,2)}:${pad(min,2)}`
    }else{
        return `${hour + 12}:${pad(min,2)}`
    }
}

function dateRangesOverlap(d1start, d1end, d2start, d2end){
    const maxStart = max([d1start, d2start], (a,b) => a > b)
    const minEnd = min([d1end, d2end], (a,b) => a < b)
    return minEnd > maxStart
}

function dateRangesHaveSameDay(d1start, d1end, d2start, d2end){
    const overlapExists = dateRangesOverlap(d1start, d1end, d2start, d2end)
    if(overlapExists){ return true }
    return (
        datesInSameDay(d1start, d2start) ||
        datesInSameDay(d1start, d2end) ||
        datesInSameDay(d2end, d1start) ||
        datesInSameDay(d2end, d1end)
    )

}

function datesInSameDay(d1, d2){
    return (d1.getFullYear() === d2.getFullYear() && 
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    )
}

function min(coll, isLessThan){
    let min = null
    for(let el of coll){
        if(min === null || isLessThan(el, min)){
            min = el
        }
    }
    return min
}

function formatDateTimeForBackend(date){
    return `${dateToHTMLString(date)} ${dateTo24Time(date)}:00`
}

function formatDateToUTCForBackend(date){
    const dateStr = `${date.getUTCFullYear()}-${pad(String(date.getUTCMonth() + 1), 2)}-${pad(String(date.getUTCDate()),2)}`
    const timeStr = `${pad(date.getUTCHours(),2)}:${pad(date.getUTCMinutes(),2)}:00`
    return `${dateStr} ${timeStr}`
}

function max(coll, isGreaterThan){
    let max = null
    for(let el of coll){
        if(max === null || isGreaterThan(el, max)){
            max = el
        }
    }
    return max
}

function capitalize(str){
    if (typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}


function datePlusDays(date, days){
    const dateCpy = new Date(date)
    const dateDate = dateCpy.getDate()
    const newDate = dateDate + days
    return new Date(dateCpy.setDate(newDate))
}

export {
    strip,
    hash,
    validateEmail,
    validatePassword,
    validatePhoneNumber,
    formatPhoneNumber,
    unformatPhoneNumber,
    dateTo24Time,
    protectNullArgs,
    safeCallWithDefault,
    dateToHTMLString,
    time24To12,
    time12To24,
    min,
    max,
    datesInSameDay,
    dateRangesHaveSameDay,
    dateRangesOverlap,
    formatDateTimeForBackend,
    formatDateToUTCForBackend,
    capitalize,
    formatDateShort,
    datePlusDays
}