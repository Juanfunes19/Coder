import { Router } from "express";
import ProductModel from "../models/Product.js";
import CartModel from "../models/Cart.js";

const router = Router();

// Página de productos con paginación
router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  const data = await ProductModel.paginate(
    query ? { category: query } : {},
    {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort } : undefined,
      lean: true,
    }
  );

  res.render("products", {
    title: "Productos",
    products: data.docs,
    page: data.page,
    totalPages: data.totalPages,
    hasNextPage: data.hasNextPage,
    hasPrevPage: data.hasPrevPage,
    nextPage: data.nextPage,
    prevPage: data.prevPage,
  });
});

// Vista detalle de producto
router.get("/products/:pid", async (req, res) => {
  const product = await ProductModel.findById(req.params.pid).lean();
  if (!product) return res.status(404).send("Producto no encontrado");

  res.render("productDetail", { product });
});

// Vista de un carrito
router.get("/carts/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid)
    .populate("products.product")
    .lean();

  if (!cart) return res.status(404).send("Carrito no encontrado");

  res.render("cartDetail", { cart });
});

export default router;
