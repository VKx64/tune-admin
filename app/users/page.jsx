'use client'

import { useEffect, useState } from 'react'
import pb from '@/lib/pocketbase'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true)
        // You can also fetch all records at once via getFullList
        const records = await pb.collection('users').getFullList({
          sort: '-created',
          batch: 1000,
        });
        setUsers(records);
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    )
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  const getAvatarUrl = (user) => {
    if (user.avatar) {
      // Assuming pb.getFileUrl is the correct method to get the file URL
      // This might need adjustment based on the exact PocketBase SDK version and configuration
      return pb.getFileUrl(user, user.avatar, { thumb: '100x100' });
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=random`;
  };


  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
            <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Experience
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Updated
                </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={getAvatarUrl(user)}
                            alt={user.name || 'User Avatar'}
                        />
                        </div>
                        <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{user.id}</div>
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className={`text-xs ${user.emailVisibility ? 'text-green-500' : 'text-red-500'}`}>
                        {user.emailVisibility ? 'Public' : 'Private'}
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                        {user.role || 'player'}
                    </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.experience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                    >
                        {user.verified ? 'Verified' : 'Not Verified'}
                    </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.created).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
