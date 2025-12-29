const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/productdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));


app.get('/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating, sort, page, limit } = req.query;
    let query = {};

    // Filters
    if (category) query.category = new RegExp(category, 'i');
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (minRating) query.rating = { $gte: parseFloat(minRating) };

    // Sort
    let sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;

    // Pagination
    let pageNum = parseInt(page) || 1;
    let limitNum = parseInt(limit) || 10;
    let skip = (pageNum - 1) * limitNum;

    let products = await Product.find(query).sort(sortOption).skip(skip).limit(limitNum);
    let total = await Product.countDocuments(query);
    let totalPages = Math.ceil(total / limitNum);

    if (products.length === 0) {
      return res.json({ message: "No products found" });
    }
    res.json({ products, total, totalPages, page: pageNum, limit: limitNum });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// b) Fetch products by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ message: "No products found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/products/search', async (req, res) => {
  try {
    const { name, brand, category } = req.query;
    let query = {};

    if (name) query.productName = new RegExp(name, 'i');
    if (brand) query.brand = new RegExp(brand, 'i');
    if (category) query.category = new RegExp(category, 'i');

    const products = await Product.find(query);
    if (products.length === 0) {
      return res.json({ message: "No products found" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));