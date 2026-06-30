import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNotificationsStore } from '../store/notificationsStore';
import api from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';

// Settings page supporting profile modification and password changes with Zustand notification toasts
const Settings = () => {
    const { user, setUser } = useContext(AuthContext);
    const { addNotification } = useNotificationsStore();

    // Profile modification states
    const [name, setName] = useState(user?.name || '');
    const [age, setAge] = useState(user?.age || '');
    const [profileLoading, setProfileLoading] = useState(false);

    // Password modification states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setProfileLoading(true);

        try {
            const res = await api.put('/users/profile', {
                name,
                age: parseInt(age, 10)
            });

            // Update user in global context state
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

    return (
        <div className="relative min-h-[75vh] bg-[#06070D] overflow-hidden">
            <Helmet>
                <title>Account Settings | Deep IT Labs Portal</title>
                <meta name="description" content="Manage your Deep IT Labs portal credentials, rotate security passwords, and change profile contact details." />
            </Helmet>

            {/* Same ambient background language as Home/Register, kept very faint behind a dashboard page */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 85%)'
                }}
            />
            <div className="absolute -top-32 left-1/3 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(124,92,252,0.12)_0%,transparent_70%)] blur-2xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto py-12 px-6 md:px-12">
                {/* Header */}
                <div className="mb-10 flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80">
                        Client Portal
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                        Account Settings
                    </h1>
                    <p className="text-sm text-slate-400 max-w-xl">
                        Manage your profile details and account security in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                    {/* Profile Details Form */}
                    <Card
                        title="Profile Details"
                        subtitle="Update your name, age, and public contact information."
                        className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-xl shadow-black/30 backdrop-blur-sm"
                    >
                        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
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

                            <Button
                                type="submit"
                                loading={profileLoading}
                                variant="primary"
                                className="w-full mt-2 bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/20"
                            >
                                Save Details
                            </Button>
                        </form>
                    </Card>

                    {/* Password Change Form — visually flagged as the security-sensitive action */}
                    <Card
                        title="Change Password"
                        subtitle="Ensure your account is secure by rotating passwords regularly."
                        className="relative bg-white/[0.03] border border-cyan-500/20 rounded-2xl shadow-xl shadow-black/30 backdrop-blur-sm"
                    >
                        <span className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

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
                                variant="secondary"
                                className="w-full mt-2 bg-transparent border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10"
                            >
                                Update Password
                            </Button>
                        </form>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default Settings;