import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';
import TaskList from '../components/TaskList';
import CreateTaskModal from '../components/CreateTaskModal';
import CreateProjectModal from '../components/CreateProjectModal';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        api.get('/tasks/stats/dashboard'),
        api.get('/tasks'),
      ]);
      setStats(statsRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-amber-500',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: AlertCircle,
      color: 'bg-purple-500',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'bg-emerald-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-zinc-600 mt-1">Here's what's happening with your tasks today.</p>
        </div>
        {isAdmin && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowProjectModal(true)}
              className="btn btn-secondary"
            >
              New Project
            </button>
            <button
              onClick={() => setShowTaskModal(true)}
              className="btn btn-primary"
            >
              New Task
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="card p-6 animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600">{stat.title}</p>
                <p className="text-3xl font-bold text-zinc-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overdue Alert */}
      {stats.overdue > 0 && (
        <div className="card p-4 border-l-4 border-red-500 bg-red-50 animate-fade-in">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">
                You have {stats.overdue} overdue task{stats.overdue > 1 ? 's' : ''}
              </p>
              <p className="text-sm text-red-700">Please review and update them as soon as possible.</p>
            </div>
          </div>
        </div>
      )}

      {/* Task List */}
      <TaskList tasks={tasks} onUpdate={fetchDashboardData} />

      {/* Modals */}
      {showTaskModal && (
        <CreateTaskModal
          onClose={() => setShowTaskModal(false)}
          onSuccess={fetchDashboardData}
        />
      )}
      {showProjectModal && (
        <CreateProjectModal
          onClose={() => setShowProjectModal(false)}
          onSuccess={fetchDashboardData}
        />
      )}
    </div>
  );
};

export default Dashboard;
