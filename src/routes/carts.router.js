import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
  const newCart = cartManager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const id = parseInt(req.params.cid);
  const cart = cartManager.getCartById(id);
  if (cart) res.json(cart);
  else res.status(404).json({ error: 'Cart not found' });
});

router.post('/:cid/product/:pid', (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const updatedCart = cartManager.addProductToCart(cid, pid);
    res.json(updatedCart);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export default router;
