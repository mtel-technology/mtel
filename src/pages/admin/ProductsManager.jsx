import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import './ProductsManager.css';

const ProductsManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        tagline: '',
        description: '',
        price: '',
        image: '',
        specs: '',
        badge: '',
        is_new: false
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('id');

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Error loading products');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (file) => {
        if (!file) return null;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = formData.image;
        if (imageFile) {
            imageUrl = await handleImageUpload(imageFile);
            if (!imageUrl) return;
        }

        const specsArray = formData.specs.split(',').map(s => s.trim()).filter(s => s);

        const productData = {
            id: formData.id,
            name: formData.name,
            tagline: formData.tagline,
            description: formData.description,
            price: formData.price,
            image: imageUrl,
            specs: specsArray,
            badge: formData.badge,
            is_new: formData.is_new
        };

        try {
            if (editingProduct) {
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', editingProduct.id);

                if (error) throw error;
                alert('Product updated successfully!');
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([productData]);

                if (error) throw error;
                alert('Product added successfully!');
            }

            resetForm();
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error saving product: ' + error.message);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            id: product.id,
            name: product.name,
            tagline: product.tagline,
            description: product.description,
            price: product.price,
            image: product.image,
            specs: product.specs.join(', '),
            badge: product.badge || '',
            is_new: product.is_new || false
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
            alert('Product deleted successfully!');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product: ' + error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            tagline: '',
            description: '',
            price: '',
            image: '',
            specs: '',
            badge: '',
            is_new: false
        });
        setImageFile(null);
        setEditingProduct(null);
        setShowAddForm(false);
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="container section-padding text-center">
                    <p>Loading products...</p>
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
                            <h1>Products Management</h1>
                        </div>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="btn btn-primary"
                        >
                            <Plus size={20} />
                            Add Product
                        </button>
                    </div>
                </div>
            </div>

            <div className="container section-padding">
                {showAddForm && (
                    <div className="form-card">
                        <div className="form-header">
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={resetForm} className="btn-icon">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Product ID *</label>
                                    <input
                                        type="text"
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        placeholder="e.g., m1"
                                        required
                                        disabled={editingProduct}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g., MTEL M1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tagline *</label>
                                <input
                                    type="text"
                                    value={formData.tagline}
                                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                    placeholder="e.g., Compact. Reliable. Powerful."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Product description"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price *</label>
                                    <input
                                        type="text"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="e.g., 3,299 or Coming Soon"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Badge</label>
                                    <input
                                        type="text"
                                        value={formData.badge}
                                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                        placeholder="e.g., Best Seller"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Specs (comma-separated) *</label>
                                <input
                                    type="text"
                                    value={formData.specs}
                                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                                    placeholder="e.g., 1.77&quot; Display, 1000mAh Battery, FM Radio"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                                {formData.image && !imageFile && (
                                    <p className="image-preview-text">Current: {formData.image}</p>
                                )}
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_new}
                                        onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                                    />
                                    Mark as New Product
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="button" onClick={resetForm} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={uploading}>
                                    <Save size={20} />
                                    {uploading ? 'Uploading...' : editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="products-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Badge</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image} alt={product.name} className="product-thumb" />
                                    </td>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.badge || '-'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="btn-icon btn-edit"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="btn-icon btn-delete"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
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

export default ProductsManager;
