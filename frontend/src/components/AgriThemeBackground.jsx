import React from 'react';

const AgriThemeBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden bg-[#051c0e]">
            {/* Full screen crop field background image */}
            <img
                src="/bg-agri.png"
                alt="Krishi Saathi Background"
                className="w-full h-full object-cover brightness-[0.42] transition-all duration-500"
            />
            {/* Elegant overlay: dark forest green gradients to merge elements smoothly and maintain high contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#051c0e]/30 via-[#051c0e]/60 to-[#051c0e]/85 backdrop-blur-[1px]"></div>
            
            {/* Soft decorative green and gold radial glows */}
            <div className="absolute top-[15vh] left-[10%] w-[35rem] h-[35rem] rounded-full bg-emerald-500/[0.05] blur-[130px] pointer-events-none"></div>
            <div className="absolute bottom-[10vh] right-[10%] w-[30rem] h-[30rem] rounded-full bg-amber-500/[0.04] blur-[120px] pointer-events-none"></div>
        </div>
    );
};

export default AgriThemeBackground;
