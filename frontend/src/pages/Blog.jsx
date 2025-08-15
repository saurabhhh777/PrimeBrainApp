import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import DarkModeBtn from "../components/Buttons/DarkModeBtn";
import { userAuthStore } from "../../store/userAuthStore";
import { axiosInstance } from "../../lib/axios.jsx";

const Blog = () => {
  const { isDarkMode, Authuser } = userAuthStore();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    tags: '',
    image: ''
  });

  // Fetch blogs from backend
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/blog/');
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const blogData = {
        ...formData,
        tags: tagsArray
      };
      
      await axiosInstance.post('/api/v1/blog/create', blogData);
      setShowCreateForm(false);
      setFormData({ title: '', description: '', content: '', tags: '', image: '' });
      fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axiosInstance.delete(`/api/v1/blog/${blogId}`);
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Page Title, Home Button and Dark Mode Button */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? "bg-gray-700 text-white hover:bg-gray-600" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ← Home
            </Link>
            <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Blogs
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {Authuser && (
              <button
                onClick={() => setShowCreateForm(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <Plus size={20} />
                Write Blog
              </button>
            )}
            <DarkModeBtn />
          </div>
        </div>

        {/* Create Blog Form */}
        {showCreateForm && (
          <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
            <div className={`w-full max-w-2xl p-6 rounded-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}>
              <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
              <form onSubmit={handleCreateBlog} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows="6"
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="React, JavaScript, Frontend"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL (optional)</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-lg font-medium ${
                      isDarkMode 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Create Blog
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      isDarkMode 
                        ? "bg-gray-600 text-white hover:bg-gray-700" 
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.length === 0 ? (
                <div className={`col-span-full text-center py-12 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <p className="text-lg">No blogs found. {Authuser && "Be the first to write one!"}</p>
                </div>
              ) : (
                blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                      isDarkMode 
                        ? "bg-gray-700 border border-gray-600" 
                        : "bg-white"
                    }`}
                  >
                    {/* Blog Image */}
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Blog Content */}
                    <div className="p-6">
                      {/* Blog Title */}
                      <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {blog.title}
                      </h2>

                      {/* Blog Description */}
                      <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {blog.description}
                      </p>

                      {/* Blog Metadata */}
                      <div className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <span>By {blog.author?.fullname || 'Unknown'}</span> | <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>

                      {/* Blog Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags && blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-sm ${
                              isDarkMode 
                                ? "bg-gray-600 text-gray-200" 
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons for Author */}
                      {Authuser && blog.author?._id === Authuser.user?._id && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                              isDarkMode 
                                ? "bg-red-600 text-white hover:bg-red-700" 
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;