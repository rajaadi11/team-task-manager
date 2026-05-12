// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Check if task is overdue
export const isOverdue = (deadline) => {
  return new Date(deadline) < new Date();
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-amber-100 text-amber-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-emerald-100 text-emerald-800',
  };
  return colors[status] || 'bg-zinc-100 text-zinc-800';
};

// Get priority color
export const getPriorityColor = (priority) => {
  const colors = {
    low: 'bg-zinc-100 text-zinc-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-red-100 text-red-800',
  };
  return colors[priority] || 'bg-zinc-100 text-zinc-800';
};

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
