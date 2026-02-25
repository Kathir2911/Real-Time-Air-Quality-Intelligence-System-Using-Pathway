import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

const AQICard = ({ aqi, advice }) => {
  const getAQILevel = (value) => {
    if (value === null) return { label: 'Unknown', color: 'text-slate-400', bg: 'bg-slate-500/10', icon: AlertCircle, description: 'No data available' };
    if (value <= 50) return { label: 'Good', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle2, description: 'Minimal health impact' };
    if (value <= 100) return { label: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: ShieldCheck, description: 'Acceptable quality' };
    if (value <= 200) return { label: 'Poor', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: AlertTriangle, description: 'Unhealthy for sensitive groups' };
    if (value <= 300) return { label: 'Very Poor', color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle, description: 'Health alert' };
    return { label: 'Severe', color: 'text-rose-600', bg: 'bg-rose-500/10', icon: Zap, description: 'Health emergency' };
  };

  const level = getAQILevel(aqi);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 glass-card-hover relative overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 blur-3xl ${level.bg}`} />
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">Current Quality</h2>
          <div className="flex items-center gap-2">
            <h3 className={`text-2xl font-bold ${level.color}`}>{level.label}</h3>
            <level.icon className={`w-5 h-5 ${level.color}`} />
          </div>
        </div>
        <div className="text-right">
          <span className="text-5xl font-black text-white tracking-tighter">
            {aqi !== null ? aqi : '--'}
          </span>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">AQI Index</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`p-4 rounded-2xl ${level.bg} border border-white/5`}>
          <p className="text-slate-200 text-sm leading-relaxed">
            <span className={`font-bold ${level.color} mr-2`}>Note:</span>
            {advice || level.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Impact</p>
            <p className="text-slate-300 text-xs font-medium">{level.description}</p>
          </div>
          <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Next Update</p>
            <p className="text-slate-300 text-xs font-medium">Auto-refresh ready</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AQICard;
