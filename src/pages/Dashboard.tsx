import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTask, Task as TaskType } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
// import Spinner from '../components/Spinner';

const Dashboard: React.FC = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { 
    tasks, 
    loading, 
    error,
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskStatus,
    filterTasks 
  } = useTask();

  const handleTaskSubmit = async (data: Partial<TaskType>) => {
    await createTask(data);
    setShowAddTask(false);
  };

  const handleFilter = (filters: {
    status?: string;
    priority?: string;
    tag?: string;
    search?: string;
  }) => {
    filterTasks(filters);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Task Dashboard</h1>
          <p className="text-text-secondary mt-1">Manage your tasks efficiently</p>
        </div>
        
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="btn btn-primary mt-4 sm:mt-0 inline-flex items-center"
        >
          <PlusCircle size={18} className="mr-1.5" />
          Add New Task
        </button>
      </div>
      
      {showAddTask && (
        <div className="bg-background-light rounded-lg p-6 mb-6 shadow-card animate-fadeIn">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Create New Task</h2>
          <TaskForm 
            onSubmit={handleTaskSubmit}
            onCancel={() => setShowAddTask(false)}
          />
        </div>
      )}
      
      <TaskFilter onFilter={handleFilter} />
      
      {error && (
        <div className="bg-error/10 border border-error/30 rounded-md p-4 mb-6">
          <p className="text-text-primary">{error}</p>
        </div>
      )}
      
      <TaskList
        tasks={tasks}
        loading={loading}
        onToggleStatus={toggleTaskStatus}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default Dashboard;