const isValidString = function (value) {
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidName = function (name) {
    let regex = /^[a-z A-Z ]+$/
    return regex.test(name)
    
};

module.exports = {isValidString, isValidName}