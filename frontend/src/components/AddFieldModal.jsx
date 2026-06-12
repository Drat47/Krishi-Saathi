import { useState, useEffect } from 'react'
import { INDIAN_LOCATIONS } from '../data/locations'

const AddFieldModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        state: '',
        district: '',
        crop_type: '',
        area_ha: '',
        latitude: '',
        longitude: ''
    })

    const [availableDistricts, setAvailableDistricts] = useState([])

    // Update districts when state changes
    useEffect(() => {
        if (formData.state && INDIAN_LOCATIONS[formData.state]) {
            setAvailableDistricts(Object.keys(INDIAN_LOCATIONS[formData.state]))
            // Reset district if state changes
            setFormData(prev => ({ ...prev, district: '', latitude: '', longitude: '' }))
        } else {
            setAvailableDistricts([])
        }
    }, [formData.state])

    // Update Lat/Lon when district changes
    useEffect(() => {
        if (formData.state && formData.district && INDIAN_LOCATIONS[formData.state][formData.district]) {
            const coords = INDIAN_LOCATIONS[formData.state][formData.district]
            setFormData(prev => ({
                ...prev,
                latitude: coords.lat,
                longitude: coords.lng
            }))
        }
    }, [formData.district, formData.state])

    if (!isOpen) return null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Convert numeric fields
        const payload = {
            ...formData,
            area_ha: parseFloat(formData.area_ha),
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude)
        }
        onAdd(payload)
        setFormData({
            name: '',
            state: '',
            district: '',
            crop_type: '',
            area_ha: '',
            latitude: '',
            longitude: ''
        })
    }

    const selectClass = "w-full rounded-xl bg-emerald-950/80 px-4 py-2.5 text-white placeholder-emerald-600/50 border border-emerald-800/40 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition duration-200"
    const inputClass = "w-full rounded-xl bg-emerald-950/80 px-4 py-2.5 text-white placeholder-emerald-600/50 border border-emerald-800/40 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition duration-200"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-emerald-950/95 border border-emerald-800/40 p-8 shadow-2xl backdrop-blur-xl text-white">
                <h2 className="mb-6 text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">Register Farm Plot</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-300/80">Field Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={inputClass}
                            placeholder="e.g. Riverside Plot"
                        />
                    </div>

                    {/* State & District Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-300/80">State</label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className={selectClass}
                            >
                                <option value="" className="bg-[#051c0e] text-white">Select State</option>
                                {Object.keys(INDIAN_LOCATIONS).map(state => (
                                    <option key={state} value={state} className="bg-[#051c0e] text-white">{state}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-300/80">District</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                required
                                disabled={!formData.state}
                                className={`${selectClass} disabled:opacity-50`}
                            >
                                <option value="" className="bg-[#051c0e] text-white">Select District</option>
                                {availableDistricts.map(dist => (
                                    <option key={dist} value={dist} className="bg-[#051c0e] text-white">{dist}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-300/80">Crop Type</label>
                            <select
                                name="crop_type"
                                value={formData.crop_type}
                                onChange={handleChange}
                                required
                                className={selectClass}
                            >
                                <option value="" className="bg-[#051c0e] text-white">Select Crop</option>
                                <option value="Soybean" className="bg-[#051c0e] text-white">Soybean</option>
                                <option value="Groundnut" className="bg-[#051c0e] text-white">Groundnut</option>
                                <option value="Sunflower" className="bg-[#051c0e] text-white">Sunflower</option>
                                <option value="Mustard" className="bg-[#051c0e] text-white">Mustard</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-emerald-300/80">Area (Hectares)</label>
                            <input
                                name="area_ha"
                                type="number"
                                step="0.1"
                                value={formData.area_ha}
                                onChange={handleChange}
                                required
                                className={inputClass}
                                placeholder="e.g. 4.5"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-emerald-950/70 p-4 rounded-2xl border border-emerald-800/20">
                        <div>
                            <label className="block text-[10px] font-bold text-emerald-400/80 uppercase tracking-wider mb-1">Latitude</label>
                            <input
                                name="latitude"
                                type="number"
                                step="0.000001"
                                value={formData.latitude}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent p-0 text-sm font-mono text-emerald-100 border-0 focus:ring-0 focus:outline-none"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-emerald-400/80 uppercase tracking-wider mb-1">Longitude</label>
                            <input
                                name="longitude"
                                type="number"
                                step="0.000001"
                                value={formData.longitude}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent p-0 text-sm font-mono text-emerald-100 border-0 focus:ring-0 focus:outline-none"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-emerald-800/20">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-white/10 px-5 py-2.5 font-semibold text-white/80 hover:bg-white/5 transition duration-200 active:scale-95 cursor-pointer bg-transparent"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-2.5 font-semibold text-white shadow-lg transition duration-200 hover:shadow-emerald-500/20 hover:brightness-110 active:scale-95 cursor-pointer border-0"
                        >
                            Register Plot
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFieldModal
