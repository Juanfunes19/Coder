import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
  res.json(productManager.getProducts());
});

router.get('/:pid', (req, res) => {
  const id = parseInt(req.params.pid);
  const product = productManager.getProductById(id);
  if (product) res.json(product);
  else res.status(404).json({ error: 'Product not found' });
});

router.post('/', (req, res) => {
  try {
    const newProduct = productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:pid', (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const updated = productManager.updateProduct(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.delete('/:pid', (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    productManager.deleteProduct(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export default router;
