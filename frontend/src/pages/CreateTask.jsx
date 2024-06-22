import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateTask = () => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveTask = () => {
    const data = {
      label,
      description,
      deadline,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/api/tasks', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Task Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating task', { variant: 'error' });
        console.error('Error creating task:', error);
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Create Task</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Label</label>
          <input
            type='text'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full h-24'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Deadline</label>
          <input
            type='date'
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveTask} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
