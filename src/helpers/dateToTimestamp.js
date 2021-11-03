/**
 Convert a stringDate to Unix timestamp
 */
export default function dateToTimestamp(stringDate){
    return parseInt((new Date(stringDate).getTime() / 1000).toFixed(0))
}
