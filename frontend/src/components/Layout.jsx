import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FolderOpen, LogOut, Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { getInitials } from '../utils/helpers';

const Layout = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-zinc-200">
          <div className="flex items-center gap-3 px-6 py-6 border-b border-zinc-200">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-900">TaskFlow</h1>
              <p className="text-xs text-zinc-500">{isAdmin ? 'Admin' : 'Member'}</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-zinc-200">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-50">
              <div className="w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center font-semibold">
                {getInitials(user?.name || 'U')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 truncate">{user?.name}</p>
                <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full mt-3 flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-zinc-900">TaskFlow</h1>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-zinc-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="px-4 py-4 space-y-1 border-t border-zinc-200 animate-fade-in">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;