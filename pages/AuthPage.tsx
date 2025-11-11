
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useAuth();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await signup({ username, email, password });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm bg-form-bg p-8 rounded-lg shadow-lg border border-gray-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-dark-text">{isLogin ? 'Login' : 'Sign up'}</h2>
        </div>
        {error && <p className="mb-4 text-center text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="mt-1"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="mt-1"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                className="mt-1"
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Button type="submit" className="flex-1">{isLogin ? 'Login' : 'Register'}</Button>
            <Button type="button" variant="secondary" onClick={toggleForm} className="flex-1">{isLogin ? 'Register' : 'Login'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
