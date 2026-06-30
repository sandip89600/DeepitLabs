import React, { useState, useContext } from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { useNotificationsStore } from '../store/notificationsStore';
import api from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { Helmet } from 'react-helmet-async';
import { 
    Users, 
    UserPlus, 
    Trash2, 
    TrendingUp, 
    DollarSign, 
    Activity, 
    Shield, 
    BarChart3, 
    PieChart, 
    ArrowUpRight, 
    ArrowDownRight, 
    Search, 
    Sparkles,
    Clock,
    CheckCircle2,
    XCircle,
    Eye,
    LayoutDashboard,
    Home as HomeIcon,
    Info,
    Briefcase,
    Wrench,
    Terminal,
    Settings as SettingsIcon,
    LogOut,
    ExternalLink
} from 'lucide-react';

// ─── Mini Bar Chart Component ───────────────────────────────────
const MiniBarChart = ({ data, color = 'indigo' }) => {
    const max = Math.max(...data.map(d => d.count), 1);
    return (
        <div className="flex items-end gap-1.5 h-20 pt-4">
            {data.map((d, i) => {
                const heightPct = (d.count / max) * 100;
                return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <div className="w-full relative bg-slate-800 rounded-t-sm h-14 flex items-end">
                            <div 
                                className={`w-full bg-${color}-500/80 rounded-t-sm group-hover:bg-${color}-400 transition-all duration-500`}
                                style={{ height: `${heightPct}%` }}
                            />
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-[8px] opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 font-mono">
                                {d.count}
                            </span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono">M{d._id}</span>
                    </div>
                );
            })}
        </div>
    );
};

