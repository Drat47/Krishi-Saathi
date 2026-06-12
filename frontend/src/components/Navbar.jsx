import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const username = localStorage.getItem('username') || 'Farmer'

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/login')
    }

    return (
        <nav className="sticky top-0 z-50 bg-emerald-950/80 backdrop-blur-md text-white shadow-lg border-b border-emerald-800/20">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-2xl">🌱</span>
                    <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">Krishi Saathi</span>
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-emerald-200 hover:text-white transition font-medium">Dashboard</Link>
                    <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center font-bold text-emerald-950 border-2 border-white/20">
                            {username.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium mr-2 text-emerald-100">{username}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-300 hover:text-red-200 transition border-l border-white/20 pl-3 bg-transparent border-0 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
