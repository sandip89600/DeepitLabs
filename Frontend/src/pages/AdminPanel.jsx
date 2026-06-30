import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useNotificationsStore } from '../store/notificationsStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
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
    Globe,
    FileText,
    Settings as ConfigIcon
} from 'lucide-react';

// ─── Mini Bar Chart Component (CSS-only) ────────────────────────
const MiniBarChart = ({ data, color = 'indigo' }) => {
    const max = Math.max(...data.map(d => d.count), 1);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
        <div className="flex items-end gap-1.5 h-32 w-full pt-4">
            {data.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-slate-500 font-medium">{item.count}</span>
                    <div 
                        className={`w-full rounded-t-md bg-${color}-500/30 border border-${color}-500/20 transition-all duration-700 hover:bg-${color}-500/50`}
                        style={{ height: `${(item.count / max) * 100}%`, minHeight: '4px' }}
                    />
                    <span className="text-[9px] text-slate-500">{months[item._id - 1] || item._id}</span>
                </div>
            ))}
        </div>
    );
};

// ─── Donut Chart Component (SVG) ────────────────────────────────
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

// ─── Frontend Config CMS Manager component ─────────────────────
const CmsManager = ({ initialConfig, onSave, isSaving }) => {
    const [form, setForm] = useState(initialConfig);
    const [subTab, setSubTab] = useState('general');

    const handleFieldChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleNestedChange = (section, index, key, value) => {
        setForm(prev => {
            const list = [...prev[section]];
            list[index] = { ...list[index], [key]: value };
            return { ...prev, [section]: list };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    if (!form) return null;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in">
            {/* Sub-navigation inside CMS */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
                {['general', 'home', 'about', 'services', 'portfolio'].map(tabId => (
                    <button
                        type="button"
                        key={tabId}
                        onClick={() => setSubTab(tabId)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                            subTab === tabId
                                ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                        }`}
                    >
                        {tabId}
                    </button>
                ))}
            </div>

            {/* Sub-panel: General */}
            {subTab === 'general' && (
                <div className="space-y-4 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-2">Global Settings & Contact Branding</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Brand Name"
                            value={form.brandName || ''}
                            onChange={e => handleFieldChange('brandName', e.target.value)}
                            required
                        />
                        <Input
                            label="Contact Email"
                            value={form.contactEmail || ''}
                            onChange={e => handleFieldChange('contactEmail', e.target.value)}
                            required
                        />
                        <Input
                            label="Contact Phone"
                            value={form.contactPhone || ''}
                            onChange={e => handleFieldChange('contactPhone', e.target.value)}
                            required
                        />
                        <Input
                            label="Headquarters Location"
                            value={form.headquarters || ''}
                            onChange={e => handleFieldChange('headquarters', e.target.value)}
                            required
                        />
                    </div>
                </div>
            )}

            {/* Sub-panel: Home */}
            {subTab === 'home' && (
                <div className="space-y-4 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-2">Home Page Hero Configs</h3>
                    <Input
                        label="Hero Title text"
                        value={form.heroTitle || ''}
                        onChange={e => handleFieldChange('heroTitle', e.target.value)}
                        required
                    />
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Hero Description text</label>
                        <textarea
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all h-24 resize-none"
                            value={form.heroDesc || ''}
                            onChange={e => handleFieldChange('heroDesc', e.target.value)}
                            required
                        />
                    </div>

                    <h3 className="text-sm font-bold text-white mt-6 mb-2">Hero Analytics statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {form.stats?.map((stat, i) => (
                            <div key={i} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                                <span className="text-[10px] text-indigo-400 font-mono">Stat #{i+1}</span>
                                <Input
                                    label="Value text"
                                    value={stat.value || ''}
                                    onChange={e => handleNestedChange('stats', i, 'value', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Label text"
                                    value={stat.label || ''}
                                    onChange={e => handleNestedChange('stats', i, 'label', e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sub-panel: About */}
            {subTab === 'about' && (
                <div className="space-y-4 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-2">About Page Core Narrative</h3>
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mission statement</label>
                        <textarea
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all h-24 resize-none"
                            value={form.aboutMission || ''}
                            onChange={e => handleFieldChange('aboutMission', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Vision statement</label>
                        <textarea
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all h-24 resize-none"
                            value={form.aboutVision || ''}
                            onChange={e => handleFieldChange('aboutVision', e.target.value)}
                            required
                        />
                    </div>

                    <h3 className="text-sm font-bold text-white mt-6 mb-2">Core Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {form.aboutValues?.map((val, i) => (
                            <div key={i} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                                <span className="text-[10px] text-indigo-400 font-mono">Value #{i+1}</span>
                                <Input
                                    label="Title text"
                                    value={val.title || ''}
                                    onChange={e => handleNestedChange('aboutValues', i, 'title', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Icon Emoji"
                                    value={val.icon || ''}
                                    onChange={e => handleNestedChange('aboutValues', i, 'icon', e.target.value)}
                                    required
                                />
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description text</label>
                                    <textarea
                                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all h-16 resize-none"
                                        value={val.desc || ''}
                                        onChange={e => handleNestedChange('aboutValues', i, 'desc', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sub-panel: Services */}
            {subTab === 'services' && (
                <div className="space-y-4 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-2">Core Services Configurations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {form.services?.map((serv, i) => (
                            <div key={i} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                                <span className="text-[10px] text-indigo-400 font-mono">Service #{i+1}</span>
                                <Input
                                    label="Title text"
                                    value={serv.title || ''}
                                    onChange={e => handleNestedChange('services', i, 'title', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Icon Emoji"
                                    value={serv.icon || ''}
                                    onChange={e => handleNestedChange('services', i, 'icon', e.target.value)}
                                    required
                                />
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description text</label>
                                    <textarea
                                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all h-20 resize-none"
                                        value={serv.desc || ''}
                                        onChange={e => handleNestedChange('services', i, 'desc', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sub-panel: Portfolio */}
            {subTab === 'portfolio' && (
                <div className="space-y-4 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-2">Portfolio Case Studies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {form.projects?.map((proj, i) => (
                            <div key={i} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                                <span className="text-[10px] text-indigo-400 font-mono">Project #{i+1}</span>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        label="Title text"
                                        value={proj.title || ''}
                                        onChange={e => handleNestedChange('projects', i, 'title', e.target.value)}
                                        required
                                    />
                                    <Input
                                        label="Category"
                                        value={proj.category || ''}
                                        onChange={e => handleNestedChange('projects', i, 'category', e.target.value)}
                                        required
                                    />
                                </div>
                                <Input
                                    label="Image URL link"
                                    value={proj.image || ''}
                                    onChange={e => handleNestedChange('projects', i, 'image', e.target.value)}
                                    required
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        label="Key Metric"
                                        value={proj.metric || ''}
                                        onChange={e => handleNestedChange('projects', i, 'metric', e.target.value)}
                                        required
                                    />
                                    <Input
                                        label="Metric Label"
                                        value={proj.metricTitle || ''}
                                        onChange={e => handleNestedChange('projects', i, 'metricTitle', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description text</label>
                                    <textarea
                                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all h-20 resize-none"
                                        value={proj.desc || ''}
                                        onChange={e => handleNestedChange('projects', i, 'desc', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Button type="submit" loading={isSaving} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500">
                Save Configurations
            </Button>
        </form>
    );
};

// ═══════════════════════════════════════════════════════════════
// ADMIN DASHBOARD PANEL
// ═══════════════════════════════════════════════════════════════
const AdminPanel = () => {
    const { addNotification } = useNotificationsStore();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('overview');

    // CMS dynamic frontend configuration fetching and mutation
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

    // Server log file retriever
    const { data: serverLogs, isLoading: loadingLogs, refetch: refetchLogs } = useQuery({
        queryKey: ['serverLogs'],
        queryFn: async () => {
            const res = await api.get('/users/logs');
            return res.data.data;
        },
        enabled: activeTab === 'logs'
    });

    // Add user form states
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState('user');
    const [newAge, setNewAge] = useState('');

    // ─── Data Fetching ──────────────────────────────────────────
    const { data: adminStats, isLoading: loadingStats } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await api.get('/users/stats');
            return res.data.data;
        },
        retry: 1
    });

    const { data: users = [], isLoading: loadingUsers } = useQuery({
        queryKey: ['usersDirectory'],
        queryFn: async () => {
            const res = await api.get('/users?limit=100');
            return res.data.data;
        }
    });

    const { data: courseStats = [], isLoading: loadingCourseStats } = useQuery({
        queryKey: ['coursesStats'],
        queryFn: async () => {
            const res = await api.get('/courses/stats');
            return res.data.data;
        },
        retry: 1
    });

    // ─── Mutations ──────────────────────────────────────────────
    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            await api.delete(`/users/${userId}`);
        },
        onSuccess: () => {
            addNotification('User deleted successfully', 'success');
            queryClient.invalidateQueries({ queryKey: ['usersDirectory'] });
            queryClient.invalidateQueries({ queryKey: ['adminStats'] });
        },
        onError: (err) => {
            addNotification(err.response?.data?.error || 'Failed to delete user', 'error');
        }
    });

    const addUserMutation = useMutation({
        mutationFn: async (userData) => {
            const res = await api.post('/users', userData);
            return res.data;
        },
        onSuccess: () => {
            addNotification('User created successfully!', 'success');
            setNewName(''); setNewEmail(''); setNewPassword(''); setNewRole('user'); setNewAge('');
            queryClient.invalidateQueries({ queryKey: ['usersDirectory'] });
            queryClient.invalidateQueries({ queryKey: ['adminStats'] });
        },
        onError: (err) => {
            addNotification(err.response?.data?.error || 'Failed to create user', 'error');
        }
    });

    const handleAddUser = (e) => {
        e.preventDefault();
        addUserMutation.mutate({
            name: newName,
            email: newEmail,
            password: newPassword,
            role: newRole,
            age: parseInt(newAge, 10)
        });
    };

    // ─── Derived Data ───────────────────────────────────────────
    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRevenue = courseStats.reduce((sum, g) => sum + (g.averageTuition * g.courseCount || 0), 0);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: PieChart },
        { id: 'cms', label: 'Frontend Manager', icon: Globe },
        { id: 'logs', label: 'Server Logs', icon: FileText }
    ];

    return (
        <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950 to-slate-950 text-white font-sans py-8 px-6 md:px-12">
            <Helmet>
                <title>Admin Dashboard | Deep IT Labs</title>
                <meta name="description" content="Admin control center for managing users, viewing analytics, and monitoring platform health." />
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent flex items-center gap-2.5">
                            Admin Control Center <Shield className="w-6 h-6 text-indigo-400" />
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">Real-time platform metrics, user operations, and system oversight.</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Database Connected
                        </span>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-1 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-xl p-1.5 w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                activeTab === tab.id
                                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                            }`}
                        >
                            <tab.icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ════════════════════════════════════════════════════════ */}
                {/* TAB: OVERVIEW                                          */}
                {/* ════════════════════════════════════════════════════════ */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <StatCard 
                                label="Total Users" 
                                value={adminStats?.totalUsers || users.length || 0}
                                icon={Users} 
                                trend="+12%" 
                                trendUp 
                                color="indigo" 
                                loading={loadingStats}
                            />
                            <StatCard 
                                label="Active Users" 
                                value={adminStats?.activeUsers || 0}
                                icon={Activity} 
                                trend="+8%" 
                                trendUp 
                                color="emerald" 
                                loading={loadingStats}
                            />
                            <StatCard 
                                label="Total Revenue" 
                                value={`$${Math.round(totalRevenue).toLocaleString()}`}
                                icon={DollarSign} 
                                trend="+23%" 
                                trendUp 
                                color="violet" 
                                loading={loadingCourseStats}
                            />
                            <StatCard 
                                label="Course Programs" 
                                value={courseStats.reduce((sum, g) => sum + (g.courseCount || 0), 0)}
                                icon={BarChart3} 
                                trend="+4" 
                                trendUp 
                                color="amber" 
                                loading={loadingCourseStats}
                            />
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            {/* Monthly Growth Chart */}
                            <div className="lg:col-span-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-indigo-400" /> User Growth
                                </h3>
                                <p className="text-xs text-slate-500 mb-4">Monthly registration trends</p>
                                {adminStats?.monthlyGrowth?.length > 0 ? (
                                    <MiniBarChart data={adminStats.monthlyGrowth} color="indigo" />
                                ) : (
                                    <div className="h-32 flex items-center justify-center text-xs text-slate-500">No growth data available yet</div>
                                )}
                            </div>

                            {/* Role Distribution Donut */}
                            <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                                    <PieChart className="w-4 h-4 text-violet-400" /> Role Distribution
                                </h3>
                                <p className="text-xs text-slate-500 mb-4">Users by portal role</p>
                                {adminStats?.roleStats?.length > 0 ? (
                                    <DonutChart data={adminStats.roleStats} />
                                ) : (
                                    <div className="h-28 flex items-center justify-center text-xs text-slate-500">No role data available</div>
                                )}
                            </div>
                        </div>

                        {/* Recent Users + Quick Actions Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Users */}
                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                    <Clock className="w-4 h-4 text-indigo-400" /> Recent Registrations
                                </h3>
                                <div className="space-y-3">
                                    {(adminStats?.recentUsers || users.slice(0, 5)).map((u, i) => (
                                        <div key={u._id || i} className="flex items-center justify-between py-2 border-b border-slate-800/40 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                                                    {u.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-white">{u.name}</p>
                                                    <p className="text-[10px] text-slate-500">{u.email}</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded capitalize">{u.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Course Revenue Table */}
                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                    <DollarSign className="w-4 h-4 text-emerald-400" /> Revenue by Skill Tier
                                </h3>
                                {courseStats.length > 0 ? (
                                    <div className="space-y-3">
                                        {courseStats.map((group) => (
                                            <div key={group._id} className="flex items-center justify-between py-2 border-b border-slate-800/40 last:border-0">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold text-white capitalize">{group._id}</span>
                                                    <span className="text-[10px] text-slate-500">{group.courseCount} courses</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-bold text-emerald-400">${Math.round(group.averageTuition)} avg</p>
                                                    <p className="text-[10px] text-slate-500">${group.minTuition} – ${group.maxTuition}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-20 flex items-center justify-center text-xs text-slate-500">No revenue data</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ════════════════════════════════════════════════════════ */}
                {/* TAB: USER MANAGEMENT                                   */}
                {/* ════════════════════════════════════════════════════════ */}
                {activeTab === 'users' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Users Table */}
                            <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                        <Users className="w-4 h-4 text-indigo-400" /> All Users ({users.length})
                                    </h3>
                                    <div className="relative w-full sm:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                        <input 
                                            type="text" 
                                            placeholder="Search users..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                                        />
                                    </div>
                                </div>
                                
                                {loadingUsers ? (
                                    <div className="flex justify-center py-12">
                                        <span className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                                        <table className="w-full text-left text-xs border-collapse">
                                            <thead>
                                                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider sticky top-0 bg-slate-900/80 backdrop-blur-sm">
                                                    <th className="py-3 px-3">User</th>
                                                    <th className="py-3 px-3">Email</th>
                                                    <th className="py-3 px-3">Role</th>
                                                    <th className="py-3 px-3">Status</th>
                                                    <th className="py-3 px-3 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800/50">
                                                {filteredUsers.map((u) => (
                                                    <tr key={u._id} className="hover:bg-slate-800/20 transition-colors group">
                                                        <td className="py-3 px-3">
                                                            <div className="flex items-center gap-2.5">
                                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                                                    {u.name?.charAt(0).toUpperCase()}
                                                                </div>
                                                                <span className="font-semibold text-white">{u.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-3 text-slate-400">{u.email}</td>
                                                        <td className="py-3 px-3">
                                                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full capitalize border ${
                                                                u.role === 'admin' 
                                                                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                                                    : u.role === 'mentor'
                                                                    ? 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                                                                    : 'bg-slate-900 text-slate-400 border-slate-800'
                                                            }`}>
                                                                {u.role}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-3">
                                                            {u.isActive !== false ? (
                                                                <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold">
                                                                    <CheckCircle2 className="w-3 h-3" /> Active
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-1 text-red-400 text-[10px] font-semibold">
                                                                    <XCircle className="w-3 h-3" /> Suspended
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-3 text-right">
                                                            <button 
                                                                onClick={() => {
                                                                    if (window.confirm(`Are you sure you want to delete ${u.name}?`)) {
                                                                        deleteUserMutation.mutate(u._id);
                                                                    }
                                                                }}
                                                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-all cursor-pointer"
                                                                title="Delete user"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Add User Form */}
                            <div className="lg:col-span-1">
                                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6 sticky top-24">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                        <UserPlus className="w-4 h-4 text-emerald-400" /> Add New User
                                    </h3>
                                    <form onSubmit={handleAddUser} className="space-y-3">
                                        <Input label="Full Name" id="add-name" value={newName} onChange={(e) => setNewName(e.target.value)} required />
                                        <Input label="Email Address" id="add-email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
                                        <Input label="Password" id="add-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input label="Age" id="add-age" type="number" value={newAge} onChange={(e) => setNewAge(e.target.value)} required />
                                            <div className="flex flex-col gap-1.5">
                                                <label htmlFor="add-role" className="text-xs font-semibold text-gray-400">Role</label>
                                                <select
                                                    id="add-role"
                                                    value={newRole}
                                                    onChange={(e) => setNewRole(e.target.value)}
                                                    className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 w-full transition-all"
                                                    required
                                                >
                                                    <option value="user">User</option>
                                                    <option value="mentor">Mentor</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="client">Client</option>
                                                    <option value="developer">Developer</option>
                                                </select>
                                            </div>
                                        </div>
                                        <Button 
                                            type="submit" 
                                            className="w-full mt-2 text-xs shadow-md shadow-indigo-950/30"
                                            loading={addUserMutation.isPending}
                                        >
                                            Create User
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ════════════════════════════════════════════════════════ */}
                {/* TAB: ANALYTICS                                         */}
                {/* ════════════════════════════════════════════════════════ */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Course Stats Table */}
                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                    <BarChart3 className="w-4 h-4 text-indigo-400" /> Course Aggregation Statistics
                                </h3>
                                <p className="text-[10px] text-slate-500 mb-4">MongoDB Aggregation Pipeline — tuition grouping by skill tier</p>
                                {loadingCourseStats ? (
                                    <div className="flex justify-center py-8">
                                        <span className="w-6 h-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                                    </div>
                                ) : courseStats.length === 0 ? (
                                    <p className="text-xs text-slate-500 py-6 text-center">No courses created yet</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs text-slate-300 border-collapse">
                                            <thead>
                                                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                                                    <th className="py-3 px-3">Skill Tier</th>
                                                    <th className="py-3 px-3">Courses</th>
                                                    <th className="py-3 px-3">Avg Tuition</th>
                                                    <th className="py-3 px-3">Range</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800/50">
                                                {courseStats.map((group) => (
                                                    <tr key={group._id} className="hover:bg-slate-800/20 transition-colors">
                                                        <td className="py-3 px-3 font-semibold text-white capitalize">{group._id}</td>
                                                        <td className="py-3 px-3">{group.courseCount}</td>
                                                        <td className="py-3 px-3 text-emerald-400 font-semibold">${Math.round(group.averageTuition)}</td>
                                                        <td className="py-3 px-3 text-slate-500">${group.minTuition} – ${group.maxTuition}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Platform Health */}
                            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                    <Activity className="w-4 h-4 text-emerald-400" /> Platform Health
                                </h3>
                                <div className="space-y-5">
                                    <HealthBar label="Database Uptime" value={99.8} color="emerald" />
                                    <HealthBar label="API Response Rate" value={97.5} color="indigo" />
                                    <HealthBar label="Auth Success Rate" value={95.2} color="violet" />
                                    <HealthBar label="Storage Capacity" value={42} color="amber" />
                                </div>
                            </div>
                        </div>

                        {/* Monthly Growth Full Width */}
                        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-indigo-400" /> Monthly Registration Trends
                            </h3>
                            <p className="text-[10px] text-slate-500 mb-4">User acquisition metrics over time</p>
                            {adminStats?.monthlyGrowth?.length > 0 ? (
                                <MiniBarChart data={adminStats.monthlyGrowth} color="violet" />
                            ) : (
                                <div className="h-32 flex items-center justify-center text-xs text-slate-500">Registration data will appear once more users sign up over time</div>
                            )}
                        </div>
                    </div>
                )}

                {/* ════════════════════════════════════════════════════════ */}
                {/* TAB: CMS MANAGER                                        */}
                {/* ════════════════════════════════════════════════════════ */}
                {activeTab === 'cms' && (
                    <div className="space-y-6 animate-in fade-in">
                        {loadingCms ? (
                            <div className="flex justify-center py-16">
                                <span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <CmsManager 
                                initialConfig={cmsConfig} 
                                onSave={(updated) => cmsMutation.mutate(updated)} 
                                isSaving={cmsMutation.isPending}
                            />
                        )}
                    </div>
                )}

                {/* ════════════════════════════════════════════════════════ */}
                {/* TAB: SERVER LOGS                                        */}
                {/* ════════════════════════════════════════════════════════ */}
                {activeTab === 'logs' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-indigo-400" /> Server Logs Viewer
                                    </h3>
                                    <p className="text-[10px] text-slate-500 mt-1">Live monitoring logs from combined.log on the server.</p>
                                </div>
                                <Button 
                                    onClick={() => refetchLogs()} 
                                    className="text-xs py-1.5 px-3 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300 bg-transparent shadow-none"
                                >
                                    Refresh Logs
                                </Button>
                            </div>
                            
                            {loadingLogs ? (
                                <div className="flex justify-center py-12">
                                    <span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-auto h-[450px] leading-relaxed whitespace-pre-wrap select-text selection:bg-indigo-500/30 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                    {serverLogs || 'No logs registered on the server.'}
                                </pre>
                            )}
                        </div>
                    </div>
                )}
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

export default AdminPanel;
