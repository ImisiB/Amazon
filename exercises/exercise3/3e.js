import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

const day = dayjs();

export default function isWeekend(date) {
  if(date === 'Saturday') {
    console.log('It is weekend');
  } else if (date === 'Sunday'){
    console.log('It is weekend')
  } else if (date === 'sunday'){
    console.log('It is weekend')
  } else if (date === 'Saturday'){
    console.log('It is weekend')
  } else {
    console.log(date)
  }
}

const dateOfTheWeek = day.format('dddd')

isWeekend(dateOfTheWeek);

