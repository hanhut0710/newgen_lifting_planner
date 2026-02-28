import React, { useState } from 'react'
import axiosClient from '../api/axiosClient'

export const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [saving, setSaving] = useState(false)

    const meetsLength = newPassword.length >= 8
    const hasNumber = /\d/.test(newPassword)
    const hasSymbol = /[^A-Za-z0-9]/.test(newPassword)
    const passwordsMatch = newPassword && newPassword === confirmPassword

    const handleUpdate = async () => {
        if (!meetsLength || !hasNumber || !hasSymbol) {
            alert('Password does not meet requirements')
            return
        }
        if (!passwordsMatch) {
            alert('Passwords do not match')
            return
        }

        setSaving(true)
        try {
            await axiosClient.post('/auth/change-password', {
                current_password: currentPassword,
                new_password: newPassword,
            })
            alert('Password updated')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (err) {
            console.error(err)
            alert('Failed to change password: ' + (err.response?.data?.detail || err.message))
        } finally {
            setSaving(false)
        }
    }

    const Row = ({ ok, children }) => (
        <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${ok ? 'bg-green-500' : 'bg-slate-700'}`}></div>
            <div className="text-sm text-slate-400">{children}</div>
        </div>
    )

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-black mb-4">Change Password</h1>
            <p className="text-sm text-slate-400 mb-6">Update your account credentials to keep your profile secure.</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Current Password</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black" />
                </div>

                <div>
                    <label className="block text-sm mb-1">New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black" />
                </div>

                <div>
                    <label className="block text-sm mb-1">Confirm New Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black" />
                </div>

                <div className="p-4 rounded-lg bg-slate-800/40">
                    <h4 className="font-bold mb-3">PASSWORD REQUIREMENTS</h4>
                    <div className="space-y-2">
                        <Row ok={meetsLength}>At least 8 characters</Row>
                        <Row ok={hasNumber}>Include at least one number</Row>
                        <Row ok={hasSymbol}>Include at least one special symbol</Row>
                    </div>
                </div>

                <div>
                    <button onClick={handleUpdate} disabled={saving} className="w-full bg-primary text-black py-4 rounded-full font-bold">
                        {saving ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </div>
        </div>
    )
}
