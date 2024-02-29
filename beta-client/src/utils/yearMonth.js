export default function yearMonth(string){
    const d = new Date(string);
    const m = d.toLocaleDateString('en-US', {month: 'short'})
    const y = d.toLocaleDateString('en-US', {year: 'numeric'})
    return `${m} ${y}`
}

export function maxMonth(){
    const d = new Date().toJSON().slice(0,7)
    return d
}

export function dayMonthYear(string){
    const d = new Date(string)
    const dmy = d.toLocaleDateString('en-IN', {day: 'numeric', month:'long', year:'numeric'})
    return dmy
}
