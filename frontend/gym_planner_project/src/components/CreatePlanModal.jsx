import React from 'react';
import { X, Dumbbell, Flame, Zap, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CreatePlanModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background-dark/60 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="glass-panel w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-primary/20"
                    >
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-primary/10 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black text-slate-100 tracking-tight">Create New Plan</h2>
                                <p className="text-slate-400 text-sm font-bold">Design your ultimate workout journey</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
                            >
                                <X className="text-slate-400" size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh] hide-scrollbar">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-1">Plan Name</label>
                                <input
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-bold"
                                    placeholder="e.g., Summer Shred 2024"
                                    type="text"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-1">Choose Your Goal</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <GoalCard icon={<Dumbbell size={24} />} label="Muscle Gain" active />
                                    <GoalCard icon={<Flame size={24} />} label="Fat Loss" />
                                    <GoalCard icon={<Zap size={24} />} label="Endurance" />
                                    <GoalCard icon={<Activity size={24} />} label="Flexibility" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] px-1">Intensity Level</label>
                                <div className="flex p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
                                    <button className="flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all bg-primary text-background-dark shadow-lg shadow-primary/20 uppercase tracking-widest">
                                        Beginner
                                    </button>
                                    <button className="flex-1 py-3 px-4 rounded-xl text-sm font-black text-slate-400 hover:text-slate-100 transition-all uppercase tracking-widest">
                                        Intermediate
                                    </button>
                                    <button className="flex-1 py-3 px-4 rounded-xl text-sm font-black text-slate-400 hover:text-slate-100 transition-all uppercase tracking-widest">
                                        Advanced
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-8 border-t border-primary/10 flex flex-col gap-4 bg-background-dark/40">
                            <button
                                onClick={onClose}
                                className="w-full bg-primary hover:bg-primary/90 text-background-dark font-black py-5 rounded-full text-lg tracking-[0.1em] shadow-[0_0_30px_rgba(89,242,13,0.3)] transition-all transform active:scale-[0.98] uppercase"
                            >
                                SAVE WORKOUT PLAN
                            </button>
                            <button
                                onClick={onClose}
                                className="text-slate-500 hover:text-slate-100 text-xs font-black transition-colors uppercase tracking-[0.2em]"
                            >
                                Discard Changes
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const GoalCard = ({ icon, label, active }) => (
    <button className={`group flex flex-col items-center justify-center p-5 rounded-2xl border transition-all ${active
        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
        : 'border-slate-700 bg-slate-900/30 hover:border-primary/50'
        }`}>
        <div className={`mb-3 transition-colors ${active ? 'text-primary' : 'text-slate-500 group-hover:text-primary'}`}>
            {icon}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-slate-100' : 'text-slate-400 group-hover:text-slate-100'}`}>
            {label}
        </span>
    </button>
);
