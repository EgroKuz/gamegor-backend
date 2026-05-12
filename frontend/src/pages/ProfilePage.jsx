import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getProfile, updateProfile, changePassword } from '../api/users';
import FormInput from '../components/auth/FormInput'; 
import PasswordInput from '../components/auth/PasswordInput';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext);
  
  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nickname: '', email: '' });
  const [updateError, setUpdateError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Change Password State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [pwdData, setPwdData] = useState({ old_password: '', new_password: '', confirm_password: '' });
  const [pwdError, setPwdError] = useState('');
  const [isSavingPwd, setIsSavingPwd] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);
        setFormData({ nickname: data.nickname || '', email: data.email });
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setIsChangingPassword(false);
    if (isEditing) {
      setFormData({ nickname: profile.nickname || '', email: profile.email });
      setUpdateError('');
    }
  };

  const handlePwdToggle = () => {
    setIsChangingPassword(!isChangingPassword);
    setIsEditing(false);
    if (isChangingPassword) {
      setPwdData({ old_password: '', new_password: '', confirm_password: '' });
      setPwdError('');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUpdateError('');
  };

  const handlePwdChange = (e) => {
    setPwdData({ ...pwdData, [e.target.name]: e.target.value });
    setPwdError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setUpdateError('');

    try {
      const updatedData = await updateProfile(formData);
      setProfile({ ...profile, ...updatedData });
      setIsEditing(false);
    } catch (err) {
      setUpdateError(err.response?.data?.error || err.response?.data?.detail || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();
    if (pwdData.new_password !== pwdData.confirm_password) {
      setPwdError('Passwords do not match');
      return;
    }

    setIsSavingPwd(true);
    setPwdError('');

    try {
      await changePassword({
        old_password: pwdData.old_password,
        new_password: pwdData.new_password
      });
      setIsChangingPassword(false);
      setPwdData({ old_password: '', new_password: '', confirm_password: '' });
      // Could show a success toast here
    } catch (err) {
      setPwdError(err.response?.data?.error || err.response?.data?.detail || 'Failed to change password.');
    } finally {
      setIsSavingPwd(false);
    }
  };

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
        <div className="flex gap-4">
          <button 
            onClick={logout}
            className="bg-red-900/30 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg border border-red-500/50 transition-colors font-semibold shadow-sm"
          >
            Logout
          </button>
          <Link 
            to="/profile/sessions"
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors font-semibold shadow-sm"
          >
            View Game Sessions &rarr;
          </Link>
        </div>
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

        {/* Info/Edit Section */}
        <div className="w-full md:w-2/3">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>
              {updateError && (
                <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center">
                  {updateError}
                </div>
              )}
              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FormInput
                id="nickname"
                name="nickname"
                label="Nickname"
                value={formData.nickname}
                onChange={handleChange}
              />
              <div className="pt-4 flex gap-4 border-t border-gray-800">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  onClick={handleEditToggle}
                  disabled={isSaving}
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : isChangingPassword ? (
            <form onSubmit={handlePwdSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>
              {pwdError && (
                <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center">
                  {pwdError}
                </div>
              )}
              <PasswordInput
                id="old_password"
                name="old_password"
                label="Current Password"
                value={pwdData.old_password}
                onChange={handlePwdChange}
                required
              />
              <PasswordInput
                id="new_password"
                name="new_password"
                label="New Password"
                value={pwdData.new_password}
                onChange={handlePwdChange}
                required
              />
              <PasswordInput
                id="confirm_password"
                name="confirm_password"
                label="Confirm New Password"
                value={pwdData.confirm_password}
                onChange={handlePwdChange}
                required
                error={pwdData.new_password && pwdData.confirm_password && pwdData.new_password !== pwdData.confirm_password ? 'Passwords do not match' : undefined}
              />
              <div className="pt-4 flex gap-4 border-t border-gray-800">
                <button 
                  type="submit"
                  disabled={isSavingPwd}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-400 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)] disabled:opacity-50"
                >
                  {isSavingPwd ? 'Updating...' : 'Update Password'}
                </button>
                <button 
                  type="button" 
                  onClick={handlePwdToggle}
                  disabled={isSavingPwd}
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
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
                <button 
                  onClick={handleEditToggle}
                  className="bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  Edit Profile
                </button>
                <button 
                  onClick={handlePwdToggle}
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
