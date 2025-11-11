
import React from 'react';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';

const App: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {currentUser ? <HomePage /> : <AuthPage />}
      </main>
    </div>
  );
};

export default App;
