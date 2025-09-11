import { products, loadProducts} from "../data/products.js";
import {cart} from "../data/cart.js";

function tracking() {
  let trackSummaryHTML = ''

  const url = new URL(window.location.href);

  loadProducts(() => {
    for (let i = 0; i < products.length; i++) {
      if (url.searchParams.get('productId') === products[i].id){
        let cartItemQuantity = 0;

      cart.forEach((cartItem) => {
          if (cartItem.productId ==  products[i].id){
            console.log(cartItem.quantity);
            cartItemQuantity += cartItem.quantity 
          }
      })
      trackSummaryHTML += `
        <a class="back-to-orders-link link-primary" href="./orders.html">
          View all orders
        </a>
g
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
  

}

tracking();
