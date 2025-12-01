import CartModel from "../models/Cart.js";

export default class CartManager {

  async createCart() {
    const newCart = await CartModel.create({ products: [] });
    return newCart;
  }

  async getCartById(id) {
    return await CartModel.findById(id).populate("products.product").lean();
  }

  async addProductToCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);

    if (!cart) throw new Error("Cart not found");

    const existing = cart.products.find(p => p.product.toString() === productId);

    if (existing) {
      existing.quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return cart;
  }

  async updateCart(cartId, newProducts) {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      { products: newProducts },
      { new: true }
    );

    if (!cart) throw new Error("Cart not found");
    return cart;
  }

  async updateQuantity(cartId, productId, qty) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error("Cart not found");

    const item = cart.products.find(p => p.product.toString() === productId);
    if (!item) throw new Error("Product not in cart");

    item.quantity = qty;

    await cart.save();
    return cart;
  }

  async deleteProduct(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error("Cart not found");

    cart.products = cart.products.filter(p => p.product.toString() !== productId);

    await cart.save();
    return cart;
  }

  async emptyCart(cartId) {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      { products: [] },
      { new: true }
    );

    if (!cart) throw new Error("Cart not found");
    return cart;
  }
}
