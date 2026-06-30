import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNotificationsStore } from '../store/notificationsStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Helmet } from 'react-helmet-async';
import {
    GraduationCap,
    Layers,
    Clock,
    Award,
    Zap,
    PlayCircle,
    FileText,
    MessageSquare,
    CreditCard,
    ChevronRight,
    CheckCircle2,
    Lock as LockIcon,
    Unlock as UnlockIcon,
    Sparkles,
    Check,
    Bell
} from 'lucide-react';

// ─── Horizontal Spark Bar ───
const SparkBar = ({ value, max, color = '#6366f1', height = 6 }) => (
    <div className="w-full rounded-full overflow-hidden" style={{ height, backgroundColor: 'rgba(30,41,59,0.6)' }}>
        <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${max > 0 ? Math.min((value / max) * 100, 100) : 0}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
    </div>
);

// ─── Animated Counter ───
const CountBadge = ({ value, label, gradient }) => (
    <div className="relative rounded-2xl p-[1px] overflow-hidden" style={{ background: gradient }}>
        <div className="bg-slate-950 rounded-2xl px-5 py-4 text-center h-full">
            <p className="text-2xl font-black text-white tracking-tight">{value}</p>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1">{label}</p>
        </div>
    </div>
);

// ─── 8 Premium Courses Data ───
const MOCK_COURSES = [
    {
        id: 'html5-seo',
        title: 'HTML5 Semantic & SEO Foundations',
        category: 'Frontend',
        difficulty: 'Beginner',
        duration: '6 weeks',
        chapters: [
            { title: 'Semantic Tags vs Layout Divs', content: 'Semantic tags like <header>, <nav>, <main>, <section>, <article>, and <footer> explain the content structure to search engines and accessibility screen readers. Reusing standard div elements reduces accessibility index scoring.' },
            { title: 'Meta Tags & OpenGraph APIs', content: 'Configure dynamic meta viewport elements, content summaries, and OpenGraph tags to customize link-preview cards on chat clients (e.g. WhatsApp, Slack, Twitter).' }
        ]
    },
    {
        id: 'css-grid',
        title: 'Modern CSS Flexbox & Grid Layouts',
        category: 'Frontend',
        difficulty: 'Beginner',
        duration: '8 weeks',
        chapters: [
            { title: 'Flexbox Alignment Axes', content: 'Flexbox aligns elements in a single dimension (row or column). flex-grow handles width expansions, justify-content targets the primary axis, and align-items handles the secondary cross-axis.' },
            { title: 'CSS Grid Track Layout Templates', content: 'Grid provides two-dimensional grids (rows and columns). grid-template-areas simplifies building layout grids by matching named sections visually.' }
        ]
    },
    {
        id: 'js-async',
        title: 'JS Async & Advanced ES6 Features',
        category: 'Language',
        difficulty: 'Intermediate',
        duration: '10 weeks',
        chapters: [
            { title: 'Event Loops & Microtasks', content: 'JavaScript engines run on a single thread. The Event Loop coordinates execution cycles, giving Promise resolutions (Microtasks) priority over timers like setTimeout.' },
            { title: 'Callbacks, Promises, and Async/Await', content: 'Async/Await wraps Promises in standard linear syntax, making complex promise chains clean, readable, and easy to debug.' }
        ]
    },
    {
        id: 'react-hooks',
        title: 'React Hooks & State Architecture',
        category: 'Frontend',
        difficulty: 'Intermediate',
        duration: '12 weeks',
        chapters: [
            { title: 'useState, useEffect, and useRef', content: 'useState triggers component renders. useEffect runs side-effects matching changes in dependency arrays. useRef stores mutable values without triggering state updates.' },
            { title: 'Zustand Global State Stores', content: 'Zustand is a lightweight alternative to Redux. It defines simple state hooks, avoiding unnecessary component renders.' }
        ]
    },
    {
        id: 'node-express',
        title: 'Express.js REST API Design',
        category: 'Backend',
        difficulty: 'Intermediate',
        duration: '14 weeks',
        chapters: [
            { title: 'Express Routing & Middleware Stack', content: 'Express manages requests through sequential middleware layers. You can intercept incoming payloads to parse bodies, handle validation, or enforce auth guards.' },
            { title: 'Centralized Express Error Handlers', content: 'Define centralized catch blocks (e.g. next(err)) to standardize API responses with clear status codes and error messages.' }
        ]
    },
    {
        id: 'mongodb-mongoose',
        title: 'MongoDB Schema & Aggregations',
        category: 'Backend',
        difficulty: 'Advanced',
        duration: '12 weeks',
        chapters: [
            { title: 'Mongoose Schemas & Schema Validation', content: 'Mongoose enforces validation rules and relationships in MongoDB. You can run pre-save hooks to hash credentials or encrypt fields.' },
            { title: 'Aggregation Pipeline Operators', content: '$match filters records, $group groups matching datasets, and $sort sorts outputs to run fast, complex analytics inside MongoDB.' }
        ]
    },
    {
        id: 'docker-containers',
        title: 'Docker Orchestration & Microservices',
        category: 'DevOps',
        difficulty: 'Advanced',
        duration: '8 weeks',
        chapters: [
            { title: 'Containerization with Dockerfile', content: 'Docker packages your code and environment. You can use multi-stage builds to optimize image sizes.' },
            { title: 'Docker Compose Local Clusters', content: 'Docker Compose spins up database and server container nodes locally in isolated network channels.' }
        ]
    },
    {
        id: 'aws-ci-cd',
        title: 'AWS Cloud Deployment & Pipelines',
        category: 'DevOps',
        difficulty: 'Advanced',
        duration: '16 weeks',
        chapters: [
            { title: 'EC2 Instances & Load Balancing', content: 'Deploy servers on AWS EC2. Configure Application Load Balancers to route and distribute user traffic safely.' },
            { title: 'GitHub Actions CI/CD Deployment', content: 'Configure CD pipelines to automatically build, test, and deploy code updates to AWS clusters on repository pushes.' }
        ]
    }
];

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { addNotification } = useNotificationsStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [activeView, setActiveView] = useState('overview');

    // ─── local storage persistence for subscription & course enrollments ───
    const [enrolledCourses, setEnrolledCourses] = useState(() => {
        const saved = localStorage.getItem('enrolled_courses');
        return saved ? JSON.parse(saved) : [];
    });

    const [isSubscribed, setIsSubscribed] = useState(() => {
        return localStorage.getItem('is_subscribed') === 'true';
    });

    // ─── Reader Slideover states ───
    const [activeReadingCourse, setActiveReadingCourse] = useState(null);
    const [activeChapterIndex, setActiveChapterIndex] = useState(0);

    // ─── Subscription Checkout states ───
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [checkoutTab, setCheckoutTab] = useState('card'); // 'card' | 'upi'
    const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4821');
    const [cardExpiry, setCardExpiry] = useState('12/29');
    const [cardCvv, setCardCvv] = useState('382');
    const [cardHolder, setCardHolder] = useState(user?.name || 'Sandeep Admin');
    const [upiId, setUpiId] = useState('sandeep@upi');

    // ─── API Data: User Payments ───
    const { data: myPayments = [], refetch: refetchPayments } = useQuery({
        queryKey: ['myPaymentsDashboard'],
        queryFn: async () => {
            try {
                const res = await api.get('/payments/my-payments');
                return res.data?.data || [];
            } catch { return []; }
        }
    });

    // ─── Simulated payment mutation for subscription check ───
    const checkoutMutation = useMutation({
        mutationFn: async (paymentData) => {
            const res = await api.post('/payments', paymentData);
            return res.data.data;
        },
        onSuccess: () => {
            setIsSubscribed(true);
            localStorage.setItem('is_subscribed', 'true');
            queryClient.invalidateQueries({ queryKey: ['myPaymentsDashboard'] });
            queryClient.invalidateQueries({ queryKey: ['adminPayments'] });
            refetchPayments();
            setShowCheckoutModal(false);
            addNotification('Premium subscription activated successfully! All courses unlocked.', 'success');
        },
        onError: (err) => {
            addNotification(err.response?.data?.error || 'Simulated checkout failed', 'error');
        }
    });

    const handleLocalSubscribe = (e) => {
        e.preventDefault();
        checkoutMutation.mutate({
            amount: 199.00,
            description: 'Premium Platform Access Pass (Card/UPI Checkout)',
            cardBrand: checkoutTab === 'card' ? 'Visa' : 'UPI',
            last4: checkoutTab === 'card' ? cardNumber.slice(-4) : 'UPI'
        });
    };

    // ─── Enroll & Open Course Logic ───
    const handleOpenCourse = (course) => {
        if (enrolledCourses.includes(course.id)) {
            setActiveReadingCourse(course);
            setActiveChapterIndex(0);
            return;
        }

        if (enrolledCourses.length >= 2 && !isSubscribed) {
            setShowCheckoutModal(true);
            addNotification('Free course limit reached! Please subscribe to unlock unlimited courses.', 'warning');
            return;
        }

        const updatedList = [...enrolledCourses, course.id];
        setEnrolledCourses(updatedList);
        localStorage.setItem('enrolled_courses', JSON.stringify(updatedList));
        setActiveReadingCourse(course);
        setActiveChapterIndex(0);
        addNotification(`Successfully started: ${course.title}`, 'success');
    };

    const hasData = enrolledCourses.length > 0 || isSubscribed;
    const streak = hasData ? 5 : 0;
    const xpPoints = enrolledCourses.length * 400 + (isSubscribed ? 1500 : 0);

    const totalHours = enrolledCourses.length * 12;
    const totalRequired = MOCK_COURSES.length * 15;
    const totalPaid = myPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

    const modules = [
        { name: 'Frontend Foundations', hours: enrolledCourses.length > 0 ? 42 : 0, total: 42, color: '#10b981' },
        { name: 'JavaScript Mastery', hours: enrolledCourses.length > 1 ? 38 : 0, total: 38, color: '#f97316' },
        { name: 'React Ecosystem', hours: enrolledCourses.length > 3 ? 28 : 0, total: 36, color: '#6366f1' },
        { name: 'Backend Engineering', hours: enrolledCourses.length > 5 ? 8 : 0, total: 40, color: '#8b5cf6' }
    ];

    const timeline = hasData ? [
        ...(enrolledCourses.map(id => ({ action: `Started module: ${id}`, time: 'Just now', type: 'badge' }))),
        ...(myPayments.map(p => ({ action: `Simulated Payment Completed — $${p.amount}`, time: new Date(p.createdAt).toLocaleDateString(), type: 'payment' }))),
        { action: 'Completed React Hooks Deep Dive', time: '2 hours ago', type: 'complete' }
    ] : [
        { action: 'Welcome to Deep IT Labs! Your dashboard is now initialized.', time: 'Just now', type: 'badge' }
    ];

    const timelineIcons = {
        complete: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        badge: { icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        payment: { icon: CreditCard, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    };

    return (
        <div className="min-h-screen bg-[#030408] text-white font-sans relative py-12">
            <Helmet>
                <title>Dashboard Overview | Deep IT Labs</title>
            </Helmet>

            {/* Glowing background meshes */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-8 relative z-10">

                {/* Minimalist Header (No user name greeting banner) */}
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400">Student Dashboard</span>
                        <h1 className="text-2xl font-black tracking-tight text-white mt-1">Dashboard Console</h1>
                        <p className="text-slate-500 text-xs mt-0.5">Access courses, view metrics, and manage billing coordinates.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2.5 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800/60 rounded-xl transition-all cursor-pointer">
                            <Bell className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Tab selectors */}
                <div className="flex gap-1 bg-slate-900/30 border border-slate-800/50 rounded-xl p-1 w-fit">
                    {['overview', 'learning', 'payments'].map(tabId => (
                        <button
                            key={tabId}
                            onClick={() => setActiveView(tabId)}
                            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer capitalize ${
                                activeView === tabId
                                    ? 'bg-white text-slate-950 shadow-md'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            {tabId === 'learning' ? 'Learning Path' : tabId}
                        </button>
                    ))}
                </div>

                {/* ════════════════════════════════════════════════ */}
                {/* VIEW: OVERVIEW                                   */}
                {/* ════════════════════════════════════════════════ */}
                {activeView === 'overview' && (
                    <div className="space-y-6 animate-in fade-in">
                        {/* Bento metrics badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <CountBadge value={totalRequired > 0 ? `${Math.round((totalHours / totalRequired) * 100)}%` : '00%'} label="Overall Progress" gradient="linear-gradient(135deg, #06b6d4, #6366f1)" />
                            <CountBadge value={totalHours > 0 ? `${totalHours}h` : '00h'} label="Hours Logged" gradient="linear-gradient(135deg, #6366f1, #a855f7)" />
                            <CountBadge value={xpPoints > 0 ? xpPoints : '00'} label="XP Scored" gradient="linear-gradient(135deg, #f59e0b, #ef4444)" />
                            <CountBadge value={enrolledCourses.length} label="Enrolled Courses" gradient="linear-gradient(135deg, #10b981, #06b6d4)" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* Roadmap Roadmap summary */}
                            <div className="lg:col-span-8 space-y-6">
                                <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 backdrop-blur-md space-y-6">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-indigo-400" /> Syllabus Roadmap Stages
                                        </h3>
                                        <button
                                            onClick={() => setActiveView('learning')}
                                            className="text-[10px] text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-0.5 cursor-pointer"
                                        >
                                            View Syllabus <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {MOCK_COURSES.slice(0, 4).map((c, i) => {
                                            const isEnrolled = enrolledCourses.includes(c.id);
                                            const isLocked = i >= 2 && !isSubscribed && !isEnrolled;
                                            return (
                                                <div 
                                                    key={c.id} 
                                                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between h-36 ${
                                                        isEnrolled 
                                                            ? 'bg-indigo-950/10 border-indigo-500/20 shadow-md shadow-indigo-500/5' 
                                                            : isLocked 
                                                            ? 'bg-slate-950/60 border-slate-900 opacity-60'
                                                            : 'bg-slate-900/30 border-white/5 hover:border-slate-800'
                                                    }`}
                                                >
                                                    <div className="space-y-1">
                                                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">Stage #{i+1}</span>
                                                        <h4 className="text-xs font-bold text-white line-clamp-1">{c.title}</h4>
                                                        <p className="text-[10px] text-slate-500">{c.difficulty} level program</p>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                                                        <span className="text-[9px] text-slate-500 font-mono">{c.duration}</span>
                                                        <button
                                                            onClick={() => handleOpenCourse(c)}
                                                            className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 cursor-pointer"
                                                        >
                                                            {isLocked ? 'Unlock' : isEnrolled ? 'Open Reader' : 'Start'}
                                                            <ChevronRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Engineering modules hours progress */}
                                <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 backdrop-blur-md space-y-4">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-indigo-400" /> Engineering Module Progress
                                    </h3>
                                    <div className="space-y-3">
                                        {modules.map((mod, i) => (
                                            <div key={i} className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-300 font-semibold">{mod.name}</span>
                                                    <span className="text-slate-500 font-mono">{mod.hours}/{mod.total}h</span>
                                                </div>
                                                <SparkBar value={mod.hours} max={mod.total} color={mod.color} height={4} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right sidebars */}
                            <div className="lg:col-span-4 space-y-6">
                                {/* Timeline */}
                                <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 backdrop-blur-md">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                                        <Clock className="w-4 h-4 text-indigo-400" /> Recent Actions
                                    </h3>
                                    <div className="space-y-2">
                                        {timeline.slice(0, 4).map((item, i) => {
                                            const cfg = timelineIcons[item.type] || { icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' };
                                            return (
                                                <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-900/50 last:border-0">
                                                    <div className={`p-1.5 rounded-lg ${cfg.bg} shrink-0 mt-0.5`}>
                                                        <cfg.icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-slate-200 line-clamp-1">{item.action}</p>
                                                        <p className="text-[9px] text-slate-600 mt-0.5">{item.time}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Quick actions */}
                                <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 backdrop-blur-md space-y-3">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-amber-400" /> Quick actions
                                    </h3>
                                    <div className="flex flex-col gap-2">
                                        <button 
                                            onClick={() => setActiveView('learning')}
                                            className="w-full flex items-center justify-between p-3 bg-slate-950/40 border border-white/5 hover:border-slate-800 rounded-xl transition-all cursor-pointer text-xs"
                                        >
                                            <span className="flex items-center gap-2"><PlayCircle className="w-3.5 h-3.5 text-indigo-400" /> Study Curriculum</span>
                                            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
                                        </button>
                                        <button 
                                            onClick={() => setActiveView('payments')}
                                            className="w-full flex items-center justify-between p-3 bg-slate-950/40 border border-white/5 hover:border-slate-800 rounded-xl transition-all cursor-pointer text-xs"
                                        >
                                            <span className="flex items-center gap-2"><CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Billing Settings</span>
                                            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
                                        </button>
                                        <button 
                                            onClick={() => navigate('/contact')}
                                            className="w-full flex items-center justify-between p-3 bg-slate-950/40 border border-white/5 hover:border-slate-800 rounded-xl transition-all cursor-pointer text-xs"
                                        >
                                            <span className="flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5 text-blue-400" /> Support Desk</span>
                                            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ════════════════════════════════════════════════ */}
                {/* VIEW: LEARNING PATH                             */}
                {/* ════════════════════════════════════════════════ */}
                {activeView === 'learning' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-indigo-400" /> Complete Syllabus Learning Path
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">Free tier accounts can enroll in up to 2 courses. Subscribe to unlock the full 8-course backend and DevOps roadmap.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {MOCK_COURSES.map((c, i) => {
                                const isEnrolled = enrolledCourses.includes(c.id);
                                const isLocked = i >= 2 && !isSubscribed && !isEnrolled;
                                return (
                                    <div 
                                        key={c.id} 
                                        className={`bg-slate-900/20 border rounded-2xl p-5 flex flex-col justify-between h-48 transition-all hover:border-slate-800 ${
                                            isEnrolled ? 'border-indigo-500/30' : isLocked ? 'border-slate-950 bg-slate-950/40 opacity-70' : 'border-white/5'
                                        }`}
                                    >
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-500 uppercase tracking-widest">{c.category}</span>
                                                {isLocked ? (
                                                    <LockIcon className="w-3.5 h-3.5 text-slate-700" />
                                                ) : isEnrolled ? (
                                                    <UnlockIcon className="w-3.5 h-3.5 text-emerald-400" />
                                                ) : (
                                                    <UnlockIcon className="w-3.5 h-3.5 text-slate-500" />
                                                )}
                                            </div>
                                            <h4 className="text-xs font-bold text-white line-clamp-1">{c.title}</h4>
                                            <p className="text-[10px] text-slate-500 line-clamp-3">{c.chapters[0].content}</p>
                                        </div>

                                        <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-4">
                                            <span className="text-[9px] text-slate-500">{c.duration} • {c.difficulty}</span>
                                            <button
                                                onClick={() => handleOpenCourse(c)}
                                                className={`text-[10px] font-bold flex items-center gap-0.5 cursor-pointer ${
                                                    isLocked ? 'text-indigo-400' : 'text-white hover:text-indigo-300'
                                                }`}
                                            >
                                                {isLocked ? 'Unlock' : isEnrolled ? 'Open Reader' : 'Start'}
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ════════════════════════════════════════════════ */}
                {/* VIEW: PAYMENTS                                   */}
                {/* ════════════════════════════════════════════════ */}
                {activeView === 'payments' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-indigo-400" /> Payments & Billing Console
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">Audit simulated checkout logs, active passes, and trigger secure Razorpay gateways.</p>
                        </div>

                        {/* Summary Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-5">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Total Paid</p>
                                <p className="text-2xl font-black text-emerald-400 mt-1">
                                    {totalPaid > 0 ? `$${totalPaid.toFixed(2)}` : '$00.00'}
                                </p>
                            </div>
                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-5">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Pending Balance</p>
                                <p className="text-2xl font-black text-amber-400 mt-1">
                                    {isSubscribed ? '$00.00' : '$199.00'}
                                </p>
                            </div>
                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-5">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Platform Tier</p>
                                <p className="text-2xl font-black text-white mt-1">
                                    {isSubscribed ? 'Premium Pass' : 'Trial Version'}
                                </p>
                            </div>
                        </div>

                        {/* Razorpay Gateway integration */}
                        <div className="bg-gradient-to-br from-indigo-950/20 to-slate-900/40 border border-indigo-500/20 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-indigo-400" /> Secure Checkout via Razorpay
                                </h3>
                                <p className="text-xs text-slate-400 max-w-xl">
                                    Deploy checkout fees using Razorpay's secure transactional billing page.
                                </p>
                            </div>
                            <a
                                href="https://rzp.io/l/deepitlabs-checkout" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-500/25 shrink-0"
                            >
                                Pay via Razorpay
                            </a>
                        </div>

                        {/* Transaction history logs */}
                        <div className="bg-slate-900/20 border border-white/5 rounded-3xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/5">
                                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Transaction Ledger</h3>
                            </div>
                            <div className="divide-y divide-slate-950">
                                {myPayments.length === 0 ? (
                                    <p className="text-slate-500 text-xs p-6 text-center">No transaction records registered.</p>
                                ) : (
                                    myPayments.map((tx, i) => (
                                        <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-900/40 transition-all">
                                            <div className="p-2 rounded-lg bg-indigo-500/10">
                                                <CreditCard className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-white">{tx.description}</p>
                                                <p className="text-[10px] text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-bold text-white block">
                                                    ${tx.amount.toFixed(2)}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-semibold mt-0.5">
                                                    <Check className="w-2.5 h-2.5" /> {tx.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* ─── SLIDE-OVER READER PANEL ─── */}
            {activeReadingCourse && (
                <div className="fixed inset-0 z-50 overflow-hidden flex justify-end select-text">
                    <div 
                        onClick={() => setActiveReadingCourse(null)}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
                    />

                    <div className="relative w-full max-w-2xl bg-[#090A10] border-l border-white/5 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
                        <div className="p-6 border-b border-white/5 flex justify-between items-start gap-4">
                            <div>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 uppercase tracking-widest">
                                    {activeReadingCourse.category} Reader
                                </span>
                                <h3 className="text-base font-extrabold text-white mt-1.5">{activeReadingCourse.title}</h3>
                            </div>
                            <button 
                                onClick={() => setActiveReadingCourse(null)}
                                className="text-slate-500 hover:text-white transition-colors text-lg font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <div className="flex gap-1 border-b border-slate-900 pb-2 overflow-x-auto">
                                {activeReadingCourse.chapters.map((ch, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveChapterIndex(idx)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                                            activeChapterIndex === idx 
                                                ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/30' 
                                                : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                    >
                                        Lecture {idx + 1}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-white">{activeReadingCourse.chapters[activeChapterIndex].title}</h4>
                                <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-6 text-xs text-slate-300 leading-relaxed font-sans select-text selection:bg-indigo-500/30">
                                    {activeReadingCourse.chapters[activeChapterIndex].content}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] text-slate-500">
                                Chapter {activeChapterIndex + 1} of {activeReadingCourse.chapters.length}
                            </span>
                            <div className="flex gap-2">
                                <Button 
                                    disabled={activeChapterIndex === 0}
                                    onClick={() => setActiveChapterIndex(prev => prev - 1)}
                                    className="text-xs py-1.5 px-3 border border-slate-850 hover:bg-slate-900 bg-transparent disabled:opacity-40 disabled:pointer-events-none shadow-none"
                                >
                                    Previous
                                </Button>
                                <Button 
                                    disabled={activeChapterIndex === activeReadingCourse.chapters.length - 1}
                                    onClick={() => setActiveChapterIndex(prev => prev + 1)}
                                    className="text-xs py-1.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none"
                                >
                                    Next Chapter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── MODAL CHECKOUT ─── */}
            {showCheckoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div 
                        onClick={() => setShowCheckoutModal(false)}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
                    />

                    <div className="relative w-full max-w-lg bg-[#090A10] border border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 space-y-6">
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-indigo-400" /> Platform Premium Subscription
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Free accounts are capped at a maximum of 2 courses. Subscribe to unlock the complete MERN stack learning paths immediately.
                                </p>
                            </div>
                            <button 
                                onClick={() => setShowCheckoutModal(false)}
                                className="text-slate-500 hover:text-white transition-colors cursor-pointer text-lg font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex gap-1 bg-slate-950 border border-slate-900 rounded-xl p-1 w-full">
                            <button
                                onClick={() => setCheckoutTab('card')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                    checkoutTab === 'card' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                Credit / Debit Card
                            </button>
                            <button
                                onClick={() => setCheckoutTab('upi')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                    checkoutTab === 'upi' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                UPI Payment (Google Pay/PhonePe)
                            </button>
                        </div>

                        <div className="p-4 bg-slate-950 border border-slate-900 rounded-2xl flex items-center justify-between gap-4">
                            <span className="text-[10px] text-slate-500 leading-normal max-w-[250px]">
                                Prefer using your external mobile browser or GPay/UPI app checkout links?
                            </span>
                            <a
                                href="https://rzp.io/l/deepitlabs-checkout" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer text-center shrink-0"
                            >
                                Go to Razorpay
                            </a>
                        </div>

                        <form onSubmit={handleLocalSubscribe} className="space-y-4">
                            {checkoutTab === 'card' ? (
                                <div className="space-y-4">
                                    <Input
                                        label="Cardholder Name"
                                        value={cardHolder}
                                        onChange={e => setCardHolder(e.target.value)}
                                        required
                                    />
                                    <Input
                                        label="Card Number"
                                        placeholder="4242 4242 4242 4821"
                                        value={cardNumber}
                                        onChange={e => setCardNumber(e.target.value)}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Expiry (MM/YY)"
                                            placeholder="12/29"
                                            value={cardExpiry}
                                            onChange={e => setCardExpiry(e.target.value)}
                                            required
                                        />
                                        <Input
                                            label="CVV Code"
                                            type="password"
                                            placeholder="382"
                                            value={cardCvv}
                                            onChange={e => setCardCvv(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Input
                                        label="UPI Virtual Private Address (VPA)"
                                        placeholder="sandeep@upi"
                                        value={upiId}
                                        onChange={e => setUpiId(e.target.value)}
                                        required
                                    />
                                    <div className="text-[10px] text-slate-500 leading-normal bg-slate-950/40 p-4 border border-slate-900 rounded-2xl flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                        <span>
                                            Enter your active VPA (Google Pay, PhonePe, or Paytm virtual address). A payment request will be automatically dispatched to your UPI application.
                                        </span>
                                    </div>
                                </div>
                            )}

                            <Button 
                                type="submit" 
                                loading={checkoutMutation.isPending} 
                                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-bold rounded-xl"
                            >
                                Secure Pay $199.00
                            </Button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
