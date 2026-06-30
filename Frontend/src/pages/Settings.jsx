import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNotificationsStore } from '../store/notificationsStore';
import api from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';
import { User, Lock, CreditCard as CardIcon, FileText, LogOut, Camera } from 'lucide-react';

// Premium and modern Account Settings page with vertical tab-submenus, profile picture uploads, billing, and policies
const Settings = () => {
    const { user, setUser, logout } = useContext(AuthContext);
    const { addNotification } = useNotificationsStore();
    const navigate = useNavigate();

    // Tab controller state
    const [activeTab, setActiveTab] = useState('profile');

    // Profile detail modifications
    const [name, setName] = useState(user?.name || '');
    const [age, setAge] = useState(user?.age || '');
    const [profileLoading, setProfileLoading] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);

    // Password modification states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Mock billing credentials for payment display
    const [billingDetails] = useState({
        cardBrand: 'Visa',
        last4: '4821',
        expMonth: '12',
        expYear: '2029',
        cardholderName: user?.name || 'Sandeep Admin'
    });

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

    // Upload selected profile picture to Cloudinary
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

    return (
        <div className="relative min-h-screen bg-[#06070D] text-white py-16 px-6 md:px-12 overflow-hidden">
            <Helmet>
                <title>Account Settings | Deep IT Labs Portal</title>
                <meta name="description" content="Manage your user profile details, upload avatars, edit credentials, view terms, and configure billing." />
            </Helmet>

            {/* Glowing background circles */}
            <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                }}
            />
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative max-w-6xl mx-auto flex flex-col gap-10 z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80">Client Panel</span>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent mt-1">
                            Account Settings
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">Manage credentials, upload avatar, configure billing details and view legal terms.</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 border border-red-500/25 text-red-400 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Sidebar Navigation */}
                    <div className="lg:col-span-3 flex flex-col gap-2 bg-white/[0.02] border border-white/5 p-3 rounded-2xl backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'}`}
                        >
                            <User className="w-4 h-4" />
                            Profile Details
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'security' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'}`}
                        >
                            <Lock className="w-4 h-4" />
                            Change Password
                        </button>
                        <button
                            onClick={() => setActiveTab('billing')}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'billing' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'}`}
                        >
                            <CardIcon className="w-4 h-4" />
                            Payment Method
                        </button>
                        <button
                            onClick={() => setActiveTab('terms')}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'terms' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'}`}
                        >
                            <FileText className="w-4 h-4" />
                            Terms & Conditions
                        </button>
                    </div>

                    {/* Right Content Panels */}
                    <div className="lg:col-span-9">
                        
                        {/* Tab Content: Profile */}
                        {activeTab === 'profile' && (
                            <Card
                                title="Edit Profile Details"
                                subtitle="Configure your name, age, and profile photo."
                                className="bg-white/[0.02] border border-white/5 rounded-2xl shadow-xl backdrop-blur-md"
                            >
                                <div className="flex flex-col gap-8">
                                    {/* Avatar Photo Section */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 bg-slate-900 flex items-center justify-center select-none shadow-md group">
                                            {avatarSrc ? (
                                                <img src={avatarSrc} alt={user?.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-2xl font-bold tracking-wider text-slate-400">
                                                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                                                </span>
                                            )}
                                            {avatarLoading && (
                                                <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
                                                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2 text-center sm:text-left">
                                            <h4 className="text-sm font-bold text-white">Profile Photo</h4>
                                            <p className="text-slate-500 text-xs">Supports JPG, PNG or WEBP up to 5MB. Uploads via Cloudinary.</p>
                                            <label className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-md mt-1 w-fit self-center sm:self-start">
                                                <Camera className="w-3.5 h-3.5" />
                                                Change Picture
                                                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={avatarLoading} />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Text Details Form */}
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
                                            variant="primary"
                                            className="w-full sm:w-fit mt-2 bg-indigo-600 hover:bg-indigo-500"
                                        >
                                            Save Details
                                        </Button>
                                    </form>
                                </div>
                            </Card>
                        )}

                        {/* Tab Content: Security */}
                        {activeTab === 'security' && (
                            <Card
                                title="Change Password"
                                subtitle="Ensure your account remains safe by rotating credentials."
                                className="bg-white/[0.02] border border-white/5 rounded-2xl shadow-xl backdrop-blur-md"
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
                                        variant="primary"
                                        className="w-full sm:w-fit mt-2 bg-indigo-600 hover:bg-indigo-500"
                                    >
                                        Update Password
                                    </Button>
                                </form>
                            </Card>
                        )}

                        {/* Tab Content: Billing */}
                        {activeTab === 'billing' && (
                            <Card
                                title="Payment Method"
                                subtitle="Verify or update your primary billing profile and payment configuration."
                                className="bg-white/[0.02] border border-white/5 rounded-2xl shadow-xl backdrop-blur-md"
                            >
                                <div className="flex flex-col gap-6">
                                    {/* Glassmorphic card design */}
                                    <div className="relative w-full max-w-sm h-48 rounded-2xl p-6 bg-gradient-to-br from-indigo-600/90 to-purple-800/90 text-white flex flex-col justify-between shadow-xl overflow-hidden border border-white/10 select-none">
                                        <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-white/60">Primary Card</p>
                                                <p className="text-sm font-semibold mt-1">Deep IT Labs Portal</p>
                                            </div>
                                            <span className="text-xl font-bold italic">{billingDetails.cardBrand}</span>
                                        </div>
                                        <div className="my-2">
                                            <p className="text-lg tracking-widest font-mono">•••• •••• •••• {billingDetails.last4}</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-white/60">Card Holder</p>
                                                <p className="text-xs font-semibold uppercase">{billingDetails.cardholderName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-white/60">Expires</p>
                                                <p className="text-xs font-semibold">{billingDetails.expMonth}/{billingDetails.expYear.slice(-2)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Billing Coordinates */}
                                    <div className="text-xs text-slate-500 leading-relaxed border-t border-white/5 pt-6 flex flex-col gap-2">
                                        <p><span className="font-semibold text-slate-400">Payment status:</span> Active (Auto-Renew)</p>
                                        <p><span className="font-semibold text-slate-400">Linked Account email:</span> {user?.email}</p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Tab Content: Terms */}
                        {activeTab === 'terms' && (
                            <Card
                                title="Terms and Conditions"
                                subtitle="Review the architectural and service guidelines governing the Deep IT Labs ecosystem."
                                className="bg-white/[0.02] border border-white/5 rounded-2xl shadow-xl backdrop-blur-md"
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