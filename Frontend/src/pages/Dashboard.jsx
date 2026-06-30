import React, { useContext, useState, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNotificationsStore } from '../store/notificationsStore';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';
import {
    User,
    Mail,
    Calendar,
    Upload,
    Award,
    BookOpen,
    Shield,
    TrendingUp,
    Zap,
    PlayCircle,
    FileText,
    MessageSquare,
    CreditCard,
    Settings,
    HelpCircle,
    ChevronRight,
    CheckCircle2,
    Clock,
    XCircle,
    GraduationCap,
    Briefcase,
    Folder,
    Video,
    Bell,
    Flame,
    ArrowRight,
    Star,
    Eye,
    ExternalLink,
    Layers,
    Cpu,
    Globe,
    PenTool
} from 'lucide-react';

// ─── Horizontal Spark Bar ───────────────────────────────────────
const SparkBar = ({ value, max, color = '#6366f1', height = 6 }) => (
    <div className="w-full rounded-full overflow-hidden" style={{ height, backgroundColor: 'rgba(30,41,59,0.6)' }}>
        <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
    </div>
);

// ─── Animated Counter ───────────────────────────────────────────
const CountBadge = ({ value, label, gradient }) => (
    <div className={`relative rounded-2xl p-[1px] overflow-hidden`} style={{ background: gradient }}>
        <div className="bg-slate-950 rounded-2xl px-5 py-4 text-center h-full">
            <p className="text-2xl font-black text-white tracking-tight">{value}</p>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1">{label}</p>
        </div>
    </div>
);

