import React from 'react';

const AgriWatermark = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-[0.04] text-emerald-800">
            {/* Top Left Leaf */}
            <div className="absolute -top-10 -left-10 w-96 h-96 transform -rotate-12">
                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <path d="M100 20 C140 60 170 100 100 180 C30 100 60 60 100 20 Z" />
                    <path d="M100 20 L100 180" />
                    <path d="M100 50 C125 70 135 95 145 105" />
                    <path d="M100 70 C75 95 65 115 55 125" />
                    <path d="M100 95 C125 115 135 135 140 145" />
                    <path d="M100 115 C75 135 70 150 65 155" />
                </svg>
            </div>

            {/* Bottom Right Wheat Stalks */}
            <div className="absolute -bottom-16 -right-16 w-80 h-[30rem] transform rotate-12">
                <svg viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
                    <path d="M50 190 L50 20" />
                    <path d="M50 40 C65 30 65 20 50 10 C35 20 35 30 50 40 Z" fill="currentColor" />
                    <path d="M50 70 C70 55 70 45 50 35 C30 45 30 55 50 70 Z" fill="currentColor" />
                    <path d="M50 100 C75 80 75 70 50 60 C25 70 25 80 50 100 Z" fill="currentColor" />
                    <path d="M50 130 C80 110 80 100 50 90 C20 100 20 110 50 130 Z" fill="currentColor" />
                    <path d="M50 160 C80 140 80 130 50 120 C20 130 20 140 50 160 Z" fill="currentColor" />
                </svg>
            </div>

            {/* Top Right Contour Topography lines */}
            <div className="absolute top-1/4 -right-12 w-96 h-64 transform rotate-45">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
                    <path d="M0 80 Q 25 70, 50 85 T 100 75" />
                    <path d="M0 60 Q 35 55, 65 70 T 100 55" />
                    <path d="M0 40 Q 20 30, 45 45 T 100 35" />
                    <path d="M0 20 Q 30 15, 60 25 T 100 15" />
                </svg>
            </div>

            {/* Bottom Left Floating Leaf */}
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 transform rotate-[80deg]">
                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <path d="M100 20 C140 60 170 100 100 180 C30 100 60 60 100 20 Z" />
                    <path d="M100 20 L100 180" />
                    <path d="M100 50 C125 70 135 95 145 105" />
                    <path d="M100 70 C75 95 65 115 55 125" />
                </svg>
            </div>
        </div>
    );
};

export default AgriWatermark;
