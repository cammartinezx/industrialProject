import { useState } from 'react';
import Button from '../design/Button';
import axios from 'axios';
import { url } from '../../constants';

const JoinCourseForm = ({ userId, onCourseJoined }) => {
  const [courseCode, setCourseCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!courseCode.trim()) {
      setError('Please enter a course code');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${url}/student/join-course`, {
        user_id: userId,
        course_id: courseCode.trim()
      });

      if (response.data && response.status === 200) {
        setSuccess('Successfully joined the course!');
        setCourseCode('');
        
        // Notify parent component to refresh courses
        if (onCourseJoined) {
          onCourseJoined();
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to join course. Please check the course code and try again.';
      setError(errorMessage);
      console.error('Error joining course:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-n-7 rounded-lg mb-8">
      <h2 className="text-xl font-bold mb-4 text-n-1">Join a Course</h2>
      
      {error && (
        <div className="p-3 mb-4 bg-red-900 bg-opacity-40 rounded text-red-500">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 mb-4 bg-green-900 bg-opacity-40 rounded text-green-500">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          placeholder="Enter course code"
          className="flex-1 rounded-md border-0 py-3 px-4 bg-n-6 text-n-1 shadow-sm ring-1 ring-inset ring-n-5 focus:ring-2 focus:ring-inset focus:ring-purple-500"
        />
        <Button
          type="submit"
          disabled={loading}
          className="whitespace-nowrap"
        >
          {loading ? 'Joining...' : 'Join Course'}
        </Button>
      </form>
    </div>
  );
};

export default JoinCourseForm; 