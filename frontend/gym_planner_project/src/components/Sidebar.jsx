import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    Calendar,
    BarChart2,
    User,
    Plus,
    Dumbbell,
    LogOut,
    Calculator
} from 'lucide-react';
import { CURRENT_USER } from '../constants';

export const Sidebar = ({ onNewWorkout }) => {
    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/schedule', label: 'Schedule', icon: Calendar },
        { path: '/stats', label: 'Stats', icon: BarChart2 },
        { path: '/calculator', label: 'Calculator', icon: Calculator },
        { path: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-background-dark border-r border-primary/10 p-6">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-background-dark">
                    <Dumbbell size={24} strokeWidth={3} />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                    FitSync
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold ${isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-slate-400 hover:bg-primary/5 hover:text-primary'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span className="text-sm uppercase tracking-widest">
                            {item.label}
                        </span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto space-y-4">
                <button
                    onClick={onNewWorkout}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-background-dark py-4 rounded-xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                    <Plus size={20} />
                    <span>New Workout</span>
                </button>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="size-10 rounded-full overflow-hidden border border-primary/20">
                        <img
                            src={CURRENT_USER.avatar}
                            alt={CURRENT_USER.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white truncate">
                            {CURRENT_USER.name}
                        </p>
                        <p className="text-[10px] text-primary/60 font-bold uppercase tracking-wider">
                            {CURRENT_USER.role}
                        </p>
                    </div>

                    <button className="text-slate-500 hover:text-red-400 transition-colors">
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    )
};