import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../api/users';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-neon-teal text-xl font-bold animate-pulse">
          Loading Profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-red-400 text-xl font-bold bg-red-900/20 p-6 rounded-lg border border-red-500/50">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const memberSince = profile.registration_date 
    ? new Date(profile.registration_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'Unknown';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            My Profile
          </h2>
          <p className="text-gray-400 mt-1">
            Manage your personal information and preferences.
          </p>
        </div>
        <Link 
          to="/profile/sessions"
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors font-semibold"
        >
          View Game Sessions &rarr;
        </Link>
      </header>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl flex flex-col md:flex-row gap-8 items-start">
        
        {/* Avatar Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center space-y-4">
          <div className="w-40 h-40 rounded-full bg-gray-800 border-4 border-gray-700 overflow-hidden flex items-center justify-center relative group">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="User avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl">👤</span>
            )}
            {/* Hover overlay for future upload functionality */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-sm font-semibold">Change Avatar</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{profile.username}</h3>
            <p className="text-sm text-gray-500">Member since: {memberSince}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-800">
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</span>
              <span className="text-gray-200">{profile.email}</span>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-800">
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Nickname</span>
              <span className="text-gray-200">{profile.nickname || 'Not set'}</span>
            </div>
          </div>

          <div className="pt-6 flex gap-4 border-t border-gray-800">
            <button className="bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Edit Profile
            </button>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700">
              Change Password
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
