
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-teal text-white shadow-md w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Keep Notes</h1>
          <p className="text-xs text-gray-200">
            Homepage / {currentUser ? 'Your Notes' : 'Login'}
          </p>
        </div>
        <nav>
          <ul className="flex items-center space-x-4">
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            {currentUser && <li><a href="#" className="hover:text-gray-300">Notes</a></li>}
            <li><a href="#" className="hover:text-gray-300">Account</a></li>
            {currentUser ? (
              <li>
                <button
                  onClick={logout}
                  className="bg-danger hover:bg-danger-hover text-white px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li><a href="#" className="hover:text-gray-300">Login</a></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
