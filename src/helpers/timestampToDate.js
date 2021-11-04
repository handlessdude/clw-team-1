/**
 Convert a Unix timestamp to time
 */
export default function timestampToDate(UNIX_timestamp){
    //console.log(typeof(UNIX_timestamp))
    //const myDate = new Date(Number(UNIX_timestamp)*1000)
    /*const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const year = a.getFullYear()
    const month = months[a.getMonth()]
    const date = a.getDate()
    const hour = a.getHours()
    const min = a.getMinutes()
    const sec = a.getSeconds()
    const res = ''+ date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return res*/
    //return myDate.toLocaleString()
    return new Date(Number(UNIX_timestamp)*1000)
}
