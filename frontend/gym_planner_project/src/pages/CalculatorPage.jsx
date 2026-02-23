import React from 'react';
import { Bolt, DonutLarge, Fire } from '../components/Icon';

export const CalculatorPage = () => {
    return (
        <div className="p-8 max-w-6xl mx-auto w-full space-y-12">
            <header className="flex items-center justify-between">
                <h1 className="text-4xl font-black tracking-tight">Body Metrics & Macros</h1>
                <div className="lg:hidden p-2 text-primary">
                    <span className="material-symbols-outlined">menu</span>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-16">
                {/* Input Section */}
                <section className="lg:col-span-5 space-y-10">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-3xl font-bold">analytics</span>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Personal Details</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Weight (kg)" placeholder="75" />
                            <InputGroup label="Height (cm)" placeholder="180" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Age" placeholder="28" />
                            <div className="flex flex-col gap-3">
                                <span className="text-sm font-bold opacity-70 uppercase tracking-widest ml-1">Gender</span>
                                <div className="flex bg-primary/5 border border-primary/20 rounded-2xl p-1.5">
                                    <button className="flex-1 py-3 rounded-xl bg-primary text-background-dark font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20">Male</button>
                                    <button className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Female</button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-bold opacity-70 uppercase tracking-widest ml-1">Activity Level</span>
                            <div className="grid grid-cols-2 gap-4">
                                <ActivityButton label="Sedentary" active />
                                <ActivityButton label="Moderate" />
                                <ActivityButton label="Active" />
                                <ActivityButton label="Athlete" />
                            </div>
                        </div>

                        <button className="w-full bg-primary text-background-dark py-6 rounded-[2rem] font-black text-2xl shadow-[0_15px_40px_rgba(89,242,13,0.3)] hover:translate-y-[-4px] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                            Calculate Macros
                            <span className="material-symbols-outlined font-black">bolt</span>
                        </button>
                    </div>
                </section>

                {/* Results Section */}
                <section className="lg:col-span-7 space-y-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black uppercase tracking-tight">Your Daily Targets</h2>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">Maintenance</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {/* TDEE Card */}
                        <div className="sm:col-span-2 relative overflow-hidden glass-card rounded-[3rem] p-10 flex items-center justify-between shadow-2xl">
                            <div className="relative z-10">
                                <p className="text-sm font-black opacity-50 uppercase tracking-[0.2em] mb-4">Total Daily Energy (TDEE)</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-7xl font-black text-primary">2,450</span>
                                    <span className="text-2xl font-black opacity-40 uppercase tracking-widest">kcal/day</span>
                                </div>
                            </div>
                            <div className="w-32 h-32 rounded-full border-[8px] border-primary/10 border-t-primary flex items-center justify-center rotate-45 shadow-inner">
                                <Fire className="text-primary w-12 h-12 -rotate-45" />
                            </div>
                        </div>

                        {/* Macro Cards Grid */}
                        <div className="sm:col-span-2 grid grid-cols-3 gap-5">
                            <MacroCard label="Protein" value="185g" percent="30%" active />
                            <MacroCard label="Carbs" value="245g" percent="40%" />
                            <MacroCard label="Fats" value="82g" percent="30%" />
                        </div>

                        {/* Graph Card */}
                        <div className="sm:col-span-2 glass-card rounded-[3rem] p-10 shadow-xl">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="font-black text-xl uppercase tracking-tight">Macro Distribution</h3>
                                <DonutLarge className="text-primary w-10 h-10" />
                            </div>
                            <div className="relative h-8 w-full bg-primary/5 rounded-full flex overflow-hidden p-1.5 border border-primary/10">
                                <div className="h-full bg-primary rounded-full shadow-lg shadow-primary/20" style={{ width: '30%' }}></div>
                                <div className="h-full bg-slate-400/30 mx-1.5 rounded-full" style={{ width: '40%' }}></div>
                                <div className="h-full bg-primary/30 rounded-full" style={{ width: '26%' }}></div>
                            </div>
                            <div className="flex flex-wrap gap-10 mt-10">
                                <LegendItem color="bg-primary" label="Protein" />
                                <LegendItem color="bg-slate-400/30" label="Carbs" />
                                <LegendItem color="bg-primary/30" label="Fats" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

const InputGroup = ({ label, placeholder }) => (
    <label className="flex flex-col gap-3">
        <span className="text-sm font-bold opacity-70 uppercase tracking-widest ml-1">{label}</span>
        <input
            className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black"
            placeholder={placeholder}
            type="number"
        />
    </label>
);

const ActivityButton = ({ label, active }) => (
    <button className={`px-4 py-4 rounded-2xl border transition-all text-sm font-black uppercase tracking-widest ${active
        ? 'border-primary/40 bg-primary/10 text-primary shadow-lg shadow-primary/10'
        : 'border-primary/10 bg-transparent text-slate-400 hover:border-primary/30 hover:text-slate-200'
        }`}>
        {label}
    </button>
);

const MacroCard = ({ label, value, percent, active }) => (
    <div className={`rounded-[2rem] p-8 flex flex-col items-center text-center transition-all ${active
        ? 'bg-primary text-background-dark shadow-2xl shadow-primary/20 scale-105'
        : 'glass-card hover:border-primary/30'
        }`}>
        <span className={`text-xs font-black uppercase tracking-[0.2em] ${active ? 'opacity-60' : 'opacity-40'}`}>{label}</span>
        <span className="text-4xl font-black my-4 tracking-tighter">{value}</span>
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${active ? 'bg-background-dark/10' : 'bg-primary/10 text-primary'
            }`}>
            {percent}
        </div>
    </div>
);

const LegendItem = ({ color, label }) => (
    <div className="flex items-center gap-3">
        <div className={`size-4 rounded-full ${color}`}></div>
        <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">{label}</span>
    </div>
);
