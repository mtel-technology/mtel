import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message
                    }
                ]);

            if (error) {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again.');
            } else {
                setShowSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again.');
        }
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
    };

    return (
        <div className="contact-page section-padding">
            <div className="container">
                <h1 className="section-title">Get in Touch.</h1>
                <p className="contact-subtitle">We'd love to hear from you.</p>

                {showSuccess && (
                    <div className="success-message">
                        <CheckCircle size={48} className="success-icon" />
                        <h2>Message Sent Successfully!</h2>
                        <p>Thank you for contacting us. We will get back to you shortly.</p>
                        <button onClick={handleCloseSuccess} className="btn btn-secondary">
                            Send another message
                        </button>
                    </div>
                )}

                <div className="contact-grid">
                    <div className="contact-info">
                        <div className="info-item">
                            <div className="icon-box"><Phone size={24} /></div>
                            <div>
                                <h3>Phone</h3>
                                <p>0777255964</p>
                                <p>Mon-Fri 9am-6pm</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box"><Mail size={24} /></div>
                            <div>
                                <h3>Email</h3>
                                <p>muhammad@wt.lk</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box"><MapPin size={24} /></div>
                            <div>
                                <h3>Headquarters</h3>
                                <p>154 Main Street</p>
                                <p>Colombo 11, Sri Lanka</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                            >
                                <option>General Inquiry</option>
                                <option>Support</option>
                                <option>Sales</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                placeholder="How can we help?"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>

            {showSuccess && (
                <div className="success-modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon">
                            <CheckCircle size={64} />
                        </div>
                        <h2>Message Sent!</h2>
                        <p>Thank you for contacting us.</p>
                        <p>We will get back to you as soon as possible.</p>

                        <button onClick={handleCloseSuccess} className="btn btn-primary">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
