import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page section-padding">
            <div className="container">
                <div className="about-content">
                    <h1 className="section-title">We are MTEL.</h1>
                    <p className="about-lead">Pushing the boundaries of what's possible.</p>

                    <div className="about-grid">
                        <div className="about-text">
                            <h2>Our Story</h2>
                            <p>Founded in 2024, MTEL was born from a simple idea: technology should be invisible, yet powerful. We believe in crafting devices that not only look beautiful but feel natural to use.</p>
                        </div>
                        <div className="about-stat">
                            <h3>10M+</h3>
                            <p>Happy Users</p>
                        </div>
                        <div className="about-stat">
                            <h3>50+</h3>
                            <p>Countries</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
