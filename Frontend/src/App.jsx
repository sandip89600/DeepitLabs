import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationToast from './components/layout/NotificationToast';
import Skeleton from './components/ui/Skeleton';

// 1. Lazy-load all route files to optimize build bundle sizes
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Faq = lazy(() => import('./pages/Faq'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminLayout = lazy(() => import('./pages/AdminLayout'));
const Settings = lazy(() => import('./pages/Settings'));

// Reset scroll coordinate offsets on route navigation
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Wrap main content to fetch location for conditional Navbar/Footer rendering
const AppContent = () => {
    const location = useLocation();
    const showNavAndFooter = !location.pathname.startsWith('/admin');

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            {showNavAndFooter && <Navbar />}
            
            {/* Render route views inside a Suspense barrier for route-level chunking */}
            <main className="flex-grow">
                <Suspense fallback={<Skeleton />}>
                    <Routes>
                        {/* Public Marketing Pages */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />
                        <Route path="/case-studies" element={<CaseStudies />} />
                        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                        <Route path="/faq" element={<Faq />} />
                        <Route path="/industries" element={<Industries />} />
                        <Route path="/industries/:slug" element={<IndustryDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />

                        {/* Auth Portals */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Authenticated Academy Dashboards */}
                        <Route 
                            path="/dashboard" 
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/settings" 
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            } 
                        />

                        {/* Secure Admin & Mentor Dashboards */}
                        <Route 
                            path="/admin/*" 
                            element={
                                <ProtectedRoute allowedRoles={['admin', 'mentor']}>
                                    <AdminLayout />
                                </ProtectedRoute>
                            } 
                        />

                        {/* 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>

            {showNavAndFooter && <Footer />}
            
            {/* Zustand global notifications toast queue overlay */}
            <NotificationToast />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
