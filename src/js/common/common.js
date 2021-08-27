/*
 * Select Box Default Value
 */
const selectDefault = {
    text: "전체",
    value: 0
}

/*
 * empty value check
 */
const isEmpty = (value) => {
    return (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) ? true : false
}

export {
    selectDefault,
    isEmpty
}