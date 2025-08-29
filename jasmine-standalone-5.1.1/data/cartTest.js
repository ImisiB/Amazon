import {addToCart, cart, loadFromStorage} from '../../data/cart.js'

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');
    
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
    expect(cart[0].quantity).toEqual(2)
  });

  it('add a new product to the cart', () => {
    spyOn(localStorage, 'setItem')

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('id2');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('id2');
    expect(cart[0].quantity).toEqual(1)
  })
})