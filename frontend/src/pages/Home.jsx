import { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { getProducts, addToCart } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
  try {
    await addToCart(productId);

    window.dispatchEvent(new Event("cartUpdated"));

    alert('Product added to cart!');
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

  const bestSellers = products.filter(p => p.bestSeller);
  const latestProducts = products.filter(p => p.latest);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <HeroBanner />
      <Categories />

      <section className="products-section">
        <h2 className="section-title">Best Sellers</h2>
        <div className="products-grid">
          {bestSellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">Latest Products</h2>
        <div className="products-grid">
          {latestProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TechStore</h3>
            <p>Premium tech accessories for modern professionals</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Shipping Info</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>FAQs</li>
              <li>Returns</li>
              <li>Warranty</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TechStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
