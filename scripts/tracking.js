import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { products, loadProducts} from "../data/products.js";
import {cart} from "../data/cart.js";
import { orders } from "../data/orders.js";


function tracking() {
  let trackSummaryHTML = ''

  const url = new URL(window.location.href);
  let trackingRange =  0


  loadProducts(() => {
    for (let i = 0; i < products.length; i++) {
      if (url.searchParams.get('productId') === products[i].id){
        let cartItemQuantity = 0;
      
      cart.forEach((cartItem) => {
        if (cartItem.productId ==  products[i].id){ 
          cartItemQuantity += cartItem.quantity 
        }
      })
      console.log('hi')
  
    for (let i = 0; i < orders.length; i++) {
      console.log(orders[0].id)
      if (url.searchParams.get('orderId') === orders[i].id){
          console.log(orders);
          
          // console.log(time);
          console.log(orders[i].orderTime);
          console.log(orders[i].products[0].estimatedDeliveryTime);
          
          const isoString = "2025-09-11T14:22:12.234Z";
          const dateObject = new Date(isoString);
          const timestamp = dateObject.getTime();

          let dateString = orders[i].products[0].estimatedDeliveryTime;
          let actualDate = new Date(dateString);
          let dateString2 = orders[i].orderTime;
          let actualDate2 = new Date(dateString2);
          
          const time = Date.now();

          const estimatedDeliveryTimeStamp = actualDate2.getTime()
          
          const orderTimeStamp = actualDate.getTime();

          console.log(estimatedDeliveryTimeStamp);
          console.log(orderTimeStamp)

          // const trackingRange =  (time - orders[i].orderTime) / (orders[i].products[0].estimatedDeliveryTime
          // - orders[i].orderTime)

          trackingRange = Math.round(( (time - orderTimeStamp) / (estimatedDeliveryTimeStamp - orderTimeStamp)) * 100)
    }
  }


      trackSummaryHTML += `
        <a class="back-to-orders-link link-primary" href="./orders.html">
          View all orders
        </a>

            <div class="order-tracking">
          <div class="delivery-date">
            Arriving on Monday, June 13
          </div>

          <div class="product-info">
            ${products[i].name}
          </div>

          <div class="product-info"> 
            Quantity:
        
          ${cartItemQuantity}
            
          </div>

          <img class="product-image" src="${products[i].image}">

          <div class="progress-labels-container">
            <div class="js-progress-label progress-label">
              Preparing
            </div>
            <div class="js-progress-label2 progress-label">
              Shipped
            </div>
            <div class="js-progress-label3 progress-label">
              Delivered
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar" style="width:${trackingRange}%;"></div>
          </div>
        </div>
        `;
        document.querySelector('.js-main').innerHTML = trackSummaryHTML;
      }
    }
      if ( trackingRange <= 49 ){
        const progress = document.querySelector('.js-progress-label')
        document.querySelector('.progress-bar').style.backgroundColor = 'red'
        progress.classList.add('current-status')
      } else if ( trackingRange <= 99) {
        const progress = document.querySelector('.js-progress-label2')
        document.querySelector('.progress-bar').style.backgroundColor = 'blue'
        progress.classList.add('current-status')
      } else if (trackingRange === 100) {
        const progress = document.querySelector('.js-progress-label3')
        document.querySelector('.progress-bar').style.backgroundColor = 'green'
        progress.classList.add('current-status')
    }
    console.log('hi')
  })
}

tracking();
