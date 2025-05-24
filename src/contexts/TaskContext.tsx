import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  deadline?: string;
  recurring: 'none' | 'daily' | 'weekly';
  createdAt: string;
  user: string;
};

type TaskFilters = {
  status?: string;
  priority?: string;
  tag?: string;
  search?: string;
};

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  getTasks: () => Promise<void>;
  createTask: (taskData: Partial<Task>) => Promise<void>;
  updateTask: (id: string, taskData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  filterTasks: (filters: TaskFilters) => Promise<void>;
  clearError: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Get all tasks
  const getTasks = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when user changes
  useEffect(() => {
    if (user) {
      getTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  // Create task
  const createTask = async (taskData: Partial<Task>) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/tasks', taskData);
      setTasks([res.data, ...tasks]);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/tasks/${id}`, taskData);
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle task status
  const toggleTaskStatus = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/tasks/${id}/toggle`);
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update task status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks
  const filterTasks = async (filters: TaskFilters) => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.tag) params.append('tag', filters.tag);
      if (filters.search) params.append('search', filters.search);
      
      const res = await axios.get(`/api/tasks/filter?${params.toString()}`);
      setTasks(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to filter tasks');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        filterTasks,
        clearError,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};