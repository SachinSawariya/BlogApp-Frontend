"use client";

import { useAdminDashboard } from '@/components/Admin/hooks/useAdminDashboard';
import { DashboardHeader } from '@/components/Admin/DashboardHeader';
import { QuickActions } from '@/components/Admin/QuickActions';
import { ProfileCard } from '@/components/Admin/ProfileCard';

export default function AdminDashboard() {
  const { user, isLoading, handleLogout } = useAdminDashboard();

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-10 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader userName={user.name} onLogout={handleLogout} />

        <div className="grid md:grid-cols-3 gap-8">
          <QuickActions />
          <ProfileCard user={user} />
        </div>
      </div>
    </div>
  );
}
