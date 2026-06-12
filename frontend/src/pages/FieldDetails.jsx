import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LiveClock from '../components/LiveClock'
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

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>
    if (!field) return <div className="p-8 text-center">Field not found</div>

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => navigate('/')} className="text-green-700 hover:underline">← Back to Dashboard</button>
                    <LiveClock />
                </div>

                <div className="mb-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Info Card */}
                    <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-md">
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{field.name}</h1>
                                <p className="text-gray-500">{field.district} • {field.area_ha} Hectares</p>
                            </div>
                            <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800 border border-green-200">
                                {field.crop_type}
                            </span>
                        </div>

                        {/* Tabs */}
                        <div className="mb-6 flex space-x-4 border-b">
                            {['overview', 'analytics', 'advisory'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-2 text-sm font-medium capitalize transition ${activeTab === tab
                                            ? 'border-b-2 border-green-600 text-green-600'
                                            : 'text-gray-500 hover:text-gray-700'
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
                                    <div className="h-80 w-full overflow-hidden rounded-lg shadow-inner border border-gray-200">
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
                                    <h3 className="font-semibold text-gray-700">Live Weather Conditions</h3>
                                    {weather ? (
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                            <div className="rounded-lg bg-orange-50 p-4 border border-orange-100">
                                                <p className="text-xs text-orange-600 uppercase font-bold">Temperature</p>
                                                <p className="text-2xl font-bold">{weather.temperature}{weather.unit_temp}</p>
                                            </div>
                                            <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                                                <p className="text-xs text-blue-600 uppercase font-bold">Humidity</p>
                                                <p className="text-2xl font-bold">{weather.humidity}%</p>
                                            </div>
                                            <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                                                <p className="text-xs text-gray-600 uppercase font-bold">Wind Speed</p>
                                                <p className="text-2xl font-bold">{weather.wind_speed} <span className="text-sm">{weather.unit_speed}</span></p>
                                            </div>
                                            <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100">
                                                <p className="text-xs text-indigo-600 uppercase font-bold">Rainfall</p>
                                                <p className="text-2xl font-bold">{weather.rain} mm</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 animate-pulse">Fetching live weather data...</p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'analytics' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="mb-4 font-semibold text-gray-700">Historical Yield vs Benchmark (kg/ha)</h3>
                                        <div className="h-64 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={yieldData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="year" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="actual" stroke="#16a34a" name="Actual Yield" strokeWidth={2} />
                                                    <Line type="monotone" dataKey="benchmark" stroke="#ca8a04" name="Benchmark" strokeDasharray="5 5" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-4 font-semibold text-gray-700">Comparative Performance</h3>
                                        <div className="h-64 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={comparativeData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'advisory' && (
                                <div className="space-y-4">
                                    {advisories.map((adv) => (
                                        <div key={adv.id} className={`rounded-lg border-l-4 p-4 shadow-sm ${adv.priority === 'high' ? 'border-red-500 bg-red-50' :
                                                adv.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                                                    'border-green-500 bg-green-50'
                                            }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-xs font-bold uppercase ${adv.priority === 'high' ? 'text-red-600' :
                                                        adv.priority === 'medium' ? 'text-yellow-600' :
                                                            'text-green-600'
                                                    }`}>
                                                    {adv.priority} Priority • {adv.category}
                                                </span>
                                                <span className="text-xs text-gray-500">{new Date(adv.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-800">{adv.content}</p>
                                        </div>
                                    ))}
                                    {advisories.length === 0 && <p className="text-gray-500 italic">No active advisories generated yet.</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="rounded-xl bg-gradient-to-br from-green-600 to-green-800 p-6 text-white shadow-lg">
                            <h3 className="mb-1 text-green-100 text-sm uppercase">Predicted Yield</h3>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-4xl font-bold">1,850</span>
                                <span className="text-green-200">kg/ha</span>
                            </div>
                            <div className="mt-4 h-2 w-full rounded-full bg-green-900/40">
                                <div className="h-2 w-[75%] rounded-full bg-yellow-400"></div>
                            </div>
                            <p className="mt-2 text-xs text-green-100 flex justify-between">
                                <span>Current Potential</span>
                                <span>75% of Optimal</span>
                            </p>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-md">
                            <h3 className="mb-4 font-bold text-gray-800">Action Plan</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">1</span>
                                    <span className="text-sm text-gray-600">Schedule irrigation for tomorrow morning (40mm).</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">2</span>
                                    <span className="text-sm text-gray-600">Apply NPK 20:20:20 fertilizer within 3 days.</span>
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
