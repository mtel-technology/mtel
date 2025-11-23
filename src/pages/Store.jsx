import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useCart } from '../context/CartContext';
import { supabase } from '../supabase';
import './Store.css';

const Store = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('id');

                if (error) throw error;
                if (data) setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="store-page section-padding">
                <div className="container text-center">
                    <p>Loading store...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="store-page section-padding">
            <div className="container">
                <h1 className="section-title">Store. <span className="text-secondary">Reliable phones for everyone.</span></h1>

                <div className="store-grid">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="store-card"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="store-tag">{product.badge}</div>
                            <Link to={`/phones/${product.id}`} className="store-image-container">
                                <img src={product.image} alt={product.name} className="store-product-img" />
                            </Link>
                            <h3>{product.name}</h3>
                            <p className="store-desc">{product.description}</p>
                            <p className="store-price">{product.price === "Coming Soon" ? product.price : `LKR ${product.price}`}</p>
                            <div className="store-actions">
                                <Link to={`/phones/${product.id}`} className="btn btn-secondary btn-sm">
                                    View Details
                                </Link>
                                {product.price !== "Coming Soon" && (
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Store;
