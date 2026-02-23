import React from 'react';
import {
    Bolt,
    Footprints,
    TrendingDown,
    TrendingUp,
    Play,
    ChevronRight,
    Dumbbell,
    Timer
} from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardPage = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto w-full space-y-10">
            <header className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-500 dark:text-primary/60 uppercase tracking-[0.2em]">Wednesday, Oct 25</span>
                <h1 className="text-4xl font-black tracking-tight">Good Morning, Alex</h1>
            </header>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Left Column: Stats */}
                <div className="lg:col-span-4 space-y-10">
                    <section className="grid grid-cols-2 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-primary rounded-[2rem] p-6 flex flex-col justify-between h-44 text-background-dark shadow-xl shadow-primary/20"
                        >
                            <div className="flex justify-between items-start">
                                <Bolt size={24} strokeWidth={3} />
                                <span className="text-[10px] font-black bg-background-dark/10 px-2 py-1 rounded-full">GOAL</span>
                            </div>
                            <div>
                                <p className="text-5xl font-black">1,840</p>
                                <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Calories</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-slate-100 dark:bg-primary/5 rounded-[2rem] p-6 flex flex-col justify-between h-44 border border-primary/10"
                        >
                            <div className="flex justify-between items-start">
                                <Footprints size={24} className="text-primary" />
                                <div className="size-6 rounded-full border-2 border-primary/20 flex items-center justify-center">
                                    <div className="size-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                </div>
                            </div>
                            <div>
                                <p className="text-5xl font-black">8,432</p>
                                <p className="text-sm font-bold text-slate-500 dark:text-primary/60 uppercase tracking-wider">Steps</p>
                            </div>
                        </motion.div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black uppercase tracking-tight">Body Composition</h3>
                            <button className="text-primary text-sm font-black hover:underline">Details</button>
                        </div>
                        <div className="space-y-3">
                            <StatCard label="Weight" value="75.4" unit="kg" change="-0.5kg" trend="down" />
                            <StatCard label="Body Fat" value="18.2" unit="%" change="+0.1%" trend="up" />
                        </div>
                    </section>
                </div>

                {/* Right Column: Workout */}
                <div className="lg:col-span-8 space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black uppercase tracking-tight">Today's Workout</h3>
                            <span className="text-[10px] font-black bg-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">Scheduled</span>
                        </div>

                        <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 aspect-video shadow-2xl">
                            <img
                                alt="Workout"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_wmL6YobEi97_HAakEWy5wWusuOHUCVHgNIx5N9l9gWkxhWF4f7DNXL3ze_MzypMYaP4oSoZecSKa4wNeBPoZyDurzizdVEuGpJlrYybnQmhEs6GzRvOzdhzlrf83L5Ig-VRqqWPsiY4TubFPc9rgcvn6eWAsP3guWBpSpzYUqpPFtMrI6dXpa2QWcYBqg6nXUxn_FDk802lSTK3kYunBRLj5nizy38_yQRxCu7qaaGdmJ9bLDOt65EvMoMr34ypvUFLMk_5neSgG"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 p-10 w-full space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="bg-primary text-background-dark text-[10px] font-black px-2 py-1 rounded tracking-widest">ADVANCED</span>
                                    <span className="text-white text-sm font-bold flex items-center gap-1.5">
                                        <Timer size={16} className="text-primary" /> 45 mins
                                    </span>
                                </div>
                                <h4 className="text-5xl font-black text-white tracking-tight">Explosive Power: Leg Day</h4>
                                <button className="px-10 py-4 bg-primary text-background-dark font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-primary/30">
                                    <Play size={20} fill="currentColor" />
                                    <span>Start Workout</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <WorkoutItem title="Barbell Squats" sets="4 Sets × 12 Reps" icon={Dumbbell} />
                            <WorkoutItem title="Box Jumps" sets="3 Sets × 15 Reps" icon={Dumbbell} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, unit, change, trend }) => (
    <div className="bg-white dark:bg-primary/5 p-5 rounded-2xl border border-slate-200 dark:border-primary/10 flex justify-between items-center hover:border-primary/30 transition-colors">
        <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-2xl font-black">{value}<span className="text-xs ml-1 font-bold opacity-40">{unit}</span></p>
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${trend === 'up' ? 'text-primary bg-primary/10' : 'text-red-500 bg-red-500/10'}`}>
            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
        </div>
    </div>
);

const WorkoutItem = ({ title, sets, icon: Icon }) => (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 hover:border-primary/30 transition-all cursor-pointer group">
        <div className="size-14 rounded-xl bg-slate-200 dark:bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
            <Icon size={24} />
        </div>
        <div className="flex-1">
            <p className="font-black text-lg">{title}</p>
            <p className="text-xs font-bold text-slate-500 dark:text-primary/60 uppercase tracking-widest">{sets}</p>
        </div>
        <ChevronRight size={20} className="text-slate-300 dark:text-primary/30 group-hover:text-primary transition-colors" />
    </div>
);
