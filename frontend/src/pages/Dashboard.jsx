import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import Navbar from '../components/Navbar'
import AddFieldModal from '../components/AddFieldModal'
import MarketTicker from '../components/MarketTicker'

const Dashboard = () => {
    const [fields, setFields] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <MarketTicker />
            <div className="container mx-auto p-6">
                <header className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">My Fields</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                        + Add Field
                    </button>
                </header>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {fields.map((field) => (
                            <div key={field.id} className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
                                <h3 className="mb-2 text-xl font-semibold">{field.name}</h3>
                                <p className="text-gray-600">District: {field.district}</p>
                                <p className="text-gray-600">Crop: {field.crop_type}</p>
                                <div className="mt-4 flex justify-between">
                                    <span className="text-sm text-gray-500">Area: {field.area_ha} ha</span>
                                    <button
                                        onClick={() => window.location.href = `/field/${field.id}`}
                                        className="text-green-600 hover:text-green-800"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                        {fields.length === 0 && (
                            <div className="col-span-full py-12 text-center text-gray-500">
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
