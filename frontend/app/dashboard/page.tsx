'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute, { useUser } from '@/components/ProtectedRoute';
import { removeToken } from '@/lib/auth';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const router = useRouter();
  const user = useUser();

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome, {user?.name} ({user?.role})
                </h1>
                <p className="text-gray-600">Email : {user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl border border-sky-200">
                <h3 className="text-lg font-semibold text-sky-800 mb-2">User Information</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Name:</span> {user?.name}</p>
                  <p><span className="font-medium">Email:</span> {user?.email}</p>
                  <p><span className="font-medium">Role:</span> {user?.role}</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Account Status</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Account Active
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                    {user?.role === 'Admin' ? 'Admin Privileges' : 'Standard Access'}
                  </p>
                </div>
              </div>
            </div>

            {user?.role === 'Admin' && (
              <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Admin Panel</h3>
                <p className="text-gray-600">
                  You have administrative access. Additional admin features can be added here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

