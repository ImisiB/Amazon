import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"


const day = dayjs();

const date = day.add(30, 'Days')
const oneMonthAfter = date.format('MMMM D')
console.log(oneMonthAfter);