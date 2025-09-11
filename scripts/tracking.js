import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { products, loadProducts} from "../data/products.js";
import {cart} from "../data/cart.js";
import { orders } from "../data/orders.js";


function tracking() {
  let trackSummaryHTML = ''

  const url = new URL(window.location.href);

  loadProducts(() => {
    for (let i = 0; i < products.length; i++) {
      if (url.searchParams.get('productId') === products[i].id){
        let cartItemQuantity = 0;

      cart.forEach((cartItem) => {
        if (cartItem.productId ==  products[i].id){ 
          cartItemQuantity += cartItem.quantity 
        }
      })
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
            <div class="progress-label">
              Preparing
            </div>
            <div class="progress-label current-status">
              Shipped
            </div>
            <div class="progress-label">
              Delivered
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar"></div>
          </div>
        </div>
        `;
        document.querySelector('.js-main').innerHTML = trackSummaryHTML;
      }
    }
  })
  

  
  
  for (let i = 0; i < orders.length; i++) {
    
    if (url.searchParams.get('orderId') === orders[i].id){
         
          const time = Date.now();
          console.log(orders);
          
          console.log(time);
          console.log(orders[i].orderTime);
          console.log(orders[i].products[0].estimatedDeliveryTime);
          
          const isoString = "2025-09-11T14:22:12.234Z";
          const dateObject = new Date(isoString);
          const timestamp = dateObject.getTime();

          let dateString = orders[i].products[0].estimatedDeliveryTime;
          let actualDate = new Date(dateString);
          let dateString2 = orders[i].orderTime;
          let actualDate2 = new Date(dateString2);
          

          const estimatedDeliveryTimeStamp = actualDate2.getTime()
          
          const orderTimeStamp = actualDate.getTime();

          console.log(estimatedDeliveryTimeStamp);
          console.log(orderTimeStamp)

          const trackingRange =  (time - orders[i].orderTime) / (orders[i].products[0].estimatedDeliveryTime
          - orders[i].orderTime)

          // console.log(trackingRange);
          console.log(orders[i].products[0].estimatedDeliveryTime);
          console.log(orders[i].orderTime);
          
          
          
    }
  }

  

}

tracking();
