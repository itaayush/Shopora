import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import { toast } from 'react-toastify';
import axios from 'axios';
import './header.css';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const totalItems = cart?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/auth/logout');
      setAuth({
        ...auth,
        user: null,
        token: null,
      });
      localStorage.removeItem('auth');
      toast.success('Logout Successfully');
      setMenuOpen(false);
      setDropdownOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          <FaShoppingBasket />
          <span>Shopora</span>
        </NavLink>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" onClick={() => setMenuOpen(false)}>
                Category
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
                Cart ({totalItems})
              </NavLink>
            </li>
            {!auth?.user ? (
              <>
                <li>
                  <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="user-dropdown">
                <button
                  className="user-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {auth?.user?.name}
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to="/dashboard/user"
                        onClick={() => {
                          setMenuOpen(false);
                          setDropdownOpen(false);
                        }}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="logout-btn"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
