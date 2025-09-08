// 6a
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
})

const response = xhr.open('GET', 'https://supersimplebackend.dev/greeting')
xhr.send()

// 6b
fetch('https://supersimplebackend.dev/greeting')
  .then(response => {
    console.log(response.text());
  })

// 6c
async function request() {
  const response = await fetch('https://supersimplebackend.dev/greeting')
  console.log(response);
}
request()

// 6d
async function request2() {
  const response = await fetch('https://supersimplebackend.dev/greeting', {
    name: "Basit"
  })
  // console.log(response.json());
}
request2()

// 6e
const xhr2 = new XMLHttpRequest();

xhr2.addEventListener('load', () => {
  console.log(xhr2.response);
})
const response2 = xhr2.open('GET', 'https://amazon.com')
xhr2.send()

// 6f
const xhr3 = new XMLHttpRequest();

xhr3.addEventListener('load', () => {
  console.log(xhr3.response);
})
const response3 = xhr3.open('GET', 'https://amazon.com')
xhr3.send()
xhr3.addEventListener('error', () => {
  console.log('CORS error. Your request was blocked by backend.');
})

// 6g
const response4 = fetch('https://supersimplebackend.dev', {
  
})

console.log(response4);

try {
  if(response4.status >= 400) {
    throw response4;
  }
  
  if(error.status === 400) {
    await error.json()
  }
} catch (error) {
  console.log('Network error. Please try again later.');
} 
