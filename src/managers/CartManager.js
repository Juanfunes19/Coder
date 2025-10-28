import fs from 'fs';
import path from 'path';

const cartsPath = path.join(process.cwd(), 'src', 'data', 'carts.json');

export default class CartManager {
  constructor() {
    this.path = cartsPath;
    this.carts = this._loadCarts();
  }

  _loadCarts() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '[]');
    }
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  _saveCarts() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
  }

  createCart() {
    const newCart = {
      id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
      products: []
    };
    this.carts.push(newCart);
    this._saveCarts();
    return newCart;
  }

  getCartById(id) {
    return this.carts.find(c => c.id === id);
  }

  addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);
    if (!cart) throw new Error('Cart not found');

    const existingProduct = cart.products.find(p => p.product === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    this._saveCarts();
    return cart;
  }
}
