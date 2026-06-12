import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LiveClock from '../components/LiveClock'
import AgriThemeBackground from '../components/AgriThemeBackground'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import axios from 'axios'
import { API_URL } from '../config'
import L from 'leaflet'

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

const FieldDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [field, setField] = useState(null)
    const [advisories, setAdvisories] = useState([])
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')

    // Mock Historical Data
    const yieldData = [
        { year: '2020', actual: 1200, benchmark: 1500 },
        { year: '2021', actual: 1350, benchmark: 1550 },
        { year: '2022', actual: 1100, benchmark: 1600 },
        { year: '2023', actual: 1600, benchmark: 1700 },
        { year: '2024', actual: 1750, benchmark: 1750 },
    ]

    const comparativeData = [
        { name: 'Your Yield', value: 1750 },
        { name: 'District Avg', value: 1400 },
        { name: 'State Avg', value: 1350 },
        { name: 'Global Best', value: 2500 },
    ]

    useEffect(() => {
        const fetchFieldDetails = async () => {
            try {
                const token = localStorage.getItem('token')

                // Fetch field data
                const response = await axios.get(`${API_URL}/fields/`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const foundField = response.data.find(f => f.id === parseInt(id))
                setField(foundField)

                // Fetch Weather Data
                if (foundField) {
                    try {
                        const weatherResponse = await axios.get(`${API_URL}/weather/?latitude=${foundField.latitude}&longitude=${foundField.longitude}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        setWeather(weatherResponse.data)
                    } catch (wErr) {
                        console.error("Weather fetch failed", wErr)
                    }
                }

                // Fetch Advisory
                const advResponse = await axios.get(`${API_URL}/advisory/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setAdvisories(advResponse.data)

                if (advResponse.data.length === 0) {
                    await axios.post(`${API_URL}/advisory/${id}`, {}, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    const advResponseNew = await axios.get(`${API_URL}/advisory/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    setAdvisories(advResponseNew.data)
                }

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchFieldDetails()
    }, [id])

    if (loading) return <div className="flex h-screen items-center justify-center bg-[#051c0e] text-emerald-300">Loading...</div>
    if (!field) return <div className="p-8 text-center bg-[#051c0e] text-red-400">Field not found</div>

    return (
        <div className="min-h-screen bg-transparent relative text-white">
            <AgriThemeBackground />
            <Navbar />
            <div className="container mx-auto p-6 max-w-7xl relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <button 
                        onClick={() => navigate('/')} 
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition active:scale-95 cursor-pointer bg-transparent border-0"
                    >
                        &larr; Back to Dashboard
                    </button>
                    <LiveClock />
                </div>

                <div className="mb-8 grid gap-6 lg:grid-cols-3 items-start">
                    {/* Main Info Card */}
                    <div className="lg:col-span-2 rounded-3xl bg-emerald-900/10 border border-emerald-800/20 p-6 shadow-xl backdrop-blur-md">
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-extrabold text-white">{field.name}</h1>
                                <p className="text-sm text-emerald-200/70 mt-1">{field.district} District &bull; {field.area_ha} Hectares</p>
                            </div>
                            <span className="rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-semibold text-emerald-300 border border-emerald-500/20">
                                {field.crop_type}
                            </span>
                        </div>

                        {/* Tabs */}
                        <div className="mb-6 flex space-x-2 bg-emerald-950/80 p-1.5 rounded-2xl border border-emerald-900/50">
                            {['overview', 'analytics', 'advisory'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize transition duration-200 cursor-pointer border-0 ${activeTab === tab
                                            ? 'bg-emerald-600 text-white shadow-md'
                                            : 'text-emerald-300/80 hover:text-white bg-transparent'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="min-h-[400px]">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    <div className="h-80 w-full overflow-hidden rounded-2xl shadow-inner border border-emerald-800/20 relative z-0">
                                        <MapContainer center={[field.latitude, field.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer
                                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                                attribution='Tiles &copy; Esri'
                                            />
                                            <Marker position={[field.latitude, field.longitude]}>
                                                <Popup>{field.name}</Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">Live Weather Conditions</h3>
                                    {weather ? (
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                            <div className="rounded-2xl bg-amber-500/5 p-4 border border-amber-500/20">
                                                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">Temperature</p>
                                                <p className="text-2xl font-bold text-white">{weather.temperature}{weather.unit_temp}</p>
                                            </div>
                                            <div className="rounded-2xl bg-emerald-500/5 p-4 border border-emerald-500/20">
                                                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">Humidity</p>
                                                <p className="text-2xl font-bold text-white">{weather.humidity}%</p>
                                            </div>
                                            <div className="rounded-2xl bg-teal-500/5 p-4 border border-teal-500/20">
                                                <p className="text-xs text-teal-400 font-bold uppercase tracking-wider mb-1">Wind Speed</p>
                                                <p className="text-2xl font-bold text-white">{weather.wind_speed} <span className="text-xs">{weather.unit_speed}</span></p>
                                            </div>
                                            <div className="rounded-2xl bg-indigo-500/5 p-4 border border-indigo-500/20">
                                                <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">Rainfall</p>
                                                <p className="text-2xl font-bold text-white">{weather.rain} mm</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-emerald-300 animate-pulse text-sm">Fetching live weather data...</p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'analytics' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="mb-4 font-bold text-emerald-200 text-sm uppercase tracking-wider">Historical Yield vs Benchmark (kg/ha)</h3>
                                        <div className="h-64 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={yieldData}>
                                                    <CartesianGrid stroke="#113f24" strokeDasharray="3 3" />
                                                    <XAxis dataKey="year" stroke="#34d399" tick={{ fontSize: 11 }} />
                                                    <YAxis stroke="#34d399" tick={{ fontSize: 11 }} />
                                                    <Tooltip contentStyle={{ backgroundColor: '#022c22', borderColor: '#059669', borderRadius: '12px', color: '#fff' }} />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="actual" stroke="#10b981" name="Actual Yield" strokeWidth={3} activeDot={{ r: 8 }} />
                                                    <Line type="monotone" dataKey="benchmark" stroke="#f59e0b" name="Benchmark" strokeDasharray="5 5" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-4 font-bold text-emerald-200 text-sm uppercase tracking-wider">Comparative Performance</h3>
                                        <div className="h-64 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={comparativeData}>
                                                    <CartesianGrid stroke="#113f24" strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" stroke="#34d399" tick={{ fontSize: 11 }} />
                                                    <YAxis stroke="#34d399" tick={{ fontSize: 11 }} />
                                                    <Tooltip contentStyle={{ backgroundColor: '#022c22', borderColor: '#059669', borderRadius: '12px', color: '#fff' }} />
                                                    <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]}>
                                                        <Legend />
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'advisory' && (
                                <div className="space-y-4">
                                    {advisories.map((adv) => (
                                        <div key={adv.id} className={`rounded-2xl border border-l-4 p-5 backdrop-blur-sm transition hover:brightness-110 duration-200 ${
                                            adv.priority === 'high' ? 'border-red-500/40 border-l-red-500 bg-red-950/10' :
                                            adv.priority === 'medium' ? 'border-amber-500/40 border-l-amber-500 bg-amber-950/10' :
                                            'border-emerald-500/40 border-l-emerald-500 bg-emerald-950/10'
                                        }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-xs font-bold uppercase tracking-wider ${
                                                    adv.priority === 'high' ? 'text-red-400' :
                                                    adv.priority === 'medium' ? 'text-amber-400' :
                                                    'text-emerald-400'
                                                }`}>
                                                    🔥 {adv.priority} Priority &bull; {adv.category}
                                                </span>
                                                <span className="text-xs text-emerald-300/60 font-mono">{new Date(adv.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-emerald-100 text-sm leading-relaxed">{adv.content}</p>
                                        </div>
                                    ))}
                                    {advisories.length === 0 && (
                                        <div className="py-12 text-center text-emerald-300/50">
                                            No active advisories generated yet.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6 w-full">
                        <div className="rounded-3xl bg-gradient-to-br from-emerald-800 to-green-950 p-6 text-white shadow-xl border border-emerald-700/30 relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 opacity-[0.04] text-8xl translate-y-6 translate-x-6">
                                📉
                            </div>
                            <h3 className="mb-1 text-emerald-300 text-xs font-bold uppercase tracking-wider">Predicted AI Yield</h3>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-4xl font-extrabold text-white">1,850</span>
                                <span className="text-emerald-300 font-bold">kg/ha</span>
                            </div>
                            <div className="mt-4 h-2 w-full rounded-full bg-emerald-950/50 overflow-hidden">
                                <div className="h-2 w-[74%] rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                            </div>
                            <p className="mt-3.5 text-xs text-emerald-200/80 flex justify-between font-medium">
                                <span>Current Target Potential</span>
                                <span className="text-amber-300 font-bold">74% of Optimal</span>
                            </p>
                        </div>

                        <div className="rounded-3xl bg-emerald-900/10 border border-emerald-800/20 p-6 shadow-xl backdrop-blur-md text-white">
                            <h3 className="mb-4 font-bold text-white flex items-center gap-2">
                                <span>📋</span> Recommended Action Plan
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30 text-xs font-bold text-blue-300">1</span>
                                    <span className="text-sm text-emerald-100/90 leading-relaxed">Schedule field irrigation for tomorrow morning (**40mm** supply required).</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300">2</span>
                                    <span className="text-sm text-emerald-100/90 leading-relaxed">Apply NPK **20:20:20** dry fertilizer mixture within the next 3 days.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FieldDetails
