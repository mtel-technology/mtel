import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="cart-page section-padding">
                <div className="container text-center">
                    <h1 className="section-title">Your Bag is Empty</h1>
                    <p className="cart-empty-text">Looks like you haven't added anything to your bag yet.</p>
                    <Link to="/store" className="btn btn-primary mt-lg">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page section-padding">
            <div className="container">
                <h1 className="section-title">Shopping Bag</h1>

                <div className="cart-grid">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <div className="item-header">
                                        <h3>{item.name}</h3>
                                        <p className="item-price">{item.price}</p>
                                    </div>
                                    <div className="item-controls">
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="qty-btn"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="qty-btn"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="remove-btn"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>LKR {getCartTotal().toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>LKR {getCartTotal().toLocaleString()}</span>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="btn btn-primary btn-block checkout-btn"
                        >
                            Proceed to Checkout <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
