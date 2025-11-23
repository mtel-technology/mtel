import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Package, Truck, CheckCircle, XCircle, Search } from 'lucide-react';
import './OrderTracking.css';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setOrder(null);
        setOrderItems([]);
        setLoading(true);

        try {
            // Fetch order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .eq('email', email)
                .single();

            if (orderError) {
                setError('Order not found. Please check your Order ID and Email.');
                setLoading(false);
                return;
            }

            setOrder(orderData);

            // Fetch order items
            const { data: itemsData, error: itemsError } = await supabase
                .from('order_items')
                .select('*')
                .eq('order_id', orderId);

            if (!itemsError && itemsData) {
                setOrderItems(itemsData);
            }
        } catch (err) {
            console.error('Error fetching order:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Package className="status-icon pending" />;
            case 'processing':
                return <Truck className="status-icon processing" />;
            case 'completed':
                return <CheckCircle className="status-icon completed" />;
            case 'cancelled':
                return <XCircle className="status-icon cancelled" />;
            default:
                return <Package className="status-icon" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Order Received';
            case 'processing':
                return 'Processing';
            case 'completed':
                return 'Delivered';
            case 'cancelled':
                return 'Cancelled';
            default:
                return status;
        }
    };

    return (
        <div className="order-tracking-page section-padding">
            <div className="container">
                <h1 className="section-title">Track Your Order</h1>
                <p className="section-subtitle">Enter your order details to check the status</p>

                <div className="tracking-form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Order ID</label>
                                <input
                                    type="number"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    placeholder="e.g., 12345"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            <Search size={20} />
                            {loading ? 'Searching...' : 'Track Order'}
                        </button>
                    </form>
                </div>

                {order && (
                    <div className="order-details-card">
                        <div className="order-header">
                            <div>
                                <h2>Order #{order.id}</h2>
                                <p className="order-date">
                                    Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="order-status">
                                {getStatusIcon(order.status)}
                                <span className={`status-text ${order.status}`}>
                                    {getStatusText(order.status)}
                                </span>
                            </div>
                        </div>

                        <div className="order-timeline">
                            <div className={`timeline-step ${['pending', 'processing', 'completed'].includes(order.status) ? 'active' : ''}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <h4>Order Placed</h4>
                                    <p>We have received your order</p>
                                </div>
                            </div>
                            <div className={`timeline-step ${['processing', 'completed'].includes(order.status) ? 'active' : ''}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <h4>Processing</h4>
                                    <p>Your order is being prepared</p>
                                </div>
                            </div>
                            <div className={`timeline-step ${order.status === 'completed' ? 'active' : ''}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <h4>Delivered</h4>
                                    <p>Order has been delivered</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-info-grid">
                            <div className="info-section">
                                <h3>Customer Information</h3>
                                <p><strong>Name:</strong> {order.customer_name}</p>
                                <p><strong>Email:</strong> {order.email}</p>
                                <p><strong>Phone:</strong> {order.phone}</p>
                            </div>
                            <div className="info-section">
                                <h3>Delivery Address</h3>
                                <p>{order.address}</p>
                            </div>
                            <div className="info-section">
                                <h3>Payment Method</h3>
                                <p>{order.payment_method}</p>
                            </div>
                        </div>

                        <div className="order-items-section">
                            <h3>Order Items</h3>
                            <div className="items-list">
                                {orderItems.map((item) => (
                                    <div key={item.id} className="order-item">
                                        <div className="item-info">
                                            <h4>{item.product_name}</h4>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="item-price">
                                            <p>LKR {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="order-total">
                                <h3>Total Amount</h3>
                                <p className="total-price">LKR {order.total_amount?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTracking;
