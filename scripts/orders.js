import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { products, getProduct, loadProducts} from "../data/products.js";
import {deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js"
import { orders } from "../data/orders.js";
import {addToCart, cart, saveToStorage } from "../data/cart.js";
import formatCurrency from "./utils/money.js";

function order() {
  let orderSummaryHTML = ''

  let productPriceCents = 0;

  let shippingPriceCents = 0;
  let orderId;
  
  cart.forEach((orderItem) => {
    loadProducts(() => {
      const productId = orderItem.productId;

      const matchingProduct = getProduct(productId);

      const deliveryOptionId = orderItem.deliveryOptionId;
  
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      for (let i = 0; i < orders.length; i++) {
        orderId = orders[i].id
      }
      
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );
  
      const product = getProduct(orderItem.productId);
      productPriceCents += product.priceCents * orderItem.quantity;

      shippingPriceCents += deliveryOption.priceCents
      
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    console.log(matchingProduct.name);
    
    
    orderSummaryHTML += `
        <div class="js-order-container order-container">
          <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${dateString}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatCurrency(totalCents)}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${matchingProduct.id}</div>
              </div>
            </div>

            <div class="order-details-grid">
              <div class="product-image-container">
                <img src="${matchingProduct.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                  Arriving on: August 15
                </div>
                <div class="product-quantity">
                  Quantity: ${orderItem.quantity}
                </div>
                <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="js-buy-again buy-again-message" js-buy-again-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">
                Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html?orderId=${matchingProduct.id}&productId=${productId}">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </div>
            </div>
  `;
  document.querySelector('.js-orders-grid').innerHTML = orderSummaryHTML;
  document.querySelectorAll('.js-buy-again')
    .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId
      addToCart(productId)
      order()
    })
    })
    });
  });
};
order();
