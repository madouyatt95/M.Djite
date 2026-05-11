import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PrivacyProvider } from './context/PrivacyContext';
import BottomNav from './components/BottomNav';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Finances from './pages/Finances';
import Charts from './pages/Charts';
import Documents from './pages/Documents';
import Contacts from './pages/Contacts';
import ContactDetail from './pages/ContactDetail';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import AddProject from './pages/AddProject';
import Map from './pages/Map';
import Calendar from './pages/Calendar';
import OrgChart from './pages/OrgChart';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="h-full w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:id" element={<ContactDetail />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/map" element={<Map />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/org-chart" element={<OrgChart />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5s for FaceID
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <PrivacyProvider>
      <Router>
        <div className="app-layout">
          <div className="app-content relative z-0 overflow-x-hidden">
            <AnimatedRoutes />
          </div>
          <BottomNav />
        </div>
      </Router>
    </PrivacyProvider>
  );
}

export default App;