// ═══════════════════════════════════════════════════════════════
// DEEP IT LABS — ORIGINAL BENTO DASHBOARD
// ═══════════════════════════════════════════════════════════════
const Dashboard = () => {
    const { user, setUser } = useContext(AuthContext);
    const { addNotification } = useNotificationsStore();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [activeView, setActiveView] = useState('overview');

    // ─── API Data ───────────────────────────────────────────────
    const { data: courses = [] } = useQuery({
        queryKey: ['myCourses'],
        queryFn: async () => {
            try {
                const res = await api.get('/courses?limit=10');
                return res.data?.data || [];
            } catch { return []; }
        },
        retry: 1
    });

    // ─── Avatar Upload ──────────────────────────────────────────
    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) { addNotification('Please select an image file first', 'warning'); return; }
        setUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);
        try {
            const res = await api.put('/users/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setUser(prev => ({ ...prev, avatar: res.data.avatarUrl }));
            addNotification('Profile picture updated!', 'success');
            setFile(null);
        } catch (err) {
            addNotification(err.response?.data?.error || 'Upload failed', 'error');
        } finally { setUploading(false); }
    };

    const avatarSrc = user?.avatar && user.avatar !== 'default-avatar.png' ? user.avatar : null;

    // ─── Streak / engagement data ───────────────────────────────
    const streak = 12; // Days
    const xpPoints = 2450;

    // ─── Module progress data ───────────────────────────────────
    const modules = [
        { name: 'Frontend Foundations', icon: Globe, hours: 42, total: 42, color: '#10b981', status: 'done' },
        { name: 'JavaScript Mastery', icon: Zap, hours: 38, total: 38, color: '#f59e0b', status: 'done' },
        { name: 'React Ecosystem', icon: Layers, hours: 28, total: 36, color: '#6366f1', status: 'active' },
        { name: 'Backend Engineering', icon: Cpu, hours: 8, total: 40, color: '#8b5cf6', status: 'active' },
        { name: 'DevOps & Deployment', icon: Globe, hours: 0, total: 30, color: '#334155', status: 'locked' },
    ];

    const totalHours = modules.reduce((s, m) => s + m.hours, 0);
    const totalRequired = modules.reduce((s, m) => s + m.total, 0);

    // ─── Recent activity timeline ───────────────────────────────
    const timeline = [
        { action: 'Completed React Hooks Deep Dive', time: '2 hours ago', type: 'complete' },
        { action: 'Submitted Assignment #14 — State Management', time: '5 hours ago', type: 'submit' },
        { action: 'Watched "Node.js Event Loop" lecture', time: 'Yesterday', type: 'watch' },
        { action: 'Earned JavaScript Mastery Certificate', time: '3 days ago', type: 'badge' },
        { action: 'Payment received — ₹15,000', time: '1 week ago', type: 'payment' },
    ];

    const timelineIcons = {
        complete: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        submit: { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        watch: { icon: PlayCircle, color: 'text-violet-400', bg: 'bg-violet-500/10' },
        badge: { icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        payment: { icon: CreditCard, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    };

    // ─── View tabs ──────────────────────────────────────────────
    const views = [
        { id: 'overview', label: 'Overview' },
        { id: 'learning', label: 'Learning Path' },
        { id: 'payments', label: 'Payments' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <Helmet>
                <title>My Dashboard | Deep IT Labs</title>
                <meta name="description" content="Your personal learning hub at Deep IT Labs. Track progress, view courses, and manage your engineering journey." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-5 md:px-10 py-8 space-y-7">

                {/* ─── Greeting Row ──────────────────────────────── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500 opacity-50 blur-sm group-hover:opacity-80 transition-all duration-500" />
                            {avatarSrc ? (
                                <img src={avatarSrc} alt="" className="relative w-16 h-16 rounded-2xl object-cover border-2 border-slate-900" />
                            ) : (
                                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center text-xl font-black text-white border-2 border-slate-900">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-medium">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},</p>
                            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">{user?.name}</h1>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-400 px-2.5 py-0.5 rounded-md border border-cyan-500/20 uppercase tracking-wider">
                                    {user?.role}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-orange-500/10 text-orange-400 px-2.5 py-0.5 rounded-md border border-orange-500/20">
                                    <Flame className="w-3 h-3" /> {streak} day streak
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate('/settings')} className="p-2.5 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800/60 rounded-xl transition-all cursor-pointer">
                            <Settings className="w-4 h-4" />
                        </button>
                        <button className="relative p-2.5 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800/60 rounded-xl transition-all cursor-pointer">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                        </button>
                    </div>
                </div>

                {/* ─── View Tabs ─────────────────────────────────── */}
                <div className="flex gap-1 bg-slate-900/30 border border-slate-800/50 rounded-xl p-1 w-fit">
                    {views.map(v => (
                        <button
                            key={v.id}
                            onClick={() => setActiveView(v.id)}
                            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeView === v.id
                                    ? 'bg-white text-slate-950 shadow-md'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            {v.label}
                        </button>
                    ))}
                </div>

                {/* ════════════════════════════════════════════════ */}
                {/* OVERVIEW VIEW                                  */}
                {/* ════════════════════════════════════════════════ */}
                {activeView === 'overview' && (
                    <div className="space-y-6">

                        {/* Bento Row 1: KPIs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <CountBadge value={`${Math.round((totalHours / totalRequired) * 100)}%`} label="Overall Progress" gradient="linear-gradient(135deg, #06b6d4, #6366f1)" />
                            <CountBadge value={`${totalHours}h`} label="Hours Logged" gradient="linear-gradient(135deg, #6366f1, #a855f7)" />
                            <CountBadge value={xpPoints} label="XP Earned" gradient="linear-gradient(135deg, #f59e0b, #ef4444)" />
                            <CountBadge value={modules.filter(m => m.status === 'done').length} label="Modules Done" gradient="linear-gradient(135deg, #10b981, #06b6d4)" />
                        </div>

                        {/* Bento Row 2: Progress + Profile */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

                            {/* Module Progress — 3 cols */}
                            <div className="lg:col-span-3 bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-cyan-400" /> Engineering Modules
                                    </h3>
                                    <span className="text-[10px] text-slate-500 font-medium">{totalHours} / {totalRequired} hrs</span>
                                </div>
                                <div className="space-y-4">
                                    {modules.map((mod, i) => (
                                        <div key={i} className="group">
                                            <div className="flex items-center gap-3 mb-1.5">
                                                <div className={`p-1.5 rounded-lg ${mod.status === 'locked' ? 'bg-slate-800/40' : 'bg-slate-800/60'}`}>
                                                    <mod.icon className="w-3.5 h-3.5" style={{ color: mod.color }} />
                                                </div>
                                                <span className={`text-xs font-semibold flex-1 ${mod.status === 'locked' ? 'text-slate-600' : 'text-slate-200'}`}>
                                                    {mod.name}
                                                </span>
                                                {mod.status === 'done' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                                                {mod.status === 'active' && (
                                                    <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">ACTIVE</span>
                                                )}
                                                {mod.status === 'locked' && <XCircle className="w-3.5 h-3.5 text-slate-700" />}
                                                <span className={`text-[10px] font-bold ${mod.status === 'locked' ? 'text-slate-700' : 'text-slate-400'}`}>
                                                    {mod.hours}/{mod.total}h
                                                </span>
                                            </div>
                                            <SparkBar value={mod.hours} max={mod.total} color={mod.color} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Profile Card — 2 cols */}
                            <div className="lg:col-span-2 bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 flex flex-col">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-5">
                                    <User className="w-4 h-4 text-cyan-400" /> Your Profile
                                </h3>
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3 py-2 border-b border-slate-800/40">
                                        <Mail className="w-3.5 h-3.5 text-slate-600" />
                                        <span className="text-xs text-slate-300 truncate">{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 py-2 border-b border-slate-800/40">
                                        <Calendar className="w-3.5 h-3.5 text-slate-600" />
                                        <span className="text-xs text-slate-300">Age: {user?.age} years</span>
                                    </div>
                                    <div className="flex items-center gap-3 py-2 border-b border-slate-800/40">
                                        <Shield className="w-3.5 h-3.5 text-slate-600" />
                                        <span className="text-xs text-slate-300">Status: </span>
                                        <span className={`text-xs font-bold ${user?.isActive !== false ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {user?.isActive !== false ? 'Active' : 'Suspended'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 py-2">
                                        <Star className="w-3.5 h-3.5 text-slate-600" />
                                        <span className="text-xs text-slate-300">Tier: <strong className="text-white">Apprentice III</strong></span>
                                    </div>
                                </div>

                                {/* Compact Avatar Upload */}
                                <form onSubmit={handleUpload} className="mt-4 pt-4 border-t border-slate-800/40">
                                    <label className="flex items-center gap-3 px-3 py-2.5 bg-slate-950/60 border border-slate-800 border-dashed rounded-xl cursor-pointer hover:border-cyan-500/30 transition-all text-xs text-slate-500 hover:text-slate-300">
                                        <Upload className="w-4 h-4 shrink-0" />
                                        <span className="truncate">{file ? file.name : 'Change profile photo...'}</span>
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    </label>
                                    {file && (
                                        <Button type="submit" className="w-full mt-2 text-[10px] py-2" loading={uploading}>
                                            Upload
                                        </Button>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* Bento Row 3: Timeline + Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

                            {/* Activity Timeline — 3 cols */}
                            <div className="lg:col-span-3 bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-5">
                                    <Clock className="w-4 h-4 text-cyan-400" /> Recent Activity
                                </h3>
                                <div className="space-y-1">
                                    {timeline.map((item, i) => {
                                        const cfg = timelineIcons[item.type];
                                        return (
                                            <div key={i} className="flex items-start gap-3 py-3 border-b border-slate-800/30 last:border-0 hover:bg-slate-800/10 rounded-lg px-2 transition-all">
                                                <div className={`p-2 rounded-lg ${cfg.bg} shrink-0 mt-0.5`}>
                                                    <cfg.icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium text-slate-200">{item.action}</p>
                                                    <p className="text-[10px] text-slate-600 mt-0.5">{item.time}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quick Actions Grid — 2 cols */}
                            <div className="lg:col-span-2 space-y-5">
                                <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                                        <Zap className="w-4 h-4 text-amber-400" /> Quick Actions
                                    </h3>
                                    <div className="space-y-2">
                                        {[
                                            { icon: PlayCircle, label: 'Resume Learning', desc: 'Continue React Ecosystem', color: 'cyan', action: () => setActiveView('learning') },
                                            { icon: Video, label: 'Watch Recordings', desc: 'Latest lecture replays', color: 'violet' },
                                            { icon: CreditCard, label: 'View Payments', desc: 'Transaction history', color: 'emerald', action: () => setActiveView('payments') },
                                            { icon: MessageSquare, label: 'Get Support', desc: 'Chat with mentors', color: 'blue', action: () => navigate('/contact') },
                                        ].map((act, i) => (
                                            <button
                                                key={i}
                                                onClick={act.action}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950/40 border border-slate-800/40 hover:border-slate-700 hover:bg-slate-800/30 transition-all cursor-pointer group text-left"
                                            >
                                                <div className={`p-2 rounded-lg bg-${act.color}-500/10 border border-${act.color}-500/20`}>
                                                    <act.icon className={`w-4 h-4 text-${act.color}-400`} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-semibold text-white">{act.label}</p>
                                                    <p className="text-[10px] text-slate-600">{act.desc}</p>
                                                </div>
                                                <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-400 transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Achievements Compact */}
                                <div className="bg-gradient-to-br from-cyan-950/20 to-indigo-950/20 border border-cyan-900/20 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Award className="w-4 h-4 text-amber-400" />
                                        <h3 className="text-sm font-bold text-white">Achievements</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        {['🏆', '⚡', '🎯', '💎', '🔥'].map((emoji, i) => (
                                            <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                                                i < 3 ? 'bg-slate-800/60 border border-slate-700' : 'bg-slate-900/60 border border-slate-800/40 opacity-30'
                                            }`}>
                                                {emoji}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-600 mt-2">3 of 5 unlocked</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ════════════════════════════════════════════════ */}
                {/* LEARNING PATH VIEW                             */}
                {/* ════════════════════════════════════════════════ */}
                {activeView === 'learning' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-cyan-400" /> Your Learning Path
                        </h2>

                        {/* Enrolled Courses */}
                        {courses.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Enrolled Programs</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {courses.map((course) => (
                                        <div key={course._id} className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-5 hover:border-cyan-500/20 transition-all group">
                                            <div className="flex items-start justify-between gap-2 mb-3">
                                                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{course.title}</h4>
                                                <span className="text-[10px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20 shrink-0">
                                                    ${course.tuition}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-2 mb-4">{course.description}</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px]">
                                                    <span className="text-slate-500">Progress</span>
                                                    <span className="text-cyan-400 font-bold">65%</span>
                                                </div>
                                                <SparkBar value={65} max={100} color="#06b6d4" height={4} />
                                            </div>
                                            <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-600">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.weeks} weeks</span>
                                                <span className="capitalize px-1.5 py-0.5 bg-slate-800/60 rounded border border-slate-800">{course.minimumSkill}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Certifications Earned */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Certifications Earned</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { name: 'Frontend Development', icon: PenTool, issued: 'Mar 2026' },
                                    { name: 'JavaScript Engineering', icon: Zap, issued: 'May 2026' },
                                    { name: 'React Architecture', icon: Layers, issued: 'Jun 2026' },
                                ].map((cert, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-slate-900/30 border border-slate-800/50 rounded-2xl p-4 hover:border-amber-500/20 transition-all">
                                        <div className="p-3 bg-amber-500/10 border border-amber-500/15 rounded-xl">
                                            <cert.icon className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-white">{cert.name}</p>
                                            <p className="text-[10px] text-slate-500">Issued {cert.issued}</p>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Empty course state */}
                        {courses.length === 0 && (
                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-16 text-center">
                                <BookOpen className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                <p className="text-sm text-slate-400 font-medium">No courses enrolled yet</p>
                                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">Contact your admin or mentor to get assigned to a training program.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ════════════════════════════════════════════════ */}
                {/* PAYMENTS VIEW                                  */}
                {/* ════════════════════════════════════════════════ */}
                {activeView === 'payments' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-emerald-400" /> Payments & Billing
                        </h2>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-5">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Total Paid</p>
                                <p className="text-2xl font-black text-emerald-400 mt-1">₹25,000</p>
                            </div>
                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-5">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Pending</p>
                                <p className="text-2xl font-black text-amber-400 mt-1">₹15,000</p>
                            </div>
                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-5">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Next Due</p>
                                <p className="text-2xl font-black text-white mt-1">01 Jul</p>
                            </div>
                        </div>

                        {/* Transaction History */}
                        <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-800/50">
                                <h3 className="text-sm font-bold text-white">Transaction History</h3>
                            </div>
                            <div className="divide-y divide-slate-800/40">
                                {[
                                    { date: '15 Jun 2026', desc: 'Program Enrollment — Full Stack Batch', amount: '₹25,000', status: 'paid' },
                                    { date: '01 Jul 2026', desc: 'Monthly Installment — July', amount: '₹15,000', status: 'pending' },
                                    { date: '01 Aug 2026', desc: 'Monthly Installment — August', amount: '₹15,000', status: 'upcoming' },
                                ].map((tx, i) => (
                                    <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-800/10 transition-all">
                                        <div className={`p-2 rounded-lg ${
                                            tx.status === 'paid' ? 'bg-emerald-500/10' : tx.status === 'pending' ? 'bg-amber-500/10' : 'bg-slate-800/40'
                                        }`}>
                                            <CreditCard className={`w-4 h-4 ${
                                                tx.status === 'paid' ? 'text-emerald-400' : tx.status === 'pending' ? 'text-amber-400' : 'text-slate-600'
                                            }`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-white">{tx.desc}</p>
                                            <p className="text-[10px] text-slate-600">{tx.date}</p>
                                        </div>
                                        <span className={`text-sm font-bold ${
                                            tx.status === 'paid' ? 'text-emerald-400' : tx.status === 'pending' ? 'text-amber-400' : 'text-slate-600'
                                        }`}>
                                            {tx.amount}
                                        </span>
                                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                                            tx.status === 'paid' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                : tx.status === 'pending' 
                                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                                                : 'bg-slate-800/40 text-slate-600 border-slate-800'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
