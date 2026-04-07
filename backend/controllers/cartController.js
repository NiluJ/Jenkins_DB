const db = require("../db");

const getCart = async (req, res) => {
  console.log("Cart requested");

  try {
    const [rows] = await db.query("SELECT * FROM cart");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to read cart" });
  }
};

const getCartTotal = async (req, res) => {
  console.log("Cart total requested");

  try {
    const [rows] = await db.query(
      "SELECT SUM(price * quantity) AS total FROM cart"
    );

    const total = rows[0].total || 0;

    console.log(`Updated total: $${total.toFixed(2)}`);

    res.json({ total: total.toFixed(2) });

  } catch (err) {
    res.status(500).json({ error: "Failed to calculate total" });
  }
};

const addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const [products] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = products[0];

    const [existing] = await db.query(
      "SELECT * FROM cart WHERE id = ?",
      [productId]
    );

    if (existing.length > 0) {
      await db.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE id = ?",
        [productId]
      );
    } else {
      await db.query(
        `INSERT INTO cart (id, name, price, image, category, quantity)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          product.id,
          product.name,
          product.price,
          product.image,
          product.category,
          1
        ]
      );
    }

    const [cart] = await db.query("SELECT * FROM cart");

    res.json({ message: "Product added to cart", cart });

  } catch (err) {
    res.status(500).json({ error: "Failed to update cart" });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    await db.query("DELETE FROM cart WHERE id = ?", [productId]);

    const [cart] = await db.query("SELECT * FROM cart");

    res.json({ message: "Product removed from cart", cart });

  } catch (err) {
    res.status(500).json({ error: "Failed to remove product" });
  }
};

module.exports = {
  getCart,
  getCartTotal,
  addToCart,
  removeFromCart
};