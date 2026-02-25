import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, ShieldCheck, Filter, Clock, MapPin } from 'lucide-react';

const AlertItem = ({ alert, index }) => {
  const isHigh = alert.aqi > 200;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-6 rounded-3xl border glass-card-hover bg-slate-800/40 backdrop-blur-xl ${
        isHigh ? 'border-red-500/20 shadow-lg shadow-red-500/5' : 'border-white/5'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center border ${
          isHigh ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
        }`}>
          {isHigh ? <AlertTriangle className="w-7 h-7" /> : <Bell className="w-7 h-7" />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {alert.category || 'Environmental Alert'}
              <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-widest font-black ${
                isHigh ? 'border-red-500/30 text-red-500 bg-red-500/5' : 'border-amber-500/30 text-amber-500 bg-amber-500/5'
              }`}>
                {isHigh ? 'Critical' : 'Caution'}
              </span>
            </h3>
            <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <Clock className="w-3 h-3" /> Just Now
            </span>
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {alert.alert_message || `Atmospheric conditions in ${alert.city} have reached ${alert.aqi} AQI. Stay indoors if sensitive.`}
          </p>
          
          <div className="flex flex-wrap gap-3">
             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-slate-300">
              <MapPin className="w-3 h-3 text-cyan-400" />
              {alert.city}
            </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-slate-300">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Impact: Respiratory
            </div>
          </div>
        </div>
        
        <div className="flex flex-row md:flex-col items-center justify-center gap-2 px-6 py-4 bg-slate-900/50 rounded-2xl border border-white/5">
          <span className="text-3xl font-black text-white">{alert.aqi}</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">AQI Score</span>
        </div>
      </div>
    </motion.div>
  );
};

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/alerts");
        const data = await res.json();
        setAlerts(data);
      } catch (err) {
        console.error("Alerts fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h2 className="text-4xl font-black text-white">Atmospheric <span className="text-cyan-400">Threats</span></h2>
          <p className="text-slate-400 text-sm mt-2">Active safety intelligence powered by Pathway real-time ingestion</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-slate-800 border border-white/5 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filter Feed
          </button>
          <button className="px-4 py-2 bg-cyan-500 rounded-xl text-xs font-bold text-white hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
            Export Report
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {alerts.map((alert, i) => (
            <AlertItem key={i} alert={alert} index={i} />
          ))}
          {!loading && alerts.length === 0 && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="py-32 flex flex-col items-center justify-center italic text-slate-500 bg-slate-900/20 rounded-3xl border border-dashed border-white/5"
            >
              <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
              No active safety alerts. Atmosphere is stable.
            </motion.div>
          )}
          {loading && (
            <div className="space-y-6 animate-pulse">
               {[1,2,3].map(i => (
                 <div key={i} className="h-40 bg-slate-800/50 rounded-3xl" />
               ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Alerts;
