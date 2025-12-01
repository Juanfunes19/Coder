import Product from "../models/Product.js";

export default class ProductManager {
  async getProductsPaginated({ limit, page, sort, query }) {
    let filter = {};

    if (query) {
      if (query === "available") {
        filter = { status: true };
      } else {
        filter = { category: query };
      }
    }

    const limitNum = parseInt(limit) || 10;
    const pageNum = parseInt(page) || 1;

    const options = {
      limit: limitNum,
      page: pageNum,
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
      lean: true,
    };

    if (Product.paginate) {
      return await Product.paginate(filter, options);
    }

    return await this._paginateManually(filter, limitNum, pageNum, sort);
  }

  async _paginateManually(filter, limit, page, sort) {
    let products = await Product.find(filter).lean();

    if (sort) {
      products.sort((a, b) => {
        return sort === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    const total = products.length;
    const totalPages = Math.ceil(total / limit) || 1;

    const start = (page - 1) * limit;
    const end = start + limit;
    const docs = products.slice(start, end);

    return {
      docs,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
    };
  }
}
