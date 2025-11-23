import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });

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

            if (error) throw error;

            alert('Message sent! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again.');
        }
    };

    return (
        <div className="contact-page section-padding">
            <div className="container">
                <h1 className="section-title">Get in Touch.</h1>
                <p className="contact-subtitle">We'd love to hear from you.</p>

                <div className="contact-grid">
                    <div className="contact-info">
                        <div className="info-item">
                            <div className="icon-box"><Phone size={24} /></div>
                            <div>
                                <h3>Phone</h3>
                                <p>+94 11 234 5678</p>
                                <p>Mon-Fri 9am-6pm</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box"><Mail size={24} /></div>
                            <div>
                                <h3>Email</h3>
                                <p>support@mtel.lk</p>
                                <p>sales@mtel.lk</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box"><MapPin size={24} /></div>
                            <div>
                                <h3>Headquarters</h3>
                                <p>123 Tech Avenue,</p>
                                <p>Colombo 03, Sri Lanka</p>
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
        </div>
    );
};

export default Contact;
