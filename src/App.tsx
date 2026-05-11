import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="h-full flex flex-col bg-dark overflow-hidden">
        <div className="flex-1 min-h-0 relative">
          <Routes>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
