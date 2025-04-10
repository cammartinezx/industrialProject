import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../../constants/index.js';
import Button from '../design/Button.jsx';
import Button2 from '../design/Button2.jsx';

const PromptManager = ({ courseId }) => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  // Fetch prompts when component mounts
  useEffect(() => {
    fetchPrompts();
  }, [courseId]);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/course/${courseId}/get-prompts`);
      console.log(response.data.prompts);
      setPrompts(response.data.prompts || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching prompts:', err);
      setError('Failed to load prompts');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPrompt = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/course/add-prompt`, {
        course_id: courseId,
        title: formData.title,
        description: formData.description
      });
      
      // Reset form and refresh prompts
      setFormData({ title: '', description: '' });
      setShowAddForm(false);
      fetchPrompts();
    } catch (err) {
      console.error('Error adding prompt:', err);
      setError('Failed to add prompt');
    }
  };

  const handleUpdatePrompt = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${url}/course/update-prompt`, {
        course_id: courseId,
        prompt_index: selectedPrompt.index,
        title: formData.title,
        description: formData.description
      });
      
      // Reset form and refresh prompts
      setFormData({ title: '', description: '' });
      setShowUpdateForm(false);
      setSelectedPrompt(null);
      fetchPrompts();
    } catch (err) {
      console.error('Error updating prompt:', err);
      setError('Failed to update prompt');
    }
  };

  const handleEditClick = (prompt) => {
    const description = prompt.description;
    const title = prompt.title;
    setSelectedPrompt(prompt);
    setFormData({ title, description });
    setShowUpdateForm(true);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="h5 font-bold">Course Prompts</h2>
        <Button 
          type="button" 
          className="py-2 px-4" 
          onClick={() => setShowAddForm(true)}
        >
          Add New Prompt
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add Prompt Form */}
      {showAddForm && (
        <div className="bg-n-8 p-4 rounded-lg mb-4">
          <h3 className="h6 mb-3">Add New Prompt</h3>
          <form onSubmit={handleAddPrompt}>
            <div className="mb-3">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 bg-n-7 rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 bg-n-7 rounded"
                rows="3"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button2 
                type="button" 
                white 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button2>
              <Button type="submit">Add Prompt</Button>
            </div>
          </form>
        </div>
      )}

      {/* Update Prompt Form */}
      {showUpdateForm && (
        <div className="bg-n-8 p-4 rounded-lg mb-4">
          <h3 className="h6 mb-3">Update Prompt</h3>
          <form onSubmit={handleUpdatePrompt}>
            <div className="mb-3">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 bg-n-7 rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 bg-n-7 rounded"
                rows="3"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button2 
                type="button" 
                white 
                onClick={() => {
                  setShowUpdateForm(false);
                  setSelectedPrompt(null);
                }}
              >
                Cancel
              </Button2>
              <Button type="submit">Update Prompt</Button>
            </div>
          </form>
        </div>
      )}

      {/* Prompts List */}
      {loading ? (
        <p>Loading prompts...</p>
      ) : (
        <div className="space-y-3">
          {prompts.length === 0 ? (
            <p className="text-n-3">No prompts added yet.</p>
          ) : (
            prompts.map((prompt, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-3 bg-n-8 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-semibold">{prompt.title}</p>
                  <p className="text-n-3">{prompt.description}</p>
                </div>
                <Button2 
                  type="button" 
                  white 
                  className="ml-4"
                  onClick={() => handleEditClick(prompt)}
                >
                  Edit
                </Button2>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PromptManager; 