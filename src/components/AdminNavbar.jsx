import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Package, ShoppingCart, FileText, Mail, LayoutDashboard } from 'lucide-react';
import './AdminNavbar.css';

const AdminNavbar = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/products', label: 'Products', icon: Package },
        { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
        { path: '/admin/services', label: 'Services', icon: FileText },
        { path: '/admin/contacts', label: 'Messages', icon: Mail }
    ];

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <nav className="admin-navbar">
            <div className="admin-nav-container">
                <div className="admin-nav-brand">
                    <Link to="/admin">
                        <h2>MTEL Admin</h2>
                    </Link>
                </div>

                <div className="admin-nav-links">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`admin-nav-link ${isActive ? 'active' : ''}`}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <button onClick={handleLogout} className="admin-logout-btn">
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
