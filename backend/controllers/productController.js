const db = require("../db");

const getProducts = async (req, res) => {
  console.log("Products requested");

  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getCategories = async (req, res) => {
  console.log("Categories requested");

  try {
    const [rows] = await db.query("SELECT DISTINCT category FROM products");

    const categories = rows.map(row => row.category);

    res.json(categories);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

module.exports = {
  getProducts,
  getCategories
};