"use client";

import { FiUser } from 'react-icons/fi';
import Image from 'next/image';

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-xl shadow-gray-100/50 dark:shadow-none h-fit transition-colors">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden">
          {user.avatar ? (
            <Image 
              src={user.avatar} 
              alt={user.name} 
              width={96} 
              height={96} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <FiUser size={40} />
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
        <p className="text-gray-400 dark:text-gray-500 font-medium mb-6">{user.email}</p>
        
        <div className="w-full pt-6 border-t border-gray-50 dark:border-gray-800 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Role</span>
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full font-bold">{user.role}</span>
          </div>
          
          <button 
            className="w-full py-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700"
            onClick={() => alert('Profile editing coming soon! For now, manage your content.')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
