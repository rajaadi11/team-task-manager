import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FolderOpen, Plus, Users } from 'lucide-react';
import { formatDate } from '../utils/helpers';
import CreateProjectModal from '../components/CreateProjectModal';

const Projects = () => {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-zinc-900">Projects</h1>
          <p className="text-zinc-600 mt-1">Manage your team projects</p>
        </div>
        {isAdmin && (
          <button onClick={() => setShowModal(true)} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="card p-12 text-center">
          <FolderOpen className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-900 mb-2">No projects yet</h3>
          <p className="text-zinc-600">
            {isAdmin
              ? 'Create your first project to get started'
              : 'No projects assigned to you yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project._id}
              className="card p-6 hover:shadow-md transition-shadow animate-slide-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <span className={`badge ${
                  project.status === 'active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : project.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-zinc-100 text-zinc-800'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                {project.name}
              </h3>
              
              {project.description && (
                <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Users className="w-4 h-4" />
                <span>{project.teamMembers?.length || 0} members</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-zinc-200 text-xs text-zinc-500">
                Created {formatDate(project.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchProjects}
        />
      )}
    </div>
  );
};

export default Projects;