import React, { useState } from 'react';
import { Edit, Trash2, Check, Calendar, Tag } from 'lucide-react';
import { Task } from '../contexts/TaskContext';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => Promise<void>;
  onUpdate: (id: string, taskData: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (updatedTask: Partial<Task>) => {
    await onUpdate(task._id, updatedTask);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (isEditing) {
    return (
      <div className="bg-background-light border border-secondary rounded-lg p-4 mb-4 animate-fadeIn shadow-card">
        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`bg-background-light border border-secondary rounded-lg p-4 mb-4 animate-slideIn shadow-card ${task.completed ? 'opacity-70' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleStatus(task._id)}
          className={`mt-1 p-1 rounded-full border ${
            task.completed
              ? 'border-success bg-success/20 text-success'
              : 'border-text-secondary text-text-secondary hover:border-primary hover:text-primary'
          } transition-colors`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          <Check size={16} />
        </button>
        
        <div className="flex-1">
          <div className="flex flex-wrap justify-between gap-2">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-text-secondary hover:text-primary transition-colors"
                aria-label="Edit task"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="p-1 text-text-secondary hover:text-error transition-colors"
                aria-label="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-text-secondary line-through' : 'text-text-secondary'}`}>
              {task.description}
            </p>
          )}
          
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
            <span className={`inline-flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              <span className="capitalize">{task.priority}</span>
            </span>
            
            {task.deadline && (
              <span className="inline-flex items-center gap-1 text-text-secondary">
                <Calendar size={12} />
                <span>{formatDate(task.deadline)}</span>
              </span>
            )}
            
            {task.recurring !== 'none' && (
              <span className="inline-flex items-center gap-1 text-primary">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="capitalize">{task.recurring}</span>
              </span>
            )}
          </div>
          
          {task.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-text-primary"
                >
                  <Tag size={10} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;