import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wind, Shield, Zap, ArrowRight, BarChart2, Globe } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-8 rounded-3xl bg-slate-800/50 backdrop-blur-xl border border-white/5 glass-card-hover"
  >
    <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl border border-cyan-500/30 flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <Wind className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-bold tracking-tight">AeroPath <span className="text-cyan-400">IQ</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Safety Standards</a>
          <Link 
            to="/dashboard" 
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-cyan-500/25"
          >
            Launch Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
              Next-Gen Environmental Intelligence
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Breathe Smarter with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                Real-Time Data
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Powered by Pathway, AeroPath IQ provides instantaneous air quality insights and predictive safety alerts for a healthier urban life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/dashboard" 
                className="group w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-cyan-50 transition-all flex items-center justify-center gap-2"
              >
                Access Live Engine
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold text-lg hover:bg-slate-700 transition-all border border-white/5">
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <h2 className="text-4xl font-black mb-4">Unrivaled Processing</h2>
            <p className="text-slate-400 max-w-md">Our architecture leverages streaming technology to reduce latency to milliseconds.</p>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-sm font-mono">
            <span>UPTIME 99.9%</span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span>LATENCY &lt;50MS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Zap}
            title="Streaming Analytics"
            description="Continuous ingestion and transformation of AQI data using the powerful Pathway stream processing framework."
          />
           <FeatureCard 
            icon={BarChart2}
            title="Smart Forecasting"
            description="Advanced trend detection that identifies pollution spikes before they happen, allowing for timely health precautions."
          />
           <FeatureCard 
            icon={Globe}
            title="Geospatial Mapping"
            description="Interactive high-resolution maps providing hyper-local air quality insights mapped across urban centers."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-900/50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Wind className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold">AeroPath IQ</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              Revolutionizing environmental monitoring through state-of-the-art stream processing and intuitive design.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Live Dashboard</Link></li>
              <li><Link to="/map" className="hover:text-cyan-400 transition-colors">Global Map</Link></li>
              <li><Link to="/alerts" className="hover:text-cyan-400 transition-colors">Alert Feed</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Connect</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Community</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© 2026 AeroPath Intelligence Labs. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
