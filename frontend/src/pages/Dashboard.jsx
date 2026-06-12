import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import Navbar from '../components/Navbar'
import AddFieldModal from '../components/AddFieldModal'
import MarketTicker from '../components/MarketTicker'
import AgriThemeBackground from '../components/AgriThemeBackground'

const Dashboard = () => {
    const [fields, setFields] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const username = localStorage.getItem('username') || 'Farmer'

    const fetchFields = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${API_URL}/fields/`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setFields(response.data)
        } catch (err) {
            console.error('Error fetching fields', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFields()
    }, [])

    const handleAddField = async (fieldData) => {
        try {
            const token = localStorage.getItem('token')
            await axios.post(`${API_URL}/fields/`, fieldData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setIsModalOpen(false)
            fetchFields()
        } catch (err) {
            console.error('Error adding field', err)
            alert('Failed to add field')
        }
    }

    const getCropBadgeColor = (crop) => {
        const c = crop ? crop.toLowerCase() : '';
        if (c.includes('soy')) return 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20';
        if (c.includes('ground') || c.includes('peanut')) return 'bg-amber-500/10 text-amber-300 border border-amber-500/20';
        if (c.includes('sunflower')) return 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20';
        if (c.includes('mustard')) return 'bg-orange-500/10 text-orange-300 border border-orange-500/20';
        return 'bg-green-500/10 text-green-300 border border-green-500/20';
    }

    return (
        <div className="min-h-screen bg-transparent relative text-white">
            <AgriThemeBackground />
            <Navbar />
            <MarketTicker />
            <div className="container mx-auto p-6 max-w-7xl relative z-10">
                
                {/* Greeting banner */}
                <div className="mb-8 rounded-3xl bg-gradient-to-r from-emerald-900/60 to-green-950/70 p-6 md:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/20 backdrop-blur-md animate-fade-in">
                    <div className="absolute right-0 bottom-0 opacity-[0.08] text-9xl pointer-events-none translate-y-10 translate-x-10">
                        🚜
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            🌾 Precision Agriculture
                        </span>
                        <h1 className="text-2xl md:text-3xl font-extrabold mt-3 bg-gradient-to-r from-white via-white to-emerald-200 bg-clip-text text-transparent">
                            Namaste, {username}!
                        </h1>
                        <p className="mt-2 text-sm text-emerald-100/80 leading-relaxed">
                            Welcome back to your Krishi Saathi advisor console. Check real-time crop market rates, manage registered fields, and obtain AI advisory for optimal harvest outputs.
                        </p>
                    </div>
                </div>

                <header className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Registered Farm Lands</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 font-semibold text-white shadow-lg transition duration-200 hover:shadow-emerald-500/20 hover:brightness-110 active:scale-95 cursor-pointer border-0"
                    >
                        + Add Field
                    </button>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center py-12 text-emerald-300">
                        <span className="animate-pulse">Loading fields data...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {fields.map((field) => (
                            <div key={field.id} className="rounded-3xl bg-emerald-900/10 border border-emerald-800/20 p-6 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-emerald-900/20 duration-300 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">{field.name}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getCropBadgeColor(field.crop_type)}`}>
                                            {field.crop_type || 'Crop'}
                                        </span>
                                    </div>
                                    <div className="space-y-1.5 text-sm text-emerald-200/70">
                                        <p className="flex items-center gap-2">
                                            <span>📍</span> District: <strong className="text-emerald-100">{field.district}</strong>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span>📐</span> Farm Size: <strong className="text-emerald-100">{field.area_ha} Hectares</strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-emerald-800/10 flex items-center justify-between">
                                    <span className="text-xs font-mono text-emerald-500/80">FARM ID: #{field.id}</span>
                                    <button
                                        onClick={() => window.location.href = `/field/${field.id}`}
                                        className="text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition duration-200 bg-transparent border-0 cursor-pointer"
                                    >
                                        Precision Advisory &rarr;
                                    </button>
                                </div>
                            </div>
                        ))}
                        {fields.length === 0 && (
                            <div className="col-span-full py-16 text-center rounded-3xl bg-emerald-900/5 border border-emerald-800/10 text-emerald-200/50 backdrop-blur-sm">
                                <span className="text-4xl block mb-2">🌾</span>
                                No fields found. Add your first field to get started.
                            </div>
                        )}
                    </div>
                )}

                <AddFieldModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddField}
                />
            </div>
        </div>
    )
}

export default Dashboard
