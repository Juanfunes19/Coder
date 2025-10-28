import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');

export default class ProductManager {
  constructor() {
    this.path = productsPath;
    this.products = this._loadProducts();
  }

  _loadProducts() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '[]');
    }
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  _saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  addProduct(productData) {
    const exists = this.products.some(p => p.code === productData.code);
    if (exists) throw new Error('Product code already exists');

    const newProduct = {
      id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
      ...productData
    };

    this.products.push(newProduct);
    this._saveProducts();
    return newProduct;
  }

  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');

    this.products[index] = { ...this.products[index], ...updates, id };
    this._saveProducts();
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');

    this.products.splice(index, 1);
    this._saveProducts();
  }
}
