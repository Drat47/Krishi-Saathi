import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'
import AgriThemeBackground from '../components/AgriThemeBackground'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('username', username)
            formData.append('password', password)

            const response = await axios.post(`${API_URL}/auth/token`, formData)
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('username', username)
            navigate('/')
        } catch (err) {
            setError('Invalid credentials')
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
                        <p className="text-sm text-emerald-100/70">AI-Enabled Precision Advisory Platform</p>
                    </div>

                    <h2 className="mb-6 text-center text-xl font-semibold text-white/90">Welcome Back</h2>

                    {error && (
                        <div className="mb-4 rounded-xl bg-red-500/20 px-4 py-3 text-center text-sm text-red-200 border border-red-500/30">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-300/80">Username</label>
                            <input
                                type="text"
                                className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-emerald-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition duration-200"
                                placeholder="Enter your username"
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white shadow-lg transition duration-200 hover:shadow-emerald-500/20 hover:brightness-110 active:scale-98"
                        >
                            Secure Login
                        </button>
                    </form>

                    <div className="mt-6 rounded-2xl bg-amber-500/5 p-4 border border-amber-500/20 text-center text-sm">
                        <p className="text-amber-400 font-semibold mb-2 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider">
                            <span>🔑</span> Demo Access
                        </p>
                        <div className="flex justify-around text-gray-300">
                            <div>
                                <span className="text-gray-400 block text-[10px] uppercase mb-0.5">Username</span>
                                <code className="bg-black/40 px-2 py-0.5 rounded text-amber-300 font-mono text-xs select-all border border-white/5">admin</code>
                            </div>
                            <div>
                                <span className="text-gray-400 block text-[10px] uppercase mb-0.5">Password</span>
                                <code className="bg-black/40 px-2 py-0.5 rounded text-amber-300 font-mono text-xs select-all border border-white/5">password123</code>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setUsername('admin');
                                setPassword('password123');
                            }}
                            className="mt-3.5 text-xs bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-emerald-950 font-bold px-4 py-2 rounded-xl transition duration-200 active:scale-95 cursor-pointer shadow-md w-full"
                        >
                            Autofill Demo Credentials
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        New to Krishi Saathi?{' '}
                        <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
                            Register Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
