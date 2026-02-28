import React, { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
    const { user, fetchUser } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bodyFat, setBodyFat] = useState('')

    const [avatarFile, setAvatarFile] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (user) {
            setUsername(user.username || '')
            setEmail(user.email || '')
            setGender(user.gender || '')
            setAge(user.age || '')
            setHeight(user.height || '')
            setWeight(user.weight || '')
            setBodyFat(user.body_fat || '')
            setAvatarPreview(user.avatar || null)
        }
    }, [user])

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setAvatarFile(file)
        const reader = new FileReader()
        reader.onload = (ev) => setAvatarPreview(ev.target.result)
        reader.readAsDataURL(file)
    }

    const handleRemoveAvatar = async () => {
        setAvatarFile(null)
        setAvatarPreview(null)
        // backend may support removing avatar via PUT with empty avatar or dedicated endpoint
        try {
            await axiosClient.put('/auth/me', { remove_avatar: true })
            if (fetchUser) await fetchUser()
        } catch (err) {
            console.error(err)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const form = new FormData()
            form.append('username', username)
            form.append('email', email)
            form.append('gender', gender)
            form.append('age', age)
            form.append('height', height)
            form.append('weight', weight)
            form.append('body_fat', bodyFat)
            if (avatarFile) form.append('avatar', avatarFile)

            await axiosClient.put('/auth/me', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            if (fetchUser) await fetchUser()
            alert('Profile updated')
        } catch (err) {
            console.error(err)
            alert('Failed to save profile: ' + (err.response?.data?.detail || err.message))
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black">Profile Settings</h1>
                    <p className="text-sm text-slate-400">Manage your account details and physical metrics</p>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/change-password')} className="px-4 py-2 border rounded-full text-sm">Change Password</button>
                    <button onClick={handleSave} disabled={saving} className="bg-primary text-black px-5 py-2 rounded-full font-bold">
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="bg-slate-900/30 p-6 rounded-2xl">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-green-500">
                        {avatarPreview ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400">No avatar</div>}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{user?.username || 'User'}</h3>
                        <p className="text-sm text-slate-400">Member since {user?.created_at ? new Date(user.created_at).toLocaleString() : '—'}</p>
                        <div className="mt-3 flex gap-3">
                            <label className="bg-primary text-black px-3 py-1 rounded-full cursor-pointer">
                                Update Avatar
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                            <button onClick={handleRemoveAvatar} className="px-3 py-1 rounded-full border">Remove</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-800/40 rounded-lg">
                        <h4 className="font-bold mb-4">Account Information</h4>
                        <label className="block text-sm mb-1">Username</label>
                        <input className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label className="block text-sm mb-1">Email Address</label>
                        <input className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label className="block text-sm mb-1">Gender</label>
                        <select className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-xl font-black" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="p-4 bg-slate-800/40 rounded-lg">
                        <h4 className="font-bold mb-4">Physical Metrics</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm mb-1">Age</label>
                                <input className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black" value={age} onChange={(e) => setAge(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Height (cm)</label>
                                <input className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black" value={height} onChange={(e) => setHeight(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Weight (kg)</label>
                                <input className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Body Fat %</label>
                                <input className="w-full bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-30 text-xl font-black" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} />
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 mt-3">Metrics are used to calculate your TDEE and personalize your workout intensity recommendations.</p>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-slate-800/20 rounded-lg flex items-center justify-between">
                    <div>
                        <h5 className="font-bold">Delete Account</h5>
                        <p className="text-sm text-slate-400">Permanently remove all your fitness data and history.</p>
                    </div>
                    <button className="text-red-500 border rounded px-4 py-2">Deactivate</button>
                </div>
            </div>
        </div>
    )
}

