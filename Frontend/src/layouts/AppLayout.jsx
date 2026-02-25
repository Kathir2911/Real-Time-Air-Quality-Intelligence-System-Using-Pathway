import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wind, 
  LayoutDashboard, 
  Globe, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Activity
} from 'lucide-react';
import { useState } from 'react';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link to={path}>
    <motion.div 
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </motion.div>
  </Link>
);

const AppLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Globe, label: 'Global Coverage', path: '/map' },
    { icon: Bell, label: 'Safety Alerts', path: '/alerts' },
    { icon: Activity, label: 'Health Guru', path: '/health' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-slate-900/40 backdrop-blur-xl p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <Wind className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            AeroPath <span className="text-cyan-400 font-black">IQ</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.path} 
              {...item} 
              active={location.pathname === item.path} 
            />
          ))}
        </nav>

      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
         <div className="flex items-center gap-2">
          <Wind className="w-6 h-6 text-cyan-400" />
          <h1 className="text-lg font-bold tracking-tight">AeroPath IQ</h1>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={false}
        animate={isOpen ? { x: 0 } : { x: '-100%' }}
        className="lg:hidden fixed inset-0 z-40 bg-slate-900 p-8 pt-24"
      >
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.path} 
              {...item} 
              active={location.pathname === item.path} 
            />
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto pt-20 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
