import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import { ArrowLeft, Trash2 } from 'lucide-react';
import '../admin/ProductsManager.css';

const ServiceRequestsManager = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data, error } = await supabase
                .from('service_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRequests(data || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
            alert('Error loading service requests');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this request?')) return;

        try {
            const { error } = await supabase
                .from('service_requests')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchRequests();
        } catch (error) {
            console.error('Error deleting request:', error);
            alert('Error deleting request');
        }
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="container section-padding text-center">
                    <p>Loading service requests...</p>
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
                            <h1>Service Requests</h1>
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
                                <th>Phone</th>
                                <th>Service Type</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>#{request.id}</td>
                                    <td>{request.name}</td>
                                    <td>{request.email}</td>
                                    <td>{request.phone}</td>
                                    <td>{request.service_type}</td>
                                    <td className="message-cell">{request.message}</td>
                                    <td>{new Date(request.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(request.id)}
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

export default ServiceRequestsManager;
