
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

export {
    strip,
    hash,
    validateEmail,
    validatePassword
}