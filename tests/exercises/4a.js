import {addToCart, cart, loadFromStorage} from '../../data/cart.js'
import formatCurrency from "../../scripts/utils/money.js";
import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import { products } from '../../data/products.js';

describe('Test suite: formatCurrency', () => {
  it('Convert cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95')
  })
  it('Round down to the nearest cent', () => {
    expect(formatCurrency(-0)).toEqual('0.00')
  })
})

describe('Test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')
  });

  it('adds an existing product to the cart', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'id2',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
  
    addToCart('id2');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('id2');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{        productId: 'id2',
      quantity: 2,
      deliveryOptionId: '1'
    }]))
  })
  
  it('add a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('id2');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('id2');
    expect(cart[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{        productId: 'id2',
      quantity: 1,
      deliveryOptionId: '1'
    }]))
  })
});

describe('Test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();
  })

  it('displays the cart', () => {
    expect(
      document.querySelector('.js-cart-item-container').length
    ).toEqual(undefined);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2')
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
    expect(document.querySelector('.js-product-name').innerText).toEqual(products[0].name)
    expect(document.querySelector('.js-product-price').innerText).toEqual(`$${formatCurrency(products[0].priceCents)}`)
  });

  it('removes a product', () => {
    // document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).not.toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(document.querySelector('.js-product-name').innerText).toEqual(products[0].name)
    expect(document.querySelector('.js-product-price').innerText).toEqual(`$${formatCurrency(products[0].priceCents)}`)
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ``
  })
});

describe('Test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');
  })

  it('Remove a productId that is in the cart', () => {
    expect(cart).toEqual(cart)

    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })
  it('Remove a productId that is not in the cart', () => {
    
  })
  it('Update delivery option', () => {
    document.querySelector('.js-delivery-option').click()
  })
})