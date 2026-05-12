import { useState } from 'react';
import { Calendar, User, AlertCircle } from 'lucide-react';
import { formatDate, isOverdue } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const TaskList = ({ tasks, onUpdate }) => {
  const { isAdmin } = useAuth();
  const [updatingTask, setUpdatingTask] = useState(null);

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdatingTask(taskId);
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      toast.success('Task status updated');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setUpdatingTask(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      pending: 'badge-pending',
      'in-progress': 'badge-in-progress',
      completed: 'badge-completed',
    };
    return classes[status] || 'badge-pending';
  };

  const getPriorityBadgeClass = (priority) => {
    const classes = {
      low: 'badge-low',
      medium: 'badge-medium',
      high: 'badge-high',
    };
    return classes[priority] || 'badge-medium';
  };

  if (tasks.length === 0) {
    return (
      <div className="card p-12 text-center">
        <AlertCircle className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-900 mb-2">No tasks yet</h3>
        <p className="text-zinc-600">
          {isAdmin
            ? 'Create your first task to get started'
            : 'No tasks assigned to you yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-zinc-900">Your Tasks</h2>
      
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task._id}
            className="card p-5 hover:shadow-md transition-shadow animate-slide-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {task.title}
                  </h3>
                  <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  {isOverdue(task.deadline) && task.status !== 'completed' && (
                    <span className="badge bg-red-100 text-red-800">Overdue</span>
                  )}
                </div>

                {task.description && (
                  <p className="text-sm text-zinc-600 mb-3">{task.description}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {formatDate(task.deadline)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{task.assignedTo?.name}</span>
                  </div>
                  {task.project?.name && (
                    <span className="px-2 py-1 bg-zinc-100 rounded text-xs">
                      {task.project.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  disabled={updatingTask === task._id}
                  className={`badge ${getStatusBadgeClass(task.status)} cursor-pointer border-none`}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;