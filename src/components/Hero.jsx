import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import heroImage from '../assets/m1-render.png';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hero-text"
                >
                    <h2 className="hero-new">Best Seller</h2>
                    <h1 className="hero-title text-gradient">MTEL M1</h1>
                    <p className="hero-subtitle">Compact. Reliable. Powerful.</p>

                    <div className="hero-cta">
                        <Link to="/phones/m1" className="btn btn-primary">
                            Buy Now <ChevronRight size={16} />
                        </Link>
                        <Link to="/phones/m1" className="btn btn-secondary">View Specs</Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="hero-image-container"
                >
                    <img src={heroImage} alt="MTEL M1" className="hero-image" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
