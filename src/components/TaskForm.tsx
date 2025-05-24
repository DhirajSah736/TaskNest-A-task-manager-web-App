import React from 'react';
import { useForm } from 'react-hook-form';
import { Task } from '../contexts/TaskContext';

interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (data: Partial<Task>) => Promise<void>;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Partial<Task>>({
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      priority: initialData.priority || 'medium',
      tags: initialData.tags ? initialData.tags.join(', ') : '',
      deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().substring(0, 10) : '',
      recurring: initialData.recurring || 'none'
    }
  });

  const handleFormSubmit = async (data: Partial<Task>) => {
    try {
      // Format tags as array
      if (data.tags && typeof data.tags === 'string') {
        data.tags = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      }
      
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="form-label">Title</label>
        <input
          id="title"
          type="text"
          className="form-input w-full"
          placeholder="Enter task title"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && (
          <p className="error-message">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="form-label">Description (optional)</label>
        <textarea
          id="description"
          rows={3}
          className="form-input w-full"
          placeholder="Add task details"
          {...register('description')}
        ></textarea>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            className="form-input w-full"
            {...register('priority')}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="recurring" className="form-label">Recurring</label>
          <select
            id="recurring"
            className="form-input w-full"
            {...register('recurring')}
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="tags" className="form-label">Tags (comma separated)</label>
        <input
          id="tags"
          type="text"
          className="form-input w-full"
          placeholder="work, personal, urgent"
          {...register('tags')}
        />
      </div>
      
      <div>
        <label htmlFor="deadline" className="form-label">Deadline (optional)</label>
        <input
          id="deadline"
          type="date"
          className="form-input w-full"
          {...register('deadline')}
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData._id ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;