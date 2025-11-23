import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h4>Shop and Learn</h4>
                        <ul>
                            <li><Link to="/store">Store</Link></li>
                            <li><Link to="/phones">Phones</Link></li>
                            <li><Link to="/accessories">Accessories</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/support">Community</Link></li>
                            <li><Link to="/support">Warranty</Link></li>
                            <li><Link to="/track-order">Track Order</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>About MTEL</h4>
                        <ul>
                            <li><Link to="/about">Newsroom</Link></li>
                            <li><Link to="/about">Leadership</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/investors">Investors</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Copyright © {new Date().getFullYear()} Walk & Talk Pvt Ltd . All rights reserved.</p>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Use</Link>
                        <Link to="/legal">Legal</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
