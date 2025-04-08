import { useState } from 'react';
import Button from '../design/Button';
import axios from 'axios';
import { url } from '../../constants';

const CreateCourseDialog = ({ open, setOpen, instructorId, onCourseCreated }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    instructor_id: instructorId
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(`${url}/course/create-course/`, {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        instructor_id: instructorId
      });

      setSuccess(true);
      setFormData({
        id: '',
        title: '',
        description: '',
        instructor_id: instructorId
      });
      
      // Notify parent component that a course was created
      if (onCourseCreated) {
        onCourseCreated(response.data);
      }
      
      // Close dialog after a short delay
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating course. Please try again.');
      console.error('Error creating course:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-n-8 bg-opacity-75 transition-opacity" onClick={() => setOpen(false)} />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-n-7 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="h4 mb-4 text-n-1">
              Create New Course
            </h3>
            
            {error && (
              <div className="mb-4 p-2 bg-red-900 bg-opacity-40 rounded text-red-500">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-2 bg-green-900 bg-opacity-40 rounded text-green-500">
                Course created successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-2">
              <div className="mb-4">
                <label htmlFor="id" className="block text-left text-sm font-medium text-n-3 mb-1">
                  Course Code/ID
                </label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  required
                  value={formData.id}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-3 px-4 bg-n-6 text-n-1 shadow-sm ring-1 ring-inset ring-n-5 focus:ring-2 focus:ring-inset focus:ring-purple-500"
                  placeholder="e.g. CS101"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-left text-sm font-medium text-n-3 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-3 px-4 bg-n-6 text-n-1 shadow-sm ring-1 ring-inset ring-n-5 focus:ring-2 focus:ring-inset focus:ring-purple-500"
                  placeholder="e.g. Introduction to Computer Science"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-left text-sm font-medium text-n-3 mb-1">
                  Course Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-3 px-4 bg-n-6 text-n-1 shadow-sm ring-1 ring-inset ring-n-5 focus:ring-2 focus:ring-inset focus:ring-purple-500"
                  placeholder="Describe the course content and objectives..."
                />
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <Button
                  type="submit"
                  className="w-full sm:col-start-2"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Course'}
                </Button>
                <Button
                  type="button"
                  white 
                  className="mt-3 w-full sm:col-start-1 sm:mt-0"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseDialog; 