import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCartTotal } from '../services/api';

function Navbar() {
  const [cartTotal, setCartTotal] = useState(0);

  const fetchCartTotal = async () => {
    try {
      const data = await getCartTotal();
      setCartTotal(data.total);
    } catch (error) {
      console.error('Error fetching cart total:', error);
    }
  };

  useEffect(() => {
  fetchCartTotal();

  const handleCartUpdate = () => {
    fetchCartTotal();
  };

  window.addEventListener("cartUpdated", handleCartUpdate);

  return () => {
    window.removeEventListener("cartUpdated", handleCartUpdate);
  };
}, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          TechStore
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link">
              <ShoppingCart size={20} />
              <span className="cart-total">${cartTotal}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
