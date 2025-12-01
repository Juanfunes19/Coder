import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  res.json(cart);
});

// ADD product
router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
  res.json(cart);
});

// DELETE product from cart
router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
  res.json(cart);
});

// PUT replace whole cart
router.put("/:cid", async (req, res) => {
  const cart = await cartManager.updateCart(req.params.cid, req.body);
  res.json(cart);
});

// PUT update product quantity
router.put("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;
  const cart = await cartManager.updateProductQuantity(
    req.params.cid,
    req.params.pid,
    quantity
  );
  res.json(cart);
});

// DELETE clear cart
router.delete("/:cid", async (req, res) => {
  const cart = await cartManager.clearCart(req.params.cid);
  res.json(cart);
});

export default router;
