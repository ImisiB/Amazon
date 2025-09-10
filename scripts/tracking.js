import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { products, getProduct, loadProducts} from "../data/products.js";
import {deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js"
import { orders } from "../data/orders.js";
import {addToCart, cart, saveToStorage } from "../data/cart.js";
import formatCurrency from "./utils/money.js";

function tracking() {
  let trackSummaryHTML = ''

  let productPriceCents = 0;

  let shippingPriceCents = 0;

  cart.forEach((orderItem) => {
    loadProducts(() => {
      const productId = orderItem.productId;

      let product = getProduct(orderItem.productId);

      let matchingProduct = getProduct(productId);
      const url = new URL(window.location.href);
      
      const deliveryOptionId = orderItem.deliveryOptionId;
      const urlProductId = url.searchParams.get('productId')

      cart.forEach(() => {
        if(matchingProduct.id === urlProductId) {
          console.log('correct id')
          matchingProduct = product;
        }
      })
      console.log(matchingProduct);
      
      let urlMatchingProduct = getProduct(matchingProduct)
      console.log(urlMatchingProduct);
      
  
      // console.log(url.searchParams.get('productId'));
      // console.log(matchingProduct.id)
  
      const deliveryOption = getDeliveryOption(deliveryOptionId);
  
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );
  
      productPriceCents += product.priceCents * orderItem.quantity;

      shippingPriceCents += deliveryOption.priceCents
      
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    // console.log(matchingProduct.name);
    

    trackSummaryHTML += `
          <a class="back-to-orders-link link-primary" href="./orders.html">
        View all orders
      </a>

          <div class="order-tracking">
        <div class="delivery-date">
          Arriving on Monday, June 13
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${orderItem.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

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
  })
  })
}
tracking()
