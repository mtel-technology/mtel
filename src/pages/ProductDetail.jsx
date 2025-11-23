import React from 'react';
import { motion } from 'framer-motion';
import m1Image from '../assets/m1-render.png';
import m10Image from '../assets/m10-render.png';
import m1TypeCImage from '../assets/m1-typec.png';
import './ProductDetail.css';

const ProductDetail = () => {
    return (
        <div className="product-detail">
            {/* MTEL M1 Section */}
            <section className="product-section">
                <div className="container">
                    <div className="product-layout">
                        <motion.div
                            className="product-info"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="product-badge">Features Phone</span>
                            <h1 className="product-title">MTEL M1</h1>
                            <p className="product-desc">Compact and reliable smartphone with essential features for everyday use.</p>
                            <div className="product-price">LKR 3,299</div>

                            <div className="specs-list">
                                <div className="spec-pill">1.77" Display</div>
                                <div className="spec-pill">1000mAh Battery</div>
                                <div className="spec-pill">FM Radio</div>
                                <div className="spec-pill">Bluetooth</div>
                                <div className="spec-pill">Dual Sim</div>
                            </div>

                            <button className="btn btn-primary mt-md">Buy Now</button>
                        </motion.div>

                        <motion.div
                            className="product-visual"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <img src={m1Image} alt="MTEL M1" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* MTEL M10 Section */}
            <section className="product-section alt-bg">
                <div className="container">
                    <div className="product-layout reverse">
                        <motion.div
                            className="product-info"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="product-badge">Coming Soon</span>
                            <h1 className="product-title">MTEL M10</h1>
                            <p className="product-desc">Advanced smartphone with larger display and extended battery life.</p>

                            <div className="specs-list">
                                <div className="spec-pill">2.4" Display</div>
                                <div className="spec-pill">2500mAh Battery</div>
                                <div className="spec-pill">FM Radio</div>
                                <div className="spec-pill">Bluetooth</div>
                                <div className="spec-pill">Triple Sim</div>
                            </div>

                            <button className="btn btn-secondary mt-md" disabled>Notify Me</button>
                        </motion.div>

                        <motion.div
                            className="product-visual"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <img src={m10Image} alt="MTEL M10" />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
