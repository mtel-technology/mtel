import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, Battery, Zap } from 'lucide-react';
import './Features.css';

const features = [
    {
        icon: <Battery size={40} />,
        title: "Long Lasting Battery",
        desc: "Stay connected for days with extended battery life up to 2500mAh."
    },
    {
        icon: <Zap size={40} />,
        title: "Durable Design",
        desc: "Built to last. Tough, reliable, and ready for everyday use."
    },
    {
        icon: <Cpu size={40} />,
        title: "Dual & Triple Sim",
        desc: "Manage your work and personal life easily with multi-sim support."
    },
    {
        icon: <Camera size={40} />,
        title: "Entertainment",
        desc: "Wireless FM Radio, Music Player, and Camera for your daily needs."
    }
];

const Features = () => {
    return (
        <section className="features section-padding">
            <div className="container">
                <div className="features-header">
                    <h2 className="text-gradient">Highlights.</h2>
                    <p>Everything you need. And then some.</p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
