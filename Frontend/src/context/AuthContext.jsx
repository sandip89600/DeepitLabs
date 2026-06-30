import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Load current user profile from backend on app boot (using jwt token)
    useEffect(() => {
        const loadUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await api.get('/auth/me');
                setUser(res.data.data);
            } catch (err) {
                console.error('Failed to load user profile', err.response?.data || err.message);
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [token]);

    // Handle User Registration
    const register = async (name, email, password, role, age) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/register', { name, email, password, role, age });
            const userToken = res.data.accessToken || res.data.token;
            
            // Set token in localStorage so interceptors immediately bind it
            localStorage.setItem('token', userToken);
            
            // Fetch profile immediately to update user state before returning success
            const profileRes = await api.get('/auth/me');
            setUser(profileRes.data.data);
            setToken(userToken);
            
            return { success: true, role: profileRes.data.data.role };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.error || 'Registration failed'
            };
        } finally {
            setLoading(false);
        }
    };

    // Handle User Login
    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            const userToken = res.data.accessToken || res.data.token;
            
            // Set token in localStorage so interceptors immediately bind it
            localStorage.setItem('token', userToken);
            
            // Fetch profile immediately to update user state before returning success
            const profileRes = await api.get('/auth/me');
            setUser(profileRes.data.data);
            setToken(userToken);
            
            return { success: true, role: profileRes.data.data.role };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.error || 'Invalid credentials'
            };
        } finally {
            setLoading(false);
        }
    };

    // Handle Logout
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                register,
                login,
                logout,
                setUser // Exposed so we can update user state (e.g. after uploading a profile avatar)
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
