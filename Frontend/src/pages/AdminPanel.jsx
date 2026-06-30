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
    Eye
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

// ═══════════════════════════════════════════════════════════════
// ADMIN DASHBOARD PANEL
// ═══════════════════════════════════════════════════════════════
const AdminPanel = () => {
    const { addNotification } = useNotificationsStore();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('overview');

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
        { id: 'analytics', label: 'Analytics', icon: PieChart }
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
