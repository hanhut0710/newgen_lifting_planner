import { useEffect, React, useState } from 'react';
import { X, Search, Plus, Sparkles, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExerciseAPI } from '../api/ExerciseAPI.js';

export const AddExerciseModal = ({ isOpen, onClose }) => {
    const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Cardio'];

    const recommended = [
        {
            id: 'r1',
            name: 'Bench Press',
            muscles: 'Chest, Triceps',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOhBgahnK1r-Os6HrHRdfWaNv9ck9vkKTR4FreEHh94gWl9dY7f7WplU6737uMr1Mpoaw7LDCal5KPOu83V4jcwYnQAi11Nu_Qwxi4pCD9SI--QCdxGBEfnbtNYCjFz9VP8m5auIFaDjGPOxJX7oO5HIgWUDcAPX0zx2Zl4Li-BeB7nCwL2OlMy7fsHl8Cz3xCXE7wxbz3-vSaG7d0SIlNLYONzc68MmIqvTqookLZ8CEiepZx6yJXuS46ygUPstJSh67slG1meojQ'
        },
        {
            id: 'r2',
            name: 'Barbell Squat',
            muscles: 'Legs, Glutes',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_wmL6YobEi97_HAakEWy5wWusuOHUCVHgNIx5N9l9gWkxhWF4f7DNXL3ze_MzypMYaP4oSoZecSKa4wNeBPoZyDurzizdVEuGpJlrYybnQmhEs6GzRvOzdhzlrf83L5Ig-VRqqWPsiY4TubFPc9rgcvn6eWAsP3guWBpSpzYUqpPFtMrI6dXpa2QWcYBqg6nXUxn_FDk802lSTK3kYunBRLj5nizy38_yQRxCu7qaaGdmJ9bLDOt65EvMoMr34ypvUFLMk_5neSgG'
        },
        {
            id: 'r3',
            name: 'Pull Ups',
            muscles: 'Back, Biceps',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCohJi_Z4XoGaEHTtpAu0qBZKqLXsi2eA2VCOdUsRgikdb0YqkeTReKHRpQThPZ0c1s8bOVKsZoMlfsAdHdKJ2lkhC0oK39xc9kZzIn6hSkHfgaiFN6cQ-oBlFLLQzuHunlfWPUGm9tB6_kK9fQGMndV1Uy9tU5xCI20F00eIF1LYQ9ExwQp620z2Gk2fvOUKLvehMbjU1ql9Mx9nbI6klpFXKrdyKtn3BkZrJr_TuGnNt8FMWk28FeW5KVG2rKqeMK1UkRd9884Jf'
        }
    ];

    const allExercises = [
        { id: 'a1', name: 'Deadlift', muscle: 'LOWER BODY' },
        { id: 'a2', name: 'Overhead Press', muscle: 'SHOULDERS' },
        { id: 'a3', name: 'Dumbbell Curls', muscle: 'ARMS' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-background-dark/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="glass-panel w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-primary/20"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-primary/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-black text-white tracking-tight">Add Exercise</h2>
                                <span className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">Workout A</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
                            >
                                <X className="text-slate-400" size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
                            {/* Search */}
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search exercises (e.g., Bench Press)..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-bold"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                                {categories.map((cat, i) => (
                                    <button
                                        key={cat}
                                        className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${i === 0
                                            ? 'bg-primary text-background-dark border-primary shadow-lg shadow-primary/20'
                                            : 'bg-slate-900/30 text-slate-400 border-slate-800 hover:border-primary/50 hover:text-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Recommended */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <Sparkles size={18} />
                                    <h3 className="text-sm font-black uppercase tracking-widest">Recommended for You</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {recommended.map((ex) => (
                                        <div key={ex.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 hover:border-primary/50 transition-all">
                                            <img src={ex.image} alt={ex.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 flex flex-col justify-end">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <h4 className="text-white font-black text-lg leading-tight">{ex.name}</h4>
                                                        <p className="text-primary text-[10px] font-bold uppercase tracking-wider">{ex.muscles}</p>
                                                    </div>
                                                    <button className="size-8 rounded-full bg-primary text-background-dark flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform">
                                                        <Plus size={18} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* All Exercises */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 px-1">All Exercises</h3>
                                <div className="space-y-3">
                                    {allExercises.map((ex) => (
                                        <div key={ex.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-primary/30 transition-all group">
                                            <div className="size-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                <Dumbbell size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-black text-white">{ex.name}</h4>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{ex.muscle}</p>
                                            </div>
                                            <button className="size-10 rounded-full border-2 border-slate-700 flex items-center justify-center text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all">
                                                <Plus size={20} strokeWidth={3} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-8 border-t border-primary/10 bg-background-dark/40 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-10 py-4 bg-primary text-background-dark font-black rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest"
                            >
                                Done Selecting
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

