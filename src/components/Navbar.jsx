import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Store as StoreIcon, ShoppingBag, Package, User, Wrench } from 'lucide-react';
import logo from '../assets/logo.png';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { getCartCount } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-content">
                    <Link to="/" className="logo">
                        <img src={logo} alt="MTEL" />
                    </Link>

                    <div className="desktop-links">
                        <Link to="/">Home</Link>
                        <Link to="/store">Store</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/support">Support</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </div>

                    <div className="nav-icons">
                        <Link to="/track-order" className="icon-btn" title="Track Order">
                            <Package size={20} />
                        </Link>
                        <Link to="/cart" className="icon-btn cart-icon-btn" title="Shopping Cart">
                            <ShoppingBag size={20} />
                            {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <div className="mobile-bottom-nav">
                <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                    <Home size={24} />
                    <span>Home</span>
                </Link>
                <Link to="/store" className={`nav-item ${location.pathname === '/store' ? 'active' : ''}`}>
                    <StoreIcon size={24} />
                    <span>Shop</span>
                </Link>
                <Link to="/track-order" className={`nav-item ${location.pathname === '/track-order' ? 'active' : ''}`}>
                    <Package size={24} />
                    <span>Track</span>
                </Link>
                <Link to="/services" className={`nav-item ${location.pathname === '/services' ? 'active' : ''}`}>
                    <Wrench size={24} />
                    <span>Services</span>
                </Link>
                <Link to="/cart" className={`nav-item ${location.pathname === '/cart' ? 'active' : ''}`}>
                    <div className="cart-icon-wrapper">
                        <ShoppingBag size={24} />
                        {getCartCount() > 0 && <span className="mobile-cart-badge">{getCartCount()}</span>}
                    </div>
                    <span>Cart</span>
                </Link>
                <Link to="/contact" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
                    <User size={24} />
                    <span>Contact</span>
                </Link>
            </div>
        </>
    );
};

export default Navbar;
