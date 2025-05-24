import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface TaskFilterProps {
  onFilter: (filters: {
    status?: string;
    priority?: string;
    tag?: string;
    search?: string;
  }) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    tag: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      status: '',
      priority: '',
      tag: '',
      search: ''
    });
    onFilter({});
  };

  return (
    <div className="mb-6 bg-background-light rounded-lg p-4 shadow-card">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <div className="flex-grow relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleInputChange}
              placeholder="Search tasks..."
              className="form-input w-full pl-10"
            />
          </div>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2 p-2 rounded-md bg-secondary text-text-primary hover:bg-secondary-hover transition-colors"
            aria-label="Toggle filters"
          >
            <Filter size={20} />
          </button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 animate-fadeIn">
            <div>
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleInputChange}
                className="form-input w-full"
              >
                <option value="">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="priority" className="form-label">Priority</label>
              <select
                id="priority"
                name="priority"
                value={filters.priority}
                onChange={handleInputChange}
                className="form-input w-full"
              >
                <option value="">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="tag" className="form-label">Tag</label>
              <input
                type="text"
                id="tag"
                name="tag"
                value={filters.tag}
                onChange={handleInputChange}
                placeholder="Filter by tag"
                className="form-input w-full"
              />
            </div>
            
            <div className="md:col-span-3 flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
              >
                Reset
              </button>
              
              <button
                type="submit"
                className="btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskFilter;