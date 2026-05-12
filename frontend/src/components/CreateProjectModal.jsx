import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const CreateProjectModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    teamMembers: [],
  });
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await api.get('/users/members');
      setMembers(data);
    } catch (error) {
      toast.error('Failed to load members');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberToggle = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.includes(memberId)
        ? prev.teamMembers.filter((id) => id !== memberId)
        : [...prev.teamMembers, memberId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/projects', formData);
      toast.success('Project created successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in">
        <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900">Create New Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="input"
              placeholder="Enter project description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-3">
              Team Members
            </label>
            <div className="max-h-48 overflow-y-auto border border-zinc-300 rounded-lg p-3 space-y-2">
              {members.length === 0 ? (
                <p className="text-sm text-zinc-500">No members available</p>
              ) : (
                members.map((member) => (
                  <label
                    key={member._id}
                    className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.teamMembers.includes(member._id)}
                      onChange={() => handleMemberToggle(member._id)}
                      className="w-4 h-4 text-zinc-900 rounded focus:ring-zinc-500"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900">{member.name}</p>
                      <p className="text-xs text-zinc-500">{member.email}</p>
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn btn-primary"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;