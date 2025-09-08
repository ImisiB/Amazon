import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { products, getProduct} from "../data/products.js";
import {deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js"
import { orders } from "../data/orders.js";

function order() {
  orders.forEach((orderItem) => {
    let orderSummaryHTML = ''
    
    
    const productId = orderItem.productId;

    const matchingProduct = getProduct(productId);
  
    const deliveryOptionId = orderItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    orderSummaryHTML += `
            <div class="order-container">
            
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${dateString}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$35.06</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
              </div>
            </div>

            <div class="order-details-grid">
              <div class="product-image-container">
                <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
              </div>

              <div class="product-details">
                <div class="product-name">
                  Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>
                <div class="product-delivery-date">
                  Arriving on: August 15
                </div>
                <div class="product-quantity">
                  Quantity: 1
                </div>
                <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>

              <div class="product-image-container">
                <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
              </div>

              <div class="product-details">
                <div class="product-name">
                  Adults Plain Cotton T-Shirt - 2 Pack
                </div>
                <div class="product-delivery-date">
                  Arriving on: August 19
                </div>
                <div class="product-quantity">
                  Quantity: 2
                </div>
                <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </div>
          </div>
  `;

  
    document.querySelector('.js-order-grid').innerHTML = orderSummaryHTML;
  });
}

order();