import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Dumbbell } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export const RegisterPage = () => {
    const navigate = useNavigate()
    const { register } = useAuth()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        if (formData.name.trim() === "" || formData.email.trim() === "" || formData.password.trim() === "") {
            setError("Name, email, and password cannot be empty")
            return
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            setError("Invalid email format")
            return
        }

        setError("")

        await register({
            username: formData.name,
            email: formData.email,
            password_hash: formData.password
        }).then(() => {
            alert("Registration successful! Please log in.")
            navigate("/login")
        }).catch((err) => {
            setError(err.response?.data?.detail || "Registration failed")
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-6">

            <div className="w-full max-w-md bg-white dark:bg-background-dark border border-primary/10 rounded-2xl p-8 shadow-xl">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="size-14 bg-primary rounded-2xl flex items-center justify-center text-background-dark mb-4">
                        <Dumbbell size={28} strokeWidth={3} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                        Create Account
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Join FitSync and start your journey
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />

                    {error && (
                        <p className="text-red-500 text-sm font-medium">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary text-background-dark py-3 rounded-xl font-black hover:scale-[1.02] transition-transform"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-slate-400 text-center mt-6">
                    Already have an account?
                    <Link
                        to="/"
                        className="text-primary font-bold ml-2 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    )
}