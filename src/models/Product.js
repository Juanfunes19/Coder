import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true }
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
