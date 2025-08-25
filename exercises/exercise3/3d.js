import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"


const day = dayjs();


const dayOfTheWeek = day.format('dddd')
console.log(dayOfTheWeek);