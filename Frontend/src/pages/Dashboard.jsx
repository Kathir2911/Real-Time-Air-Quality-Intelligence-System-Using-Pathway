import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Bell, Map as MapIcon, RefreshCcw, MapPin } from 'lucide-react';
import AQICard from '../components/AQICard';
import AQIGraph from '../components/AQIGraph';
import MapView from '../components/MapView';

const Dashboard = () => {
  const [timeLabels, setTimeLabels] = useState([]);
  const [aqiData, setAqiData] = useState([]);
  const [currentAqi, setCurrentAqi] = useState(null);
  const [healthAdvice, setHealthAdvice] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationName, setLocationName] = useState("Main Engine");

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/aqi/history");
      const data = await res.json();
      if (data && Array.isArray(data) && data.length > 0) {
        // Safe mapping for time labels
        const labels = data.map(r => {
          const timestamp = Number(r.time);
          if (isNaN(timestamp)) return "--:--";
          return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });
        setTimeLabels(labels);
        
        setAqiData(data.map(r => Number(r.aqi) || 0));
        const latest = data[data.length - 1];
        setCurrentAqi(latest.aqi !== undefined ? Number(latest.aqi) : null);
        setHealthAdvice(latest.health_advice || "No advice available");
      }
      
      const alertsRes = await fetch("http://127.0.0.1:8000/alerts");
      const alertsData = await alertsRes.json();
      setAlerts(alertsData);
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLocationChange = async ({ lat, lng }) => {
    setSelectedLocation({ lat, lng });
    setIsRefreshing(true);
    try {
      // 1. Tell backend about the location change (triggers the fetcher/pathway pipeline)
      const locRes = await fetch("http://127.0.0.1:8000/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lon: lng, city: "Map Selection" })
      });
      const locData = await locRes.json();
      
      if (locData.location && locData.location.city) {
        setLocationName(locData.location.city);
      }

      // 2. Immediately fetch data for this specific location for instant UI feedback
      const freshRes = await fetch(`http://127.0.0.1:8000/aqi/by-location?lat=${lat}&lon=${lng}`);
      const freshData = await freshRes.json();
      
      setCurrentAqi(Number(freshData.aqi));
      setHealthAdvice("Syncing with Pathway engine...");

      // 3. Update history instantly as well
      const historyRes = await fetch(`http://127.0.0.1:8000/aqi/history/by-location?lat=${lat}&lon=${lng}`);
      const historyData = await historyRes.json();
      
      if (historyData && Array.isArray(historyData)) {
        setTimeLabels(historyData.map(r => new Date(r.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));
        setAqiData(historyData.map(r => Number(r.aqi)));
      }

    } catch (err) {
      console.error("Location update failed:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white px-2">Engine <span className="text-cyan-400">Overview</span></h2>
          <p className="text-slate-400 text-sm mt-1 px-2">Real-time status from Pathway Processing Layer</p>
        </div>
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-all"
        >
          <RefreshCcw className={`w-4 h-4 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Stats
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Visuals Card */}
          <section className="glass-card overflow-hidden hover:shadow-cyan-500/5 transition-all">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
              <h3 className="font-bold flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-indigo-400" />
                Live Network Propagation
              </h3>
              {selectedLocation && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full border border-white/5">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  {locationName}
                </div>
              )}
            </div>
            <div className="h-[400px]">
              <MapView onLocationChange={handleLocationChange} />
            </div>
          </section>

          {/* Analytics Graph */}
          <section className="glass-card p-6">
             <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Atmospheric Trend
              </h3>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> AQI Scale</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-700" /> Background</div>
                </div>
                {selectedLocation && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-[10px] font-black text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/20 uppercase tracking-tighter"
                  >
                    <MapPin className="w-3 h-3" />
                    Locality: {locationName}
                  </motion.div>
                )}
              </div>
            </div>
            <div className="h-[320px]">
              <AQIGraph 
                timeLabels={timeLabels} 
                aqiData={aqiData} 
                locationName={locationName}
              />
            </div>
          </section>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-4 space-y-8">
          <AQICard aqi={currentAqi} advice={healthAdvice} />

          {/* Quick Alerts Segment */}
          <section className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                Active Alerts
              </h3>
              <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-1 rounded border border-white/5 font-mono">
                {alerts.length} LOADED
              </span>
            </div>
            
            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="p-3 bg-white/2 border border-white/5 rounded-2xl flex items-start gap-3 hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                    <Activity className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">{alert.category || 'High Pollution'}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{alert.city}: AQI {alert.aqi}</p>
                  </div>
                </motion.div>
              ))}
              {alerts.length === 0 && (
                <div className="text-center py-10 opacity-50 italic text-sm text-slate-500">
                  No active safety alerts detected.
                </div>
              )}
            </div>

            <button className="w-full mt-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-white/5">
              View Detailed Feed
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
