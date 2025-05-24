import React from 'react';
import { Task } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import Spinner from './Spinner';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleStatus: (id: string) => Promise<void>;
  onUpdate: (id: string, taskData: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onToggleStatus,
  onUpdate,
  onDelete
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-background-light rounded-lg p-8 text-center shadow-card">
        <h3 className="text-xl font-medium text-text-primary mb-2">No tasks found</h3>
        <p className="text-text-secondary">
          Create a new task to get started or adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleStatus={onToggleStatus}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;