import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';
import { Bolt, Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { authAPI } from '../api/authAPI';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login({ "email": email, "password_hash": password });
            navigate("/");
        } catch (error) {
            alert("Login failed: " + error.response?.data?.detail || error.message);
        }
    }


    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-background-dark">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[1100px] grid md:grid-cols-2 bg-white dark:bg-slate-900/40 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800/50"
            >
                {/* Left Side: Visual/Hero */}
                <div className="hidden md:block relative overflow-hidden group">
                    <img
                        alt="Athlete training"
                        className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-transform duration-[2s] group-hover:scale-110"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCohJi_Z4XoGaEHTtpAu0qBZKqLXsi2eA2VCOdUsRgikdb0YqkeTReKHRpQThPZ0c1s8bOVKsZoMlfsAdHdKJ2lkhC0oK39xc9kZzIn6hSkHfgaiFN6cQ-oBlFLLQzuHunlfWPUGm9tB6_kK9fQGMndV1Uy9tU5xCI20F00eIF1LYQ9ExwQp620z2Gk2fvOUKLvehMbjU1ql9Mx9nbI6klpFXKrdyKtn3BkZrJr_TuGnNt8FMWk28FeW5KVG2rKqeMK1UkRd9884Jf"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background-dark/95 via-background-dark/40 to-transparent flex flex-col justify-end p-16">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-white text-6xl font-black leading-none mb-6 tracking-tighter uppercase italic"
                        >
                            Transform Your<br />Body & Mind
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-primary font-black tracking-[0.3em] uppercase text-sm"
                        >
                            Join the Elite Community
                        </motion.p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex flex-col p-10 md:p-16 lg:p-20">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                                <Bolt size={20} className="text-black font-black" fill="currentColor" />
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter">FitSync</h2>
                        </div>
                        <a className="text-xs font-black text-slate-400 hover:text-primary transition-colors tracking-widest" href="#">SUPPORT</a>
                    </div>

                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">ENTER THE ZONE</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back! Please enter your details.</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
                            <input
                                className="w-full rounded-full border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-8 py-5 focus:border-primary focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all font-bold"
                                placeholder="name@example.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Password</label>
                                <a className="text-xs font-black text-primary hover:underline tracking-widest" href="#">Forgot?</a>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    className="w-full rounded-full border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-8 py-5 pr-16 focus:border-primary focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all font-bold"
                                    placeholder="••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="absolute right-6 text-slate-400 hover:text-primary transition-colors" type="button">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-black font-black py-6 rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all text-xl tracking-[0.2em] uppercase"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="flex items-center gap-6 py-10">
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Alternative Login</span>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <SocialButton icon={<Mail size={20} />} label="Google" />
                        <SocialButton icon={<Github size={20} />} label="Apple" />
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-sm text-slate-400">
                            Don't have an account?
                            <Link
                                to="/register"
                                className="text-primary font-bold ml-2 hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const SocialButton = ({ icon, label }) => (
    <button className="flex items-center justify-center gap-3 py-5 rounded-full border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-primary/5 hover:border-primary/30 transition-all group">
        <span className="text-slate-400 group-hover:text-primary transition-colors">{icon}</span>
        <span className="text-sm font-black uppercase tracking-widest">{label}</span>
    </button>
);
