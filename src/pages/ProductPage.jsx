import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabase';
import './ProductDetail.css';

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = React.useState(1);
    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (data) setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    React.useEffect(() => {
        if (product) {
            document.title = `${product.name} - MTEL`;
        }
    }, [product]);

    if (loading) {
        return (
            <div className="container section-padding text-center">
                <p>Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container section-padding text-center">
                <h1>Product not found</h1>
                <Link to="/store" className="btn btn-primary mt-md">Go to Store</Link>
            </div>
        );
    }

    return (
        <div className="product-detail">
            <div className="container pt-xl">
                <Link to="/store" className="back-link">
                    <ArrowLeft size={20} /> Back to Store
                </Link>
            </div>

            <section className="product-section">
                <div className="container">
                    <div className="product-layout">
                        <motion.div
                            className="product-info"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {product.badge && <span className="product-badge">{product.badge}</span>}
                            <h1 className="product-title">{product.name}</h1>
                            <h2 className="product-tagline">{product.tagline}</h2>
                            <p className="product-desc">{product.description}</p>
                            <div className="product-price">
                                {product.price === 'Coming Soon' ? 'Coming Soon' : `LKR ${product.price}`}
                            </div>

                            <div className="specs-list">
                                {product.specs.map((spec, index) => (
                                    <div key={index} className="spec-pill">{spec}</div>
                                ))}
                            </div>

                            {product.price === 'Coming Soon' ? (
                                <Link to="/contact" className="btn btn-primary mt-md">
                                    Notify Me
                                </Link>
                            ) : (
                                <div className="product-actions">
                                    <div className="quantity-selector">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="qty-btn"
                                        >
                                            <Minus size={20} />
                                        </button>
                                        <span className="qty-display">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="qty-btn"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => addToCart(product, quantity)}
                                        className="btn btn-primary"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            className="product-visual"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <img src={product.image} alt={product.name} />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductPage;
