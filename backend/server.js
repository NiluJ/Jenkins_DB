const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const path = require("path");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('API endpoints available:');
  console.log('  GET  /api/products');
  console.log('  GET  /api/categories');
  console.log('  GET  /api/cart');
  console.log('  GET  /api/cart/total');
  console.log('  POST /api/cart/add');
  console.log('  POST /api/cart/remove');
});
