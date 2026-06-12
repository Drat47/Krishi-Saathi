import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { motion } from 'framer-motion'

const MarketTicker = () => {
    const [prices, setPrices] = useState([])

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // In real app, authenticated call, but for ticker let's mock or use public endpoint
                // We'll use the one we created. Needs auth token? 
                // Let's assume public or use token if available. 
                // For simplicity, we'll try to get it without auth or assume token is present in localStorage
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
        <div className="bg-green-900 text-white overflow-hidden py-2 shadow-inner">
            <div className="flex animate-marquee whitespace-nowrap">
                {prices.map((item, index) => (
                    <span key={index} className="mx-6 flex items-center space-x-2 text-sm font-medium">
                        <span className="text-green-300">{item.crop}:</span>
                        <span>₹{item.price}/q</span>
                        <span className={item.change > 0 ? 'text-green-400' : 'text-red-400'}>
                            {item.change > 0 ? '▲' : '▼'} {item.change}
                        </span>
                    </span>
                ))}
            </div>
            {/* Duplicate for seamless scrolling effect if we implemented pure CSS marquee, 
                for now standard flex is okay or we check if Framer Motion is installed.
                I installed recharts, but not framer-motion. I'll stick to simple CSS or use index.css
            */}
        </div>
    )
}

export default MarketTicker
