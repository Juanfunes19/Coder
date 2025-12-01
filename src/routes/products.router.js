import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

// GET paginación / filtros
router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  const data = await productManager.getProductsPaginated({
    limit: parseInt(limit),
    page: parseInt(page),
    sort,
    query,
  });

  const buildLink = (pg) =>
    pg ? `/products?limit=${limit}&page=${pg}&sort=${sort || ""}&query=${query || ""}` : null;

  res.json({
    status: "success",
    payload: data.docs,
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    page: data.page,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevLink: buildLink(data.prevPage),
    nextLink: buildLink(data.nextPage),
  });
});

// POST crear producto
router.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
