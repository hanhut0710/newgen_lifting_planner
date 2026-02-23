import React from 'react';
import { X } from 'lucide-react';
import { WORKOUT_PLANS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

export const SwitchPlanModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-md p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-background-light dark:bg-[#1c2a15] w-full max-w-2xl rounded-[2rem] border border-slate-200 dark:border-primary/20 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
                    >
                        {/* Modal Header */}
                        <div className="p-10 border-b border-slate-200 dark:border-primary/10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black tracking-tight">Switch Workout Plan</h2>
                                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold">Choose a program that fits your current goals.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="size-12 rounded-full hover:bg-primary/10 flex items-center justify-center transition-colors border border-transparent hover:border-primary/20"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-5 hide-scrollbar">
                            {WORKOUT_PLANS.map((plan) => (
                                <label key={plan.id} className="relative cursor-pointer group block">
                                    <input
                                        defaultChecked={plan.active}
                                        className="sr-only peer"
                                        name="workout-plan"
                                        type="radio"
                                    />
                                    <div className="flex items-center gap-6 p-6 rounded-2xl border-2 border-slate-200 dark:border-primary/10 transition-all hover:bg-primary/5 peer-checked:border-primary peer-checked:bg-primary/10">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-black text-xl">{plan.name}</h3>
                                                {plan.active && (
                                                    <span className="bg-primary/20 text-primary text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded-full border border-primary/20">Active</span>
                                                )}
                                            </div>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{plan.description}</p>
                                        </div>
                                        <div className="size-6 rounded-full border-2 border-primary flex items-center justify-center peer-checked:bg-primary transition-all">
                                            <div className="size-2.5 rounded-full bg-background-dark scale-0 peer-checked:scale-100 transition-transform" />
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-10 border-t border-slate-200 dark:border-primary/10 bg-slate-50 dark:bg-background-dark/20 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 py-5 px-8 rounded-full bg-primary text-background-dark font-black text-lg hover:brightness-110 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest"
                            >
                                Confirm Switch
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 py-5 px-8 rounded-full bg-slate-200 dark:bg-primary/10 text-slate-800 dark:text-slate-100 font-black text-lg hover:bg-slate-300 dark:hover:bg-primary/20 transition-all uppercase tracking-widest"
                            >
                                Keep Current Plan
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
