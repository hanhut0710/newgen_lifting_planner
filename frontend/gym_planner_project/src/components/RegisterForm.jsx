import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';

export default function RegistrationForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 ml-1">Username</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Choose a unique username"
                            className="auth-input"
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="auth-input"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="auth-input"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-brand-green transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <p className="text-[10px] text-white/40 ml-1">
                        Must be at least 8 characters with a number and symbol.
                    </p>
                </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-3 px-1">
                <label className="relative flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-5 h-5 border border-white/20 rounded-full peer-checked:bg-brand-green peer-checked:border-brand-green transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                        <div className="w-2 h-2 bg-black rounded-full" />
                    </div>
                </label>
                <span className="text-xs text-white/60">
                    I agree to the <a href="#" className="text-brand-green hover:underline">Terms of Service</a> and <a href="#" className="text-brand-green hover:underline">Privacy Policy</a>.
                </span>
            </div>

            {/* Submit Button */}
            <button className="btn-primary">
                Create Account
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-white/20 uppercase tracking-widest">OR</span>
                <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Google Sign Up */}
            <button className="btn-secondary">
                <Chrome className="w-5 h-5" />
                Sign up with Google
            </button>
        </div>
    );
}
