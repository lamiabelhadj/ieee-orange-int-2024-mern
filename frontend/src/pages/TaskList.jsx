import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/api/tasks')
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []); 

  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5555/api/tasks/${taskId}`);
      // Filter out the deleted task from state
      setTasks(tasks.filter((task) => task._id !== taskId));
      setLoading(false);
    } catch (error) {
      console.error('Error deleting task:', error);
      setLoading(false);
    }
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Task List</h1>
      <div className='flex justify-end'>
        <Link to='/create-task' className='bg-blue-600 text-white px-4 py-2 rounded-lg mb-4'>
          Create Task
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task._id} className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 mb-4'>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Label</span>
                <span>{task.label}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Status</span>
                <span>{task.done ? 'Completed' : 'Pending'}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Deadline</span>
                <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Not set'}</span>
              </div>
              <div className='flex justify-end mt-4'>
                <button
                  className='bg-blue-400 text-white px-4 py-2 rounded-lg mr-2'
                  onClick={() => handleShowDetails(task)}
                >
                  Details
                </button>
                <Link to={`/edit-task/${task._id}`} className='bg-yellow-400 text-white px-4 py-2 rounded-lg mr-2'>
                  Edit
                </Link>
                <button
                  className='bg-red-600 text-white px-4 py-2 rounded-lg'
                  onClick={() => handleDeleteTask(task._id)}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
