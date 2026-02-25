import { motion } from 'framer-motion';
import MapView from '../components/MapView';
import { Layers, Search, Navigation2, Filter } from 'lucide-react';

const GlobalMap = () => {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-6">
      {/* Map Header */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-3xl font-black text-white">Global <span className="text-cyan-400">Coverage</span></h2>
          <p className="text-slate-400 text-sm mt-1">Interactive heatmap and station data across urban centers</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search cities/stations..." 
              className="bg-slate-800/50 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 w-64 transition-all"
            />
          </div>
          <button className="p-2 bg-slate-800 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative glass-card overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MapView onLocationChange={() => {}} />
        </div>

        {/* Map Controls Overlays */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl w-48"
          >
            <h4 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-3">Map Layers</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" defaultChecked className="hidden peer" />
                <div className="w-4 h-4 rounded border border-white/20 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 flex items-center justify-center transition-all">
                  <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white transition-colors">AQI Heatmap</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="hidden peer" />
                <div className="w-4 h-4 rounded border border-white/20 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 flex items-center justify-center transition-all">
                  <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Wind Currents</span>
              </label>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 flex gap-3">
          <button className="p-4 bg-cyan-500 text-white rounded-2xl shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-all">
            <Navigation2 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;
