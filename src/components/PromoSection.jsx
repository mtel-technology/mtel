import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PromoSection.css';

const PromoSection = ({
    image,
    title,
    subtitle,
    badge,
    reverse = false,
    bgColor = "#f5f5f7",
    textColor = "#1d1d1f",
    linkTo
}) => {
    return (
        <section className="promo-section section-padding">
            <div className="container">
                <div className="promo-card" style={{ backgroundColor: bgColor, flexDirection: reverse ? 'row-reverse' : 'row' }}>
                    <motion.div
                        className={`promo-image-col ${reverse ? 'reverse' : ''}`}
                        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src={image} alt={title} className="promo-image" />
                    </motion.div>

                    <motion.div
                        className="promo-text-col"
                        style={{ color: textColor }}
                        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {badge && <span className="promo-badge">{badge}</span>}
                        <h2 className="promo-title">{title}</h2>
                        <h3 className="promo-subtitle">{subtitle}</h3>

                        <div className="promo-buttons">
                            <Link to={linkTo} className="btn btn-outline" style={{ borderColor: textColor, color: textColor }}>Learn more</Link>
                            <Link to={linkTo} className="btn btn-black">View Details</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;
