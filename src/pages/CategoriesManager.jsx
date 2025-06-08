// CategoriesManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../services/adminService';

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', color: '#000000' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories(currentPage, 10);
      setCategories(response.data.categories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createCategory(newCategory);
      setNewCategory({ name: '', description: '', color: '#000000' });
      setSuccess('Category created successfully');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Failed to create category. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateCategory(editingCategory._id, editingCategory);
      setSuccess('Category updated successfully');
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Failed to update category. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        setLoading(true);
        await deleteCategory(categoryId);
        setSuccess('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        setError('Failed to delete category. Please try again.');
      } finally {
        setLoading(false);
        setTimeout(() => {
          setSuccess('');
          setError('');
        }, 3000);
      }
    }
  };

  const handleInputChange = (e, isEditMode = false) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setEditingCategory({
        ...editingCategory,
        [name]: value
      });
    } else {
      setNewCategory({
        ...newCategory,
        [name]: value
      });
    }
  };

  return (
    <div className="categories-manager">
      <h1>Manage Categories</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="categories-form-container">
        <h2>Add New Category</h2>
        <form onSubmit={handleCreateCategory}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCategory.name}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newCategory.description}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input
              type="color"
              id="color"
              name="color"
              value={newCategory.color}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>
      
      <div className="categories-list">
        <h2>Existing Categories</h2>
        
        {loading && <div className="loading">Loading categories...</div>}
        
        {!loading && categories.length === 0 && (
          <p>No categories found.</p>
        )}
        
        {!loading && categories.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <div 
                      className="color-preview" 
                      style={{ backgroundColor: category.color, width: '20px', height: '20px', borderRadius: '50%' }}
                    />
                  </td>
                  <td>
                    <button 
                      onClick={() => setEditingCategory(category)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(category._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      
      {editingCategory && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Category</h2>
            <form onSubmit={handleUpdateCategory}>
              <div className="form-group">
                <label htmlFor="edit-name">Name</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editingCategory.name}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={editingCategory.description}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-color">Color</label>
                <input
                  type="color"
                  id="edit-color"
                  name="color"
                  value={editingCategory.color}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>
              
              <div className="modal-actions">
                <button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setEditingCategory(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManager;