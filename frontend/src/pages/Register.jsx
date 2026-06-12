import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'
import BackgroundImage from '../components/BackgroundImage'

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
            <BackgroundImage />
            <div className="flex min-h-screen items-center justify-center p-4 text-white">
                <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-lg border border-white/20">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-yellow-500 mb-2">Krishi Sathi</h1>
                        <p className="text-gray-200">Join the Revolution</p>
                    </div>

                    <h2 className="mb-6 text-center text-2xl font-semibold">Create Account</h2>

                    {error && (
                        <div className="mb-4 rounded bg-red-500/20 px-4 py-2 text-center text-red-200 border border-red-500/30">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Username</label>
                            <input
                                type="text"
                                className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-400 border border-white/10 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-400 border border-white/10 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-green-600 py-3 font-semibold text-white shadow-lg transition hover:from-yellow-600 hover:to-green-700 active:scale-95"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">
                            Login Here
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
