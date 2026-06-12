import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

const MarketTicker = () => {
    const [prices, setPrices] = useState([])

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const response = await axios.get(`${API_URL}/market/prices`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setPrices(response.data)
            } catch (err) {
                console.error("Failed to fetch market prices")
            }
        }

        // Initial fetch
        fetchPrices()
        // Poll every 30 seconds
        const interval = setInterval(fetchPrices, 30000)
        return () => clearInterval(interval)
    }, [])

    if (prices.length === 0) return null

    return (
        <div className="bg-emerald-950/40 border-y border-emerald-800/10 text-white overflow-hidden py-3 backdrop-blur-sm relative z-10">
            <div className="flex animate-marquee whitespace-nowrap">
                {prices.map((item, index) => {
                    const isUp = item.trend ? item.trend === 'up' : (item.change ? !String(item.change).includes('-') && !String(item.change).includes('▼') : true);
                    return (
                        <span key={index} className="mx-8 flex items-center space-x-3.5 text-sm font-semibold tracking-wide">
                            <span className="text-emerald-300 uppercase">🌾 {item.crop}</span>
                            <span className="text-white">₹{item.price}/q</span>
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                                isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                            }`}>
                                {isUp ? '▲' : '▼'} {item.change || '0%'}
                            </span>
                            <span className="text-emerald-800/30">|</span>
                        </span>
                    );
                })}
            </div>
        </div>
    )
}

export default MarketTicker
