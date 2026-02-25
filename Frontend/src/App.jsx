import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import GlobalMap from './pages/GlobalMap';
import Alerts from './pages/Alerts';
import AppLayout from './layouts/AppLayout';

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Protected/App Routes (Wrapped in Layout) */}
        <Route 
          path="/dashboard" 
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } 
        />
        <Route 
          path="/map" 
          element={
            <AppLayout>
              <GlobalMap />
            </AppLayout>
          } 
        />
         <Route 
          path="/alerts" 
          element={
            <AppLayout>
              <Alerts />
            </AppLayout>
          } 
        />
         <Route 
          path="/health" 
          element={
            <AppLayout>
               <div className="h-[calc(100vh-100px)] flex items-center justify-center italic text-slate-500">
                Health Guru AI Coming Soon...
              </div>
            </AppLayout>
          } 
        />
        {/* Catch-all for 404s within the app */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;

