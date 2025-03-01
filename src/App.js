import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import ResultsPage from './pages/ResultsPage';
import LearningPathPage from './pages/LearningPathPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/*" element={<LoginPage onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<ProjectsPage />} />
              <Route path="projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="upload/:projectId/:roleId" element={<ResumeUploadPage />} />
              <Route path="results/:projectId/:roleId" element={<ResultsPage />} />
              <Route path="learning-path/:projectId/:roleId" element={<LearningPathPage />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;