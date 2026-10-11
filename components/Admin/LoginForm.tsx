"use client";

import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAdminLogin } from './hooks/useAdminLogin';

export const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
  } = useAdminLogin();

  return (
    <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors">
      <div>
        <h2 className="mt-6 text-center text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Admin <span className="text-blue-600 dark:text-blue-400">Portal</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
          Sign in to manage your blog content
        </p>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100 dark:border-red-900/40">
            <FiAlertCircle size={18} />
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <FiMail size={20} />
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full pl-12 pr-4 py-4 border-none bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-900 dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <FiLock size={20} />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none block w-full pl-12 pr-4 py-4 border-none bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-900 dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Sign in'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
