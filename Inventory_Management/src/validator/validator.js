exports.validString=(value)=>{
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true
}

exports.isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "string") { return true }
    else {
        return false
    }
}