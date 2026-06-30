import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNotificationsStore } from '../store/notificationsStore';
import api from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';
import { 
    User, 
    Lock, 
    FileText, 
    LogOut, 
    Camera, 
    Flame 
} from 'lucide-react';

const Settings = () => {
    const { user, setUser, logout } = useContext(AuthContext);
    const { addNotification } = useNotificationsStore();
    const navigate = useNavigate();

    // Tab controller state
    const [activeTab, setActiveTab] = useState('profile');

    // Profile details state
    const [name, setName] = useState(user?.name || '');
    const [age, setAge] = useState(user?.age || '');
    const [profileLoading, setProfileLoading] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);

    // Password change state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    // local storage persistence for subscription & course enrollments
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
    const isSubscribed = localStorage.getItem('is_subscribed') === 'true';

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setProfileLoading(true);

        try {
            const res = await api.put('/users/profile', {
                name,
                age: parseInt(age, 10)
            });

            setUser(res.data.data);
            addNotification('Profile details updated successfully!', 'success');
        } catch (err) {
            addNotification(err.response?.data?.error || 'Failed to update profile', 'error');
        } finally {
            setProfileLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            addNotification('New passwords do not match', 'error');
            return;
        }

        setPasswordLoading(true);

        try {
            await api.put('/auth/updatepassword', {
                currentPassword,
                newPassword
            });

            addNotification('Password changed successfully!', 'success');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            addNotification(err.response?.data?.error || 'Failed to change password', 'error');
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        setAvatarLoading(true);
        try {
            const res = await api.put('/users/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setUser(prev => ({ ...prev, avatar: res.data.avatarUrl }));
            addNotification('Profile avatar updated successfully!', 'success');
        } catch (err) {
            addNotification(err.response?.data?.error || 'Failed to upload image', 'error');
        } finally {
            setAvatarLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        addNotification('Successfully logged out of portal.', 'success');
        navigate('/');
    };

    const avatarSrc = user?.avatar && user.avatar !== 'default-avatar.png' ? user.avatar : null;
    const streak = enrolledCourses.length > 0 ? 5 : 0;

    return (
        <div className="relative min-h-screen bg-[#030408] text-white py-16 px-6 md:px-12 overflow-hidden">
            <Helmet>
                <title>Settings Console | Deep IT Labs Portal</title>
            </Helmet>

            {/* Glowing background mesh */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative max-w-6xl mx-auto flex flex-col gap-10 z-10">

                {/* ─── Upper Part: Student Console Profile Card ─── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/10 border border-white/5 p-6 rounded-3xl backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-60 blur-md group-hover:opacity-90 transition-all duration-500" />
                            {avatarSrc ? (
                                <img src={avatarSrc} alt="" className="relative w-16 h-16 rounded-2xl object-cover border-2 border-slate-950" />
                            ) : (
                                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-xl font-black text-white border-2 border-slate-950">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <label className="absolute -bottom-1 -right-1 p-1 bg-indigo-600 rounded-lg border border-slate-950 cursor-pointer hover:bg-indigo-500 transition-all">
                                <Camera className="w-3 h-3 text-white" />
                                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={avatarLoading} />
                            </label>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400">Settings Console Profile Card</span>
                            <h2 className="text-xl font-extrabold tracking-tight text-white mt-0.5">{user?.name}</h2>
                            <div className="flex items-center gap-3 mt-1">
                                <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                                    isSubscribed ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                                }`}>
                                    {isSubscribed ? 'Premium Pass' : 'Trial'}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">
                                    <Flame className="w-3 h-3 fill-orange-400" /> {streak} day streak
                                </span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 border border-red-500/25 text-red-400 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                    </button>
                </div>

                {/* Main panel layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Navigation */}
                    <div className="lg:col-span-3 flex flex-col gap-2 bg-white/[0.01] border border-white/5 p-3 rounded-2xl backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'}`}
                        >
                            <User className="w-4 h-4" />
                            Profile Details
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'security' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'}`}
                        >
                            <Lock className="w-4 h-4" />
                            Change Password
                        </button>
                        <button
                            onClick={() => setActiveTab('terms')}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'terms' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'}`}
                        >
                            <FileText className="w-4 h-4" />
                            Terms & Conditions
                        </button>
                    </div>

                    {/* Right Panels */}
                    <div className="lg:col-span-9">
                        
                        {/* Tab Content: Profile */}
                        {activeTab === 'profile' && (
                            <Card
                                title="Edit Profile Details"
                                subtitle="Configure your name, age, and profile photo settings."
                                className="bg-white/[0.01] border border-white/5 rounded-2xl shadow-xl"
                            >
                                <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input
                                            label="Full Name"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                        <Input
                                            label="Age"
                                            id="age"
                                            type="number"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address (Read Only)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-900/50 border border-white/5 rounded-lg px-4 py-3 text-sm text-slate-500 cursor-not-allowed outline-none"
                                            value={user?.email || ''}
                                            readOnly
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        loading={profileLoading}
                                        className="w-full sm:w-fit mt-2 bg-indigo-600 hover:bg-indigo-500"
                                    >
                                        Save Details
                                    </Button>
                                </form>
                            </Card>
                        )}

                        {/* Tab Content: Security */}
                        {activeTab === 'security' && (
                            <Card
                                title="Change Password"
                                subtitle="Ensure your account remains safe by rotating credentials."
                                className="bg-white/[0.01] border border-white/5 rounded-2xl shadow-xl"
                            >
                                <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
                                    <Input
                                        label="Current Password"
                                        id="currentPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <Input
                                        label="New Password"
                                        id="newPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <Input
                                        label="Confirm New Password"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        loading={passwordLoading}
                                        className="w-full sm:w-fit mt-2 bg-indigo-600 hover:bg-indigo-500"
                                    >
                                        Update Password
                                    </Button>
                                </form>
                            </Card>
                        )}

                        {/* Tab Content: Terms */}
                        {activeTab === 'terms' && (
                            <Card
                                title="Terms and Conditions"
                                subtitle="Review the architectural and service guidelines governing the Deep IT Labs ecosystem."
                                className="bg-white/[0.01] border border-white/5 rounded-2xl shadow-xl"
                            >
                                <div className="max-h-[300px] overflow-y-auto pr-2 flex flex-col gap-4 text-xs text-slate-400 leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                    <h4 className="font-bold text-white text-sm">Welcome to Deep IT Labs</h4>
                                    <p>By accessing this site or registering inside our portal ecosystem, you agree to comply with and be bound by these Terms and Conditions.</p>
                                    
                                    <h4 className="font-bold text-white text-sm mt-2">1. Use of Site & Services</h4>
                                    <p>The content, services, code files, and course curriculum details shown on this website are owned exclusively by Deep IT Labs. Unauthorized reuse, automated scraping, or unauthorized redistribution of source material is prohibited.</p>
                                    
                                    <h4 className="font-bold text-white text-sm mt-2">2. Service Scopes & Estimation</h4>
                                    <p>Custom software estimations provided via consultation forms represent structural architectural estimations and do not constitute a binding development contract until Service Level Agreements (SLAs) are formally scoped and signed.</p>
                                    
                                    <h4 className="font-bold text-white text-sm mt-2">3. Data & User Profiles</h4>
                                    <p>Users are responsible for safeguarding their login credentials. We hash passwords in Mongoose before DB storage and blacklist tokens, but coordinate-level session security requires users to remain cautious.</p>
                                </div>
                            </Card>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;