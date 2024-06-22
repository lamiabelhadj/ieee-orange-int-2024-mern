import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/api/tasks/${id}`)  // Adjusted endpoint to task details
      .then((response) => {
        setTask(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching task:', error);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Task Details</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>ID</span>
          <span>{task._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Label</span>
          <span>{task.label}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Description</span>
          <span>{task.description}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Done</span>
          <span>{task.done ? 'Yes' : 'No'}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Deadline</span>
          <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Not specified'}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
