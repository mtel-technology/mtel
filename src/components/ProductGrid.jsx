import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useCart } from '../context/CartContext';
import { supabase } from '../supabase';
import './ProductGrid.css';

const ProductGrid = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('id');

                if (data) setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="product-grid-section section-padding">
            <div className="container">
                <h2 className="section-title text-center mb-xl">Explore the Series</h2>

                <div className="product-grid">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="product-card-minimal"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="card-image-container">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-desc">{product.tagline}</p>

                            {product.price !== "Coming Soon" && (
                                <div className="card-actions">
                                    <Link to={`/phones/${product.id}`} className="btn btn-secondary btn-sm">Learn more</Link>
                                    <button onClick={() => addToCart(product)} className="btn btn-primary btn-sm">Add to Cart</button>
                                </div>
                            )}
                            {product.price === "Coming Soon" && (
                                <div className="card-actions">
                                    <Link to={`/phones/${product.id}`} className="btn btn-secondary btn-sm">Learn more</Link>
                                    <span className="coming-soon-text">Coming Soon</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
