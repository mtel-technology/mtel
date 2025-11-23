import React, { useState } from 'react';
import { Globe, Send } from 'lucide-react';
import { supabase } from '../supabase';
import './Services.css';

const Services = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: 'Website Development',
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
                .from('service_requests')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        service_type: formData.serviceType,
                        message: formData.message
                    }
                ]);

            if (error) throw error;

            alert(`Thank you, ${formData.name}! We have received your application for ${formData.serviceType}. We will contact you shortly.`);
            setFormData({ name: '', email: '', phone: '', serviceType: 'Website Development', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your request. Please try again.');
        }
    };

    return (
        <div className="services-page section-padding">
            <div className="container">
                <div className="services-header text-center">
                    <h1 className="section-title">Digital Solutions.</h1>
                    <p className="services-subtitle">We build premium digital experiences for your business.</p>
                </div>

                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon"><Globe size={40} /></div>
                        <h3>Website Development</h3>
                        <p>Custom, high-performance websites tailored to your brand. From landing pages to complex web applications.</p>
                    </div>
                </div>

                <div className="application-section">
                    <div className="application-content">
                        <h2>Start Your Project</h2>
                        <p>Ready to bring your ideas to life? Fill out the form below and let's build something amazing together.</p>

                        <form className="application-form" onSubmit={handleSubmit}>
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
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="07X XXXXXXX"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Service Type</label>
                                <select
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                >
                                    <option>Website Development</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Project Details</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Tell us about your project..."
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Submit Application <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
