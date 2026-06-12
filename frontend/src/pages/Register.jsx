import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'
import AgriThemeBackground from '../components/AgriThemeBackground'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}/auth/register`, { username, password })
            navigate('/login')
        } catch (err) {
            setError('Registration failed. Username might be taken.')
        }
    }

    return (
        <>
            <AgriThemeBackground />
            <div className="flex min-h-screen items-center justify-center p-4 text-white">
                <div className="w-full max-w-md overflow-hidden rounded-3xl bg-black/40 p-8 shadow-2xl backdrop-blur-xl border border-white/10 animate-fade-in-up">
                    <div className="mb-8 text-center">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-3xl mb-3">
                            🌱
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent mb-1">Krishi Saathi</h1>
                        <p className="text-sm text-emerald-100/70">Join the Precision Advisory Revolution</p>
                    </div>

                    <h2 className="mb-6 text-center text-xl font-semibold text-white/90">Create Account</h2>

                    {error && (
                        <div className="mb-4 rounded-xl bg-red-500/20 px-4 py-3 text-center text-sm text-red-200 border border-red-500/30">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-300/80">Username</label>
                            <input
                                type="text"
                                className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-emerald-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition duration-200"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-300/80">Password</label>
                            <input
                                type="password"
                                className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-emerald-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition duration-200"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white shadow-lg transition duration-200 hover:shadow-emerald-500/20 hover:brightness-110 active:scale-98"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
                            Login Here
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
