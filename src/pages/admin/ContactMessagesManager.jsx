import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import { ArrowLeft, Trash2 } from 'lucide-react';
import '../admin/ProductsManager.css';

const ContactMessagesManager = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            alert('Error loading contact messages');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Error deleting message');
        }
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="container section-padding text-center">
                    <p>Loading contact messages...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="container">
                    <div className="header-content">
                        <div>
                            <Link to="/admin" className="back-link">
                                <ArrowLeft size={20} /> Back to Dashboard
                            </Link>
                            <h1>Contact Messages</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container section-padding">
                <div className="products-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message) => (
                                <tr key={message.id}>
                                    <td>#{message.id}</td>
                                    <td>{message.name}</td>
                                    <td>{message.email}</td>
                                    <td>{message.subject}</td>
                                    <td className="message-cell">{message.message}</td>
                                    <td>{new Date(message.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(message.id)}
                                            className="btn-icon btn-delete"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactMessagesManager;
