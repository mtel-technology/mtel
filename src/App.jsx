import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Store from './pages/Store';
import Support from './pages/Support';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Services from './pages/Services';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductsManager from './pages/admin/ProductsManager';
import OrdersManager from './pages/admin/OrdersManager';
import ServiceRequestsManager from './pages/admin/ServiceRequestsManager';
import ContactMessagesManager from './pages/admin/ContactMessagesManager';
import AdminLayout from './components/AdminLayout';
import './index.css';

function PageTitleUpdater() {
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    let title = 'MTEL - Premium Mobile Devices';

    if (path === '/') title = 'MTEL - Home';
    else if (path === '/store') title = 'MTEL - Store';
    else if (path === '/support') title = 'MTEL - Support';
    else if (path === '/about') title = 'MTEL - About Us';
    else if (path === '/contact') title = 'MTEL - Contact Us';
    else if (path === '/services') title = 'MTEL - Services';
    else if (path === '/cart') title = 'MTEL - Shopping Bag';
    else if (path === '/checkout') title = 'MTEL - Checkout';
    else if (path === '/track-order') title = 'Track Your Order - MTEL';
    else if (path === '/admin/login') title = 'Admin Login - MTEL';
    else if (path.startsWith('/admin')) title = 'Admin Panel - MTEL';
    // Dynamic routes (Product, Legal) handle their own titles

    if (!path.startsWith('/phones/') && !['/privacy', '/terms', '/legal'].includes(path)) {
      document.title = title;
    }
  }, [location]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      <PageTitleUpdater />
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phones/:id" element={<ProductPage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminLayout><ProductsManager /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminLayout><OrdersManager /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><AdminLayout><ServiceRequestsManager /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><AdminLayout><ContactMessagesManager /></AdminLayout></ProtectedRoute>} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
