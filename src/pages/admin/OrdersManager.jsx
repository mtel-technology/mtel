import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import { ArrowLeft, Eye, Package } from 'lucide-react';
import '../admin/ProductsManager.css';

const OrdersManager = () => {
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Error loading orders');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderItems = async (orderId) => {
        if (orderItems[orderId]) {
            setExpandedOrder(expandedOrder === orderId ? null : orderId);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('order_items')
                .select('*')
                .eq('order_id', orderId);

            if (error) throw error;
            setOrderItems(prev => ({ ...prev, [orderId]: data || [] }));
            setExpandedOrder(orderId);
        } catch (error) {
            console.error('Error fetching order items:', error);
            alert('Error loading order items');
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;
            fetchOrders();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating order status');
        }
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="container section-padding text-center">
                    <p>Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="container">
                    <div className="header-content">
                        <div>
                            <Link to="/admin" className="back-link">
                                <ArrowLeft size={20} /> Back to Dashboard
                            </Link>
                            <h1>Orders Management</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container section-padding">
                <div className="products-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <tr>
                                        <td>#{order.id}</td>
                                        <td>{order.customer_name}</td>
                                        <td>{order.email}</td>
                                        <td>{order.phone}</td>
                                        <td>LKR {order.total_amount?.toLocaleString()}</td>
                                        <td>{order.payment_method}</td>
                                        <td>
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                className="status-select"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                onClick={() => fetchOrderItems(order.id)}
                                                className="btn-icon"
                                                title="View Items"
                                            >
                                                {expandedOrder === order.id ? <Package size={18} /> : <Eye size={18} />}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedOrder === order.id && orderItems[order.id] && (
                                        <tr className="order-items-row">
                                            <td colSpan="9">
                                                <div className="order-items">
                                                    <h4>Order Items:</h4>
                                                    <table className="items-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Product</th>
                                                                <th>Quantity</th>
                                                                <th>Price</th>
                                                                <th>Subtotal</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {orderItems[order.id].map((item) => (
                                                                <tr key={item.id}>
                                                                    <td>{item.product_name}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>LKR {item.price?.toLocaleString()}</td>
                                                                    <td>LKR {(item.quantity * item.price)?.toLocaleString()}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <p><strong>Shipping Address:</strong> {order.address}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrdersManager;
