import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import FieldDetails from './pages/FieldDetails'
import AgriWatermark from './components/AgriWatermark'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return children
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-[#051c0e] text-white relative">
                <AgriWatermark />
                <div className="relative z-10">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/field/:id" element={
                            <ProtectedRoute>
                                <FieldDetails />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
