import React from 'react';
import { Search, Book, MessageCircle, Wrench } from 'lucide-react';
import './Support.css';

const Support = () => {
    return (
        <div className="support-page">
            <section className="support-hero">
                <div className="container">
                    <h1>MTEL Support</h1>
                    <div className="search-box">
                        <Search className="search-icon" />
                        <input type="text" placeholder="Search for topics..." />
                    </div>
                </div>
            </section>

            <section className="support-topics section-padding">
                <div className="container">
                    <div className="topics-grid">
                        <div className="topic-card">
                            <Book size={32} />
                            <h3>Manuals</h3>
                            <p>Find user guides for your device.</p>
                        </div>
                        <div className="topic-card">
                            <Wrench size={32} />
                            <h3>Repairs</h3>
                            <p>Check warranty and repair status.</p>
                        </div>
                        <div className="topic-card">
                            <MessageCircle size={32} />
                            <h3>Community</h3>
                            <p>Join the discussion with other users.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Support;
