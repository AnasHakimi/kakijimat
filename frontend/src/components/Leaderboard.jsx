import React from 'react';

const Leaderboard = ({ heroes, className = "" }) => {
    return (
        <div className={`cartoon-card p-4 sm:p-6 bg-[#FBBF24] ${className}`}>
            <h2 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 text-white flex items-center bg-[#10B981] border-2 border-black px-3 sm:px-4 py-2 rounded-lg shadow-[4px_4px_0px_#000] inline-block -rotate-1">
                <span className="">Top Hunters</span>
            </h2>
            {/* Scrollable container */}
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <ul className="space-y-2 sm:space-y-3">
                    {heroes.map((hero, index) => {
                        // Determine if this is top 3
                        const isTopThree = index < 3;

                        // Color scheme for top 3 - different pastel colors in same tone
                        let bgColor, badgeColor;
                        if (index === 0) {
                            bgColor = 'bg-[#FEF3C7]'; // Light gold/yellow
                            badgeColor = 'bg-[#A7F3D0]'; // Green
                        } else if (index === 1) {
                            bgColor = 'bg-[#E0E7FF]'; // Light indigo/silver
                            badgeColor = 'bg-[#A7F3D0]'; // Green
                        } else if (index === 2) {
                            bgColor = 'bg-[#FFEDD5]'; // Light orange/bronze
                            badgeColor = 'bg-[#A7F3D0]'; // Green
                        } else {
                            bgColor = 'bg-gray-100';
                            badgeColor = 'bg-gray-300';
                        }

                        const borderColor = 'border-black';
                        const shadowColor = isTopThree ? 'shadow-[4px_4px_0px_#000]' : 'shadow-[3px_3px_0px_#000]';

                        return (
                            <li key={index} className={`flex justify-between items-center ${bgColor} p-3 sm:p-4 rounded-xl border-2 ${borderColor} ${shadowColor} hover:translate-x-1 transition-all duration-200`}>
                                <div className="flex items-center">
                                    <div className={`flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-black font-black mr-3 sm:mr-4 border-2 border-black text-sm sm:text-base
                                        ${index === 0 ? 'bg-[#FCD34D]' :
                                            index === 1 ? 'bg-[#D1D5DB]' :
                                                index === 2 ? 'bg-[#FB923C]' :
                                                    'bg-gray-300'}`}>
                                        {index + 1}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm sm:text-base font-bold text-black truncate w-24 sm:w-32" title={hero.reported_by}>
                                            {hero.reported_by.startsWith('Guest-') ? `Guest-${hero.reported_by.slice(6, 9)}` : hero.reported_by}
                                        </span>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Scout</span>
                                    </div>
                                </div>
                                <span className={`text-xs sm:text-sm font-black text-black ${badgeColor} px-2 sm:px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]`}>
                                    {hero.total_reports} pts
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Leaderboard;
