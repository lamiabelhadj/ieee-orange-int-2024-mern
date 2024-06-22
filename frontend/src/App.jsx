import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import SignIn from './pages/SignIn';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/signin" element={<SignIn />} />

      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/edit-task/:id" element={<EditTask />} />
    </Routes>
  );
};

export default App;

