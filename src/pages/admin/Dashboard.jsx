import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, FileText, Mail } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const menuItems = [
        {
            title: 'Products',
            description: 'Manage your product catalog',
            icon: Package,
            path: '/admin/products',
            color: '#3b82f6'
        },
        {
            title: 'Orders',
            description: 'View and manage customer orders',
            icon: ShoppingCart,
            path: '/admin/orders',
            color: '#10b981'
        },
        {
            title: 'Service Requests',
            description: 'View service inquiries',
            icon: FileText,
            path: '/admin/services',
            color: '#f59e0b'
        },
        {
            title: 'Contact Messages',
            description: 'View customer messages',
            icon: Mail,
            path: '/admin/contacts',
            color: '#8b5cf6'
        }
    ];

    return (
        <div className="admin-dashboard">
            <div className="container section-padding">
                <div className="dashboard-grid">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="dashboard-card"
                            style={{ '--card-color': item.color }}
                        >
                            <div className="card-icon">
                                <item.icon size={32} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
