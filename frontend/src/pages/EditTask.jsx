import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/api/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching task:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSaveTask = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/api/tasks/${id}`, task)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Task Edited successfully', { variant: 'success' });
        navigate('/'); // Redirect to task list after editing
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing task', { variant: 'error' });
        console.error('Error editing task:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setTask({ ...task, [name]: newValue });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Edit Task</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Label</label>
            <input
              type='text'
              name='label'
              value={task.label || ''}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Description</label>
            <textarea
              name='description'
              value={task.description || ''}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full h-24'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Deadline</label>
            <input
              type='date'
              name='deadline'
              value={task.deadline ? task.deadline.substring(0, 10) : ''}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Done</label>
            <input
              type='checkbox'
              name='done'
              checked={task.done || false}
              onChange={handleChange}
              className='border-2 border-gray-500 px-4 py-2'
            />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleSaveTask} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditTask;