// ─── Donut Chart Component ──────────────────────────────────────
const DonutChart = ({ data }) => {
    const total = data.reduce((sum, d) => sum + d.count, 0) || 1;
    const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8'];
    let cumulative = 0;

    const segments = data.map((d, i) => {
        const pct = (d.count / total) * 100;
        const offset = cumulative;
        cumulative += pct;
        return { ...d, pct, offset, color: colors[i % colors.length] };
    });

    return (
        <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 shrink-0">
                <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                    {segments.map((seg, i) => (
                        <circle
                            key={i}
                            cx="18" cy="18" r="15.9"
                            fill="none"
                            stroke={seg.color}
                            strokeWidth="3"
                            strokeDasharray={`${seg.pct} ${100 - seg.pct}`}
                            strokeDashoffset={`${-seg.offset}`}
                            className="transition-all duration-700"
                        />
                    ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-extrabold text-white">{total}</span>
                </div>
            </div>
            <div className="space-y-2">
                {segments.map((seg, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="text-slate-300 capitalize">{seg._id}</span>
                        <span className="text-slate-500 ml-auto">{seg.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Reusable Stat Card ─────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, trend, trendUp, color, loading }) => (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700/60 transition-all">
        <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-${color}-500/10 transition-all`} />
        <div className="flex items-start justify-between">
            <div className="space-y-2">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</span>
                {loading ? (
                    <div className="h-7 w-16 bg-slate-800 rounded animate-pulse" />
                ) : (
                    <h3 className="text-2xl font-extrabold text-white">{value}</h3>
                )}
            </div>
            <div className={`p-2.5 bg-${color}-500/10 border border-${color}-500/20 text-${color}-400 rounded-xl`}>
                <Icon className="w-4 h-4" />
            </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold">
            {trendUp ? (
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
            ) : (
                <ArrowDownRight className="w-3 h-3 text-red-400" />
            )}
            <span className={trendUp ? 'text-emerald-400' : 'text-red-400'}>{trend}</span>
            <span className="text-slate-500 ml-1">vs last month</span>
        </div>
    </div>
);

// ─── Reusable Health Bar ────────────────────────────────────────
const HealthBar = ({ label, value, color }) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">{label}</span>
            <span className={`text-${color}-400 font-bold`}>{value}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
                className={`h-full rounded-full bg-${color}-500 transition-all duration-1000`}
                style={{ width: `${value}%` }}
            />
        </div>
    </div>
);


// ═══════════════════════════════════════════════════════════════
// MAIN ADMIN PANEL SIDEBAR LAYOUT
// ═══════════════════════════════════════════════════════════════
const AdminLayout = () => {
    const { logout } = useContext(AuthContext);
    const { addNotification } = useNotificationsStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // ─── CMS dynamic config fetches & mutations ───
    const { data: cmsConfig, isLoading: loadingCms } = useQuery({
        queryKey: ['cmsConfigAdmin'],
        queryFn: async () => {
            const res = await api.get('/users/frontend-config');
            return res.data.data;
        }
    });

    const cmsMutation = useMutation({
        mutationFn: async (updatedConfig) => {
            const res = await api.put('/users/frontend-config', updatedConfig);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cmsConfig'] });
            queryClient.invalidateQueries({ queryKey: ['cmsConfigAdmin'] });
            addNotification('Frontend configuration saved successfully!', 'success');
        },
        onError: (err) => {
            addNotification(err.response?.data?.error || 'Failed to update configuration', 'error');
        }
    });

    // ─── Server logs ───
    const { data: serverLogs, isLoading: loadingLogs, refetch: refetchLogs } = useQuery({
        queryKey: ['serverLogs'],
        queryFn: async () => {
            const res = await api.get('/users/logs');
            return res.data.data;
        }
    });

    // ─── Payments ledger query ───
    const { data: payments = [], isLoading: loadingPayments } = useQuery({
        queryKey: ['adminPayments'],
        queryFn: async () => {
            const res = await api.get('/payments');
            return res.data.data;
        }
    });

    const totalLedgerRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    // ─── Stats & Users fetches ───
    const { data: adminStats, isLoading: loadingStats } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await api.get('/users/stats');
            return res.data.data;
        }
    });

    const { data: users = [], isLoading: loadingUsers, refetch: refetchUsers } = useQuery({
        queryKey: ['usersDirectory'],
        queryFn: async () => {
            const res = await api.get('/users');
            return res.data.data;
        }
    });

    const { data: courseStats = [], isLoading: loadingCourseStats } = useQuery({
        queryKey: ['courseStats'],
        queryFn: async () => {
            const res = await api.get('/courses/stats');
            return res.data.data;
        }
    });

    // ─── User Management Mutations ───
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState('user');
    const [newAge, setNewAge] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const addUserMutation = useMutation({
        mutationFn: async (userData) => {
            const res = await api.post('/users', userData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usersDirectory'] });
            queryClient.invalidateQueries({ queryKey: ['adminStats'] });
            addNotification('User created successfully.', 'success');
            setNewName('');
            setNewEmail('');
            setNewPassword('');
            setNewAge('');
        },
        onError: (err) => {
            addNotification(err.response?.data?.error || 'Failed to create user.', 'error');
        }
    });

    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            await api.delete(`/users/${userId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usersDirectory'] });
            queryClient.invalidateQueries({ queryKey: ['adminStats'] });
            addNotification('User deleted from database.', 'success');
        },
        onError: (err) => {
            addNotification(err.response?.data?.error || 'Failed to delete user.', 'error');
        }
    });

    const handleCreateUser = (e) => {
        e.preventDefault();
        addUserMutation.mutate({
            name: newName,
            email: newEmail,
            password: newPassword,
            role: newRole,
            age: parseInt(newAge, 10)
        });
    };

    const handleLogout = () => {
        logout();
        addNotification('Logged out successfully.', 'success');
        navigate('/');
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRevenue = courseStats.reduce((sum, g) => sum + (g.averageTuition * g.courseCount || 0), 0);

    const sidebarLinks = [
        { path: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
        { path: '/admin/home', label: 'Home Page', icon: HomeIcon },
        { path: '/admin/about', label: 'About Page', icon: Info },
        { path: '/admin/services', label: 'Services Page', icon: Wrench },
        { path: '/admin/portfolio', label: 'Portfolio Page', icon: Briefcase },
        { path: '/admin/users', label: 'User Directory', icon: Users },
        { path: '/admin/payments', label: 'Payments Ledger', icon: DollarSign },
        { path: '/admin/logs', label: 'System Logs', icon: Terminal },
        { path: '/admin/settings', label: 'Branding & Contact', icon: SettingsIcon }
    ];

    return (
        <div className="flex min-h-screen bg-[#07080E] text-white">
            <Helmet>
                <title>Admin Dashboard | Deep IT Labs</title>
            </Helmet>

            {/* Glowing background highlights */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            {/* 1. SIDEBAR NAVIGATION */}
            <aside className="w-64 bg-slate-950/60 border-r border-slate-900 flex flex-col justify-between shrink-0 select-none">
                <div className="p-6 flex flex-col gap-8">
                    {/* Brand / Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                                Deep IT Labs
                            </span>
                            <p className="text-[9px] font-mono text-indigo-400/80 tracking-widest uppercase">Admin Panel</p>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex flex-col gap-1.5">
                        {sidebarLinks.map(link => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                                        isActive 
                                            ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300 shadow-md shadow-indigo-500/5' 
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.02] border-transparent'
                                    }`
                                }
                            >
                                <link.icon className="w-4 h-4" />
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Footer Controls */}
                <div className="p-6 border-t border-slate-900 flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-300 text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Website
                    </button>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center gap-2 w-full bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* 2. MAIN CONTENT CONTAINER */}
            <main className="flex-grow p-8 overflow-y-auto max-h-screen">
                <Routes>
                    {/* Auto-redirect root layout path to dashboard */}
                    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

                    {/* ROUTE: OVERVIEW */}
                    <Route path="dashboard" element={
                        <div className="space-y-8 animate-in fade-in">
                            {/* Header */}
                            <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                <div>
                                    <h1 className="text-2xl font-extrabold tracking-tight">Overview Metrics</h1>
                                    <p className="text-xs text-slate-400 mt-1">Real-time database, registration summaries and revenue benchmarks.</p>
                                </div>
                            </div>

                            {/* Stat cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <StatCard label="Total Registered Users" value={adminStats?.totalUsers} icon={Users} trend="+12.4%" trendUp={true} color="indigo" loading={loadingStats} />
                                <StatCard label="Active Portal Sessions" value={adminStats?.activeUsers} icon={Activity} trend="+4.1%" trendUp={true} color="emerald" loading={loadingStats} />
                                <StatCard label="Total Aggregated Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} trend="+28.4%" trendUp={true} color="violet" loading={loadingStats || loadingCourseStats} />
                                <StatCard label="Database Health Index" value="99.9%" icon={Shield} trend="Stable" trendUp={true} color="cyan" loading={false} />
                            </div>

                            {/* Aggregations Splits */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                                        <BarChart3 className="w-4 h-4 text-indigo-400" /> System Diagnostics & Health
                                    </h3>
                                    <p className="text-[10px] text-slate-500 mb-6">Mongoose queries response benchmarks & uptime</p>
                                    <div className="space-y-4">
                                        <HealthBar label="API Server Latency" value={98} color="emerald" />
                                        <HealthBar label="MongoDB Atlas Read Speed" value={95} color="indigo" />
                                        <HealthBar label="Asset Store Caching (Cloudinary)" value={99} color="violet" />
                                    </div>
                                </div>

                                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                                        <PieChart className="w-4 h-4 text-violet-400" /> User Role Distributions
                                    </h3>
                                    <p className="text-[10px] text-slate-500 mb-6">Registered roles mapped across Mongoose schemas</p>
                                    {loadingStats ? (
                                        <div className="flex justify-center items-center h-28">
                                            <span className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    ) : adminStats?.roleStats?.length > 0 ? (
                                        <DonutChart data={adminStats.roleStats} />
                                    ) : (
                                        <div className="h-28 flex items-center justify-center text-xs text-slate-500">No statistics recorded.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    } />

                    {/* ROUTE: HOME PAGE CMS */}
                    <Route path="home" element={
                        <div className="space-y-6 animate-in fade-in">
                            <div className="border-b border-white/5 pb-6">
                                <h1 className="text-2xl font-extrabold tracking-tight">Home Page Configuration</h1>
                                <p className="text-xs text-slate-400 mt-1">Manage the Hero text details, main descriptions and landing page counters.</p>
                            </div>
                            {loadingCms ? (
                                <div className="flex justify-center py-16"><span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    cmsMutation.mutate(cmsConfig);
                                }} className="space-y-6 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                                    <Input
                                        label="Hero Headline Title"
                                        value={cmsConfig?.heroTitle || ''}
                                        onChange={e => {
                                            const val = e.target.value;
                                            queryClient.setQueryData(['cmsConfigAdmin'], prev => ({ ...prev, heroTitle: val }));
                                        }}
                                        required
                                    />
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Hero Narrative Description</label>
                                        <textarea
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all h-24 resize-none"
                                            value={cmsConfig?.heroDesc || ''}
                                            onChange={e => {
                                                const val = e.target.value;
                                                queryClient.setQueryData(['cmsConfigAdmin'], prev => ({ ...prev, heroDesc: val }));
                                            }}
                                            required
                                        />
                                    </div>
                                    
                                    <h3 className="text-sm font-bold text-white border-t border-slate-800 pt-6 mt-6 mb-2">Hero Stats Counts</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {cmsConfig?.stats?.map((stat, i) => (
                                            <div key={i} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                                                <span className="text-[10px] text-indigo-400 font-mono">Counter #{i+1}</span>
                                                <Input
                                                    label="Numeric Value"
                                                    value={stat.value || ''}
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                            const statsList = [...prev.stats];
                                                            statsList[i] = { ...statsList[i], value: val };
                                                            return { ...prev, stats: statsList };
                                                        });
                                                    }}
                                                    required
                                                />
                                                <Input
                                                    label="Label Name"
                                                    value={stat.label || ''}
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                            const statsList = [...prev.stats];
                                                            statsList[i] = { ...statsList[i], label: val };
                                                            return { ...prev, stats: statsList };
                                                        });
                                                    }}
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <Button type="submit" loading={cmsMutation.isPending} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500">
                                        Save Home Configurations
                                    </Button>
                                </form>
                            )}
                        </div>
                    } />

                    {/* ROUTE: ABOUT PAGE CMS */}
                    <Route path="about" element={
                        <div className="space-y-6 animate-in fade-in">
                            <div className="border-b border-white/5 pb-6">
                                <h1 className="text-2xl font-extrabold tracking-tight">About Page Configuration</h1>
                                <p className="text-xs text-slate-400 mt-1">Configure company mission narrative, vision frameworks and agency value pillars.</p>
                            </div>
                            {loadingCms ? (
                                <div className="flex justify-center py-16"><span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    cmsMutation.mutate(cmsConfig);
                                }} className="space-y-6 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mission Statement</label>
                                        <textarea
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all h-24 resize-none"
                                            value={cmsConfig?.aboutMission || ''}
                                            onChange={e => {
                                                const val = e.target.value;
                                                queryClient.setQueryData(['cmsConfigAdmin'], prev => ({ ...prev, aboutMission: val }));
                                            }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Vision Statement</label>
                                        <textarea
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all h-24 resize-none"
                                            value={cmsConfig?.aboutVision || ''}
                                            onChange={e => {
                                                const val = e.target.value;
                                                queryClient.setQueryData(['cmsConfigAdmin'], prev => ({ ...prev, aboutVision: val }));
                                            }}
                                            required
                                        />
                                    </div>

                                    <h3 className="text-sm font-bold text-white border-t border-slate-800 pt-6 mt-6 mb-2">Agency Core Values</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {cmsConfig?.aboutValues?.map((val, i) => (
                                            <div key={i} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                                                <span className="text-[10px] text-indigo-400 font-mono">Value #{i+1}</span>
                                                <Input
                                                    label="Title"
                                                    value={val.title || ''}
                                                    onChange={e => {
                                                        const txt = e.target.value;
                                                        queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                            const list = [...prev.aboutValues];
                                                            list[i] = { ...list[i], title: txt };
                                                            return { ...prev, aboutValues: list };
                                                        });
                                                    }}
                                                    required
                                                />
                                                <Input
                                                    label="Icon Emoji"
                                                    value={val.icon || ''}
                                                    onChange={e => {
                                                        const txt = e.target.value;
                                                        queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                            const list = [...prev.aboutValues];
                                                            list[i] = { ...list[i], icon: txt };
                                                            return { ...prev, aboutValues: list };
                                                        });
                                                    }}
                                                    required
                                                />
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</label>
                                                    <textarea
                                                        className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-xs text-white focus:outline-none h-16 resize-none"
                                                        value={val.desc || ''}
                                                        onChange={e => {
                                                            const txt = e.target.value;
                                                            queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                                const list = [...prev.aboutValues];
                                                                list[i] = { ...list[i], desc: txt };
                                                                return { ...prev, aboutValues: list };
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button type="submit" loading={cmsMutation.isPending} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500">
                                        Save About Configurations
                                    </Button>
                                </form>
                            )}
                        </div>
                    } />

                    {/* ROUTE: SERVICES PAGE CMS */}
                    <Route path="services" element={
                        <div className="space-y-6 animate-in fade-in">
                            <div className="border-b border-white/5 pb-6">
                                <h1 className="text-2xl font-extrabold tracking-tight">Services Configurations</h1>
                                <p className="text-xs text-slate-400 mt-1">Configure service definitions, icons and details represented in MERN grid.</p>
                            </div>
                            {loadingCms ? (
                                <div className="flex justify-center py-16"><span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    cmsMutation.mutate(cmsConfig);
                                }} className="space-y-6 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {cmsConfig?.services?.map((serv, i) => (
                                            <div key={i} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                                                <span className="text-[10px] text-indigo-400 font-mono">Service #{i+1}</span>
                                                <Input
                                                    label="Title"
                                                    value={serv.title || ''}
                                                    onChange={e => {
                                                        const txt = e.target.value;
                                                        queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                            const list = [...prev.services];
                                                            list[i] = { ...list[i], title: txt };
                                                            return { ...prev, services: list };
                                                        });
                                                    }}
                                                    required
                                                />
                                                <Input
                                                    label="Icon Emoji"
                                                    value={serv.icon || ''}
                                                    onChange={e => {
                                                        const txt = e.target.value;
                                                        queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                            const list = [...prev.services];
                                                            list[i] = { ...list[i], icon: txt };
                                                            return { ...prev, services: list };
                                                        });
                                                    }}
                                                    required
                                                />
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</label>
                                                    <textarea
                                                        className="w-full bg-slate-955 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-xs text-white focus:outline-none h-20 resize-none"
                                                        value={serv.desc || ''}
                                                        onChange={e => {
                                                            const txt = e.target.value;
                                                            queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                                const list = [...prev.services];
                                                                list[i] = { ...list[i], desc: txt };
                                                                return { ...prev, services: list };
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button type="submit" loading={cmsMutation.isPending} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500">
                                        Save Services Configurations
                                    </Button>
                                </form>
                            )}
                        </div>
                    } />

                    {/* ROUTE: PORTFOLIO PAGE CMS */}
                    <Route path="portfolio" element={
                        <div className="space-y-6 animate-in fade-in">
                            <div className="border-b border-white/5 pb-6">
                                <h1 className="text-2xl font-extrabold tracking-tight">Portfolio Case Studies</h1>
                                <p className="text-xs text-slate-400 mt-1">Add, update, or edit metrics and image details of deployed portfolio projects.</p>
                            </div>
                            {loadingCms ? (
                                <div className="flex justify-center py-16"><span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    cmsMutation.mutate(cmsConfig);
                                }} className="space-y-6 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {cmsConfig?.projects?.map((proj, i) => (
                                            <div key={i} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                                                <span className="text-[10px] text-indigo-400 font-mono">Project Case Study #{i+1}</span>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Input
                                                        label="Title"
                                                        value={proj.title || ''}
                                                        onChange={e => {
                                                            const txt = e.target.value;
                                                            queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                                const list = [...prev.projects];
                                                                list[i] = { ...list[i], title: txt };
                                                                return { ...prev, projects: list };
                                                            });
                                                        }}
                                                        required
                                                    />
                                                    <Input
                                                        label="Category"
                                                        value={proj.category || ''}
                                                        onChange={e => {
                                                            const txt = e.target.value;
                                                            queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                                const list = [...prev.projects];
                                                                list[i] = { ...list[i], category: txt };
                                                                return { ...prev, projects: list };
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <Input
                                                    label="Image URL Link"
                                                    value={proj.image || ''}
                                                    onChange={e => {
                                                        const txt = e.target.value;
                                                        queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                            const list = [...prev.projects];
                                                            list[i] = { ...list[i], image: txt };
                                                            return { ...prev, projects: list };
                                                        });
                                                    }}
                                                    required
                                                />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Input
                                                        label="Performance Metric"
                                                        value={proj.metric || ''}
                                                        onChange={e => {
                                                            const txt = e.target.value;
                                                            queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                                const list = [...prev.projects];
                                                                list[i] = { ...list[i], metric: txt };
                                                                return { ...prev, projects: list };
                                                            });
                                                        }}
                                                        required
                                                    />
                                                    <Input
                                                        label="Metric Label"
                                                        value={proj.metricTitle || ''}
                                                        onChange={e => {
                                                            const txt = e.target.value;
                                                            queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                                const list = [...prev.projects];
                                                                list[i] = { ...list[i], metricTitle: txt };
                                                                return { ...prev, projects: list };
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</label>
                                                    <textarea
                                                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-xs text-white focus:outline-none h-20 resize-none"
                                                        value={proj.desc || ''}
                                                        onChange={e => {
                                                            const txt = e.target.value;
                                                            queryClient.setQueryData(['cmsConfigAdmin'], prev => {
                                                                const list = [...prev.projects];
                                                                list[i] = { ...list[i], desc: txt };
                                                                return { ...prev, projects: list };
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button type="submit" loading={cmsMutation.isPending} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500">
                                        Save Portfolio Configurations
                                    </Button>
                                </form>
                            )}
                        </div>
                    } />

                    {/* ROUTE: USERS DIRECTORY */}
                    <Route path="users" element={
                        <div className="space-y-8 animate-in fade-in">
                            {/* Header */}
                            <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                <div>
                                    <h1 className="text-2xl font-extrabold tracking-tight">User Administration</h1>
                                    <p className="text-xs text-slate-400 mt-1">Search, register or terminate user profiles in MongoDB.</p>
                                </div>
                            </div>

                            {/* Signups summary metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 text-center">
                                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Total Sign-ups</p>
                                    <p className="text-xl font-bold text-white mt-1">{users.length}</p>
                                </div>
                                <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 text-center">
                                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Admins</p>
                                    <p className="text-xl font-bold text-indigo-400 mt-1">{users.filter(u => u.role === 'admin').length}</p>
                                </div>
                                <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 text-center">
                                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Mentors</p>
                                    <p className="text-xl font-bold text-amber-400 mt-1">{users.filter(u => u.role === 'mentor').length}</p>
                                </div>
                                <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 text-center">
                                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Students/Users</p>
                                    <p className="text-xl font-bold text-cyan-400 mt-1">{users.filter(u => u.role === 'user').length}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                {/* Left: Directory List */}
                                <div className="lg:col-span-8 space-y-4">
                                    <div className="flex gap-2">
                                        <div className="relative flex-grow">
                                            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                                            <input 
                                                type="text" 
                                                placeholder="Search users by name or email..."
                                                className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                        <Button onClick={() => refetchUsers()} className="bg-transparent border border-slate-850 hover:bg-slate-900 py-3 px-4 shadow-none">
                                            Reload
                                        </Button>
                                    </div>

                                    <div className="bg-slate-900/30 backdrop-blur-md border border-slate-850 rounded-2xl overflow-hidden">
                                        {loadingUsers ? (
                                            <div className="flex justify-center py-12">
                                                <span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                            </div>
                                        ) : filteredUsers.length === 0 ? (
                                            <p className="text-slate-500 text-xs py-10 text-center">No users matched search criteria.</p>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-xs border-collapse">
                                                    <thead>
                                                        <tr className="border-b border-slate-850 text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
                                                            <th className="py-4 px-6">Name</th>
                                                            <th className="py-4 px-3">Email</th>
                                                            <th className="py-4 px-3">Role</th>
                                                            <th className="py-4 px-3 text-right">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-900/60">
                                                        {filteredUsers.map(userItem => (
                                                            <tr key={userItem._id} className="hover:bg-white/[0.01] transition-all">
                                                                <td className="py-4 px-6 font-semibold text-white">{userItem.name}</td>
                                                                <td className="py-4 px-3 text-slate-400">{userItem.email}</td>
                                                                <td className="py-4 px-3">
                                                                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                                                                        userItem.role === 'admin' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                                        userItem.role === 'mentor' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                                        'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                                                    }`}>
                                                                        {userItem.role}
                                                                    </span>
                                                                </td>
                                                                <td className="py-4 px-3 text-right">
                                                                    <button
                                                                        onClick={() => {
                                                                            if (confirm('Permanently delete this user from database?')) {
                                                                                deleteUserMutation.mutate(userItem._id);
                                                                            }
                                                                        }}
                                                                        disabled={deleteUserMutation.isPending}
                                                                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Add User Drawer */}
                                <div className="lg:col-span-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                        <UserPlus className="w-4 h-4 text-indigo-400" /> Register New Account
                                    </h3>
                                    <form onSubmit={handleCreateUser} className="space-y-4">
                                        <Input label="Full Name" value={newName} onChange={e => setNewName(e.target.value)} required />
                                        <Input label="Email Address" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} required />
                                        <Input label="Password" type="password" placeholder="Minimum 6 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input label="Age" type="number" value={newAge} onChange={e => setNewAge(e.target.value)} required />
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-xs font-semibold text-gray-400">Role</label>
                                                <select
                                                    className="bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 w-full transition-all"
                                                    value={newRole}
                                                    onChange={e => setNewRole(e.target.value)}
                                                >
                                                    <option value="user">User (Student)</option>
                                                    <option value="mentor">Mentor</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <Button type="submit" loading={addUserMutation.isPending} className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500">
                                            Create User
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    } />

                    {/* ROUTE: SERVER LOGS */}
                    <Route path="logs" element={
                        <div className="space-y-6 animate-in fade-in">
                            <div className="border-b border-white/5 pb-6">
                                <h1 className="text-2xl font-extrabold tracking-tight">System Server Logs</h1>
                                <p className="text-xs text-slate-400 mt-1">Live monitoring logs read directly from logs/combined.log on the express server.</p>
                            </div>
                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-mono text-slate-500">combined.log</span>
                                    <Button 
                                        onClick={() => refetchLogs()} 
                                        className="text-xs py-1.5 px-3 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300 bg-transparent shadow-none"
                                    >
                                        Refresh Logs
                                    </Button>
                                </div>
                                {loadingLogs ? (
                                    <div className="flex justify-center py-12"><span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
                                ) : (
                                    <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-auto h-[480px] leading-relaxed whitespace-pre-wrap select-text selection:bg-indigo-500/30 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                        {serverLogs || 'No logs currently recorded.'}
                                    </pre>
                                )}
                            </div>
                        </div>
                    } />

                    {/* ROUTE: BRANDING & CONTACT SETTINGS */}
                    <Route path="settings" element={
                        <div className="space-y-6 animate-in fade-in">
                            <div className="border-b border-white/5 pb-6">
                                <h1 className="text-2xl font-extrabold tracking-tight">Branding & Contact Coordinates</h1>
                                <p className="text-xs text-slate-400 mt-1">Manage global brand name, inquiry emails, phone and headquarters addresses (Navbar / Footer configuration).</p>
                            </div>
                            {loadingCms ? (
                                <div className="flex justify-center py-16"><span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    cmsMutation.mutate(cmsConfig);
                                }} className="space-y-6 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Brand Name Title"
                                            value={cmsConfig?.brandName || ''}
                                            onChange={e => {
                                                const val = e.target.value;
                                                queryClient.setQueryData(['cmsConfigAdmin'], prev => ({ ...prev, brandName: val }));
                                            }}
                                            required
                                        />
                                        <Input
                                            label="General Support Inquiry Email"
                                            value={cmsConfig?.contactEmail || ''}
                                            onChange={e => {
                                                const val = e.target.value;
                                                queryClient.setQueryData(['cmsConfigAdmin'], prev => ({ ...prev, contactEmail: val }));
                                            }}
                                            required
                                        />
                                        <Input
                                            label="Direct Helpline Phone"
                                            value={cmsConfig?.contactPhone || ''}
                                            onChange={e => {
                                                const val = e.target.value;
                                                queryClient.setQueryData(['cmsConfigAdmin'], prev => ({ ...prev, contactPhone: val }));
                                            }}
                                            required
                                        />
                                        <Input
                                            label="Headquarters Address Location"
                                            value={cmsConfig?.headquarters || ''}
                                            onChange={e => {
                                                const val = e.target.value;
                                                queryClient.setQueryData(['cmsConfigAdmin'], prev => ({ ...prev, headquarters: val }));
                                            }}
                                            required
                                        />
                                    </div>

                                    <Button type="submit" loading={cmsMutation.isPending} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500">
                                        Save Branding Settings
                                    </Button>
                                </form>
                            )}
                        </div>
                    } />

                    {/* ROUTE: PAYMENTS LEDGER */}
                    <Route path="payments" element={
                        <div className="space-y-6 animate-in fade-in">
                            <div className="border-b border-white/5 pb-6">
                                <h1 className="text-2xl font-extrabold tracking-tight">Payments Ledger</h1>
                                <p className="text-xs text-slate-400 mt-1">Global audit ledger of simulated client and student transactions.</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard label="Total Revenue Ledgered" value={`$${totalLedgerRevenue.toLocaleString()}`} icon={DollarSign} trend="+18.4%" trendUp={true} color="emerald" loading={loadingPayments} />
                                <StatCard label="Total Successful Sprints" value={payments.length} icon={CheckCircle2} trend="+12.1%" trendUp={true} color="indigo" loading={loadingPayments} />
                                <StatCard label="Payment Gateway Status" value="100% Succeeded" icon={Shield} trend="Healthy" trendUp={true} color="cyan" loading={false} />
                            </div>

                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white mb-4">Transactional Records</h3>
                                {loadingPayments ? (
                                    <div className="flex justify-center py-12">
                                        <span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : payments.length === 0 ? (
                                    <p className="text-slate-500 text-xs py-10 text-center">No transaction records registered yet.</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs border-collapse">
                                            <thead>
                                                <tr className="border-b border-slate-850 text-slate-400 text-[10px] uppercase tracking-wider font-semibold">
                                                    <th className="py-4 px-6">User / Email</th>
                                                    <th className="py-4 px-3">Description</th>
                                                    <th className="py-4 px-3">Card Info</th>
                                                    <th className="py-4 px-3">Amount</th>
                                                    <th className="py-4 px-3">Status</th>
                                                    <th className="py-4 px-3 text-right">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-900/60">
                                                {payments.map(payItem => (
                                                    <tr key={payItem._id} className="hover:bg-white/[0.01] transition-all">
                                                        <td className="py-4 px-6">
                                                            <p className="font-semibold text-white">{payItem.user?.name || 'Deleted User'}</p>
                                                            <p className="text-[10px] text-slate-500">{payItem.user?.email}</p>
                                                        </td>
                                                        <td className="py-4 px-3 text-slate-300 font-medium">{payItem.description}</td>
                                                        <td className="py-4 px-3 text-slate-400 uppercase tracking-widest text-[10px]">
                                                            {payItem.cardBrand} •••• {payItem.last4}
                                                        </td>
                                                        <td className="py-4 px-3 font-bold text-white">${payItem.amount.toFixed(2)}</td>
                                                        <td className="py-4 px-3">
                                                            <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                                {payItem.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-3 text-slate-500 text-right">
                                                            {new Date(payItem.createdAt).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    } />
                </Routes>
            </main>
        </div>
    );
};

export default AdminLayout;
