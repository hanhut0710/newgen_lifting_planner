import { useEffect, useState, React } from 'react';
import { CheckCircle, ChevronDown, Clock } from 'lucide-react';
import { TODAY_EXERCISES } from '../constants';
import { motion } from 'framer-motion';
import { useExercise } from '../hooks/useExercise';

export const SchedulePage = ({ onSwitchPlan, onAddExercise }) => {
    const { exercises, loading, error } = useExercise();
    const days = [
        { label: 'Mon', date: '12', active: true },
        { label: 'Tue', date: '13', active: false },
        { label: 'Wed', date: '14', active: false },
        { label: 'Thu', date: '15', active: false },
        { label: 'Fri', date: '16', active: false },
    ];

    console.log("Fetched exercises:", exercises, loading, error);

    if (loading) {
        return (
            <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">Workout Schedule</h1>
                        <p className="text-primary font-bold tracking-wide">Summer Hypertrophy Plan</p>
                    </div>
                </header>
                <div className="flex items-center justify-center h-64">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">Workout Schedule</h1>
                    <p className="text-primary font-bold tracking-wide">Summer Hypertrophy Plan</p>
                </div>
                <button
                    onClick={onSwitchPlan}
                    className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full transition-colors border border-primary/20 font-bold self-start"
                >
                    <span className="material-symbols-outlined text-[20px]"></span>
                    <span>Switch Plan</span>
                </button>
            </header>

            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {days.map((day) => (
                    <button
                        key={day.date}
                        className={`flex flex-col items-center justify-center min-w-[80px] h-28 rounded-2xl transition-all ${day.active
                            ? 'bg-primary text-background-dark shadow-xl shadow-primary/20 scale-105'
                            : 'bg-slate-200 dark:bg-primary/5 text-slate-600 dark:text-slate-400 hover:bg-primary/10'
                            }`}
                    >
                        <span className="text-xs font-bold uppercase opacity-70">{day.label}</span>
                        <span className="text-3xl font-black">{day.date}</span>
                        {day.active && <div className="size-1.5 bg-background-dark rounded-full mt-1" />}
                    </button>
                ))}
                <button className="flex flex-col items-center justify-center min-w-[80px] h-28 rounded-2xl border-2 border-dashed border-slate-300 dark:border-primary/20 text-slate-400 dark:text-primary/40 hover:bg-primary/5">
                    <PlusIcon />
                    <span className="text-[10px] font-bold uppercase mt-1">Add</span>
                </button>
            </div>

            <main className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black uppercase tracking-tight">Today's Routine: Chest & Triceps</h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                        <Clock size={14} />
                        <span className="text-xs font-bold">60 min</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {TODAY_EXERCISES.map((exercise, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={exercise.id}
                            className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-2xl overflow-hidden shadow-sm hover:border-primary/30 transition-colors"
                        >
                            <div className="p-5 flex gap-5">
                                <div
                                    className={`size-20 rounded-xl bg-cover bg-center shrink-0 ${!exercise.completed && index === 2 ? 'grayscale opacity-70' : ''}`}
                                    style={{ backgroundImage: `url('${exercise.imageUrl}')` }}
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-black text-xl">{exercise.name}</h3>
                                        {exercise.completed ? (
                                            <CheckCircle className="text-primary" size={24} />
                                        ) : (
                                            <div className="size-6 rounded-full border-2 border-slate-300 dark:border-primary/20" />
                                        )}
                                    </div>
                                    <p className="text-slate-500 dark:text-primary/60 font-bold text-sm">
                                        {exercise.sets} Sets • {exercise.reps} Reps
                                    </p>
                                </div>
                            </div>

                            {exercise.weight && (
                                <div className="px-5 pb-5 border-t border-slate-100 dark:border-primary/10 mt-2 pt-5">
                                    <div className="grid grid-cols-3 gap-4">
                                        <StatItem label="Weight" value={exercise.weight} />
                                        <StatItem label="Tempo" value={exercise.tempo || '-'} />
                                        <StatItem label="RIR" value={exercise.rir || '-'} />
                                    </div>
                                </div>
                            )}

                            {!exercise.weight && (
                                <div className="px-5 py-3 bg-slate-50 dark:bg-primary/5 flex justify-center border-t border-slate-100 dark:border-primary/10">
                                    <button className="text-[11px] font-black text-slate-400 dark:text-primary/50 uppercase tracking-widest flex items-center gap-1 hover:text-primary transition-colors">
                                        Tap to see details <ChevronDown size={14} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <button
                    className="w-full py-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-primary/20 flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-primary/40 hover:bg-primary/5 hover:border-primary/40 transition-all"
                    onClick={onAddExercise}>
                    <PlusIcon size={32} />
                    <span className="font-black text-sm uppercase tracking-widest">Add Saturday Workout</span>
                </button>
            </main>
        </div>
    );
};

const StatItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-[10px] uppercase font-black text-slate-400 dark:text-primary/40 tracking-widest">{label}</span>
        <span className="text-sm font-black">{value}</span>
    </div>
);

const PlusIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);
