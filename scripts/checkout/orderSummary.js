import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import  dayjs  from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import {deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js"
import { renderPaymentSummary, updateCart} from "./paymentSummary.js";
import renderCheckoutHeader from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
  
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
    const today = dayjs();
    let deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    );

    let dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
  //   function calculateDeliveryDate() {
  //     let ifWeekend = 0;

  //     const today = dayjs();
  //     let deliveryDate = today.add(
  //       ifWeekend, 'days'
  //     );
  
  //     let dateString = deliveryDate.format(
  //       'dddd, MMMM D'
  //     );
      
  //   if(dateString.includes('Saturday')) {
  //     deliveryDate.add(ifWeekend + 2, 'days');
  //     console.log('hello')
  //   } else if (dateString.includes('Sunday')){
  //     deliveryDate.add(2, 'days');
  //   } else if (dateString.includes('sunday')){
  //     deliveryDate.add(2, 'days');
  //   } else if (dateString.includes('saturday')){
  //     deliveryDate.add(2, 'days');
  //   } else {
  //     console.log(dateString)
  //   }
  //   return dateString;
  // }
    



    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>
    
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">
    
            <div class="cart-item-details">
              <div class="js-product-name product-name">
                ${matchingProduct.name}
              </div>
              <div class="js-product-price product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="js-product-quantity-${matchingProduct.id} product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
    
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
          </div>
              </div>
      `;
      });



function deliveryOptionsHTML(matchingProduct, cartItem) {
  let HTML = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
  

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    
    HTML += `
        <div class="js-delivery-option delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked?'checked':''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
        </div>
      </div>
      `
  });

  return HTML;
}


document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId
      removeFromCart(productId);

      let container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCart();
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });


document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

/*
export function calculateDeliveryDate(deliveryOption, date) {
  if(deliveryOption.includes('Saturday')) {
    // date.add(2, ='days');
    deliveryOption + 1
  } else if (deliveryOption.includes('Sunday')){
    deliveryOption + 1;
  } else if (deliveryOption.includes('sunday')){
    deliveryOption + 1;
  } else if (deliveryOption.includes('saturday')){
    deliveryOption + 2
  } else {
    console.log(deliveryOption)
  }
}

*/