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
    // Dynamic routes (Product, Legal) handle their own titles

    if (!path.startsWith('/phones/') && !['/privacy', '/terms', '/legal'].includes(path)) {
      document.title = title;
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="app">
        <PageTitleUpdater />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phones/:id" element={<ProductPage />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/legal" element={<Legal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
