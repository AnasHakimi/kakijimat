import React from 'react';

const SuccessModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div className="cartoon-card bg-[#FFF] p-8 max-w-sm w-full relative z-10 border-4 border-black shadow-[8px_8px_0px_#000] animate-pop-in text-center flex flex-col items-center">

                <h3 className="text-2xl sm:text-3xl font-black text-black mb-2 uppercase leading-tight">
                    Success!
                </h3>
                <p className="text-gray-600 font-bold mb-6">
                    {message || 'Your price report has been submitted to the community.'}
                </p>

                <button
                    onClick={onClose}
                    className="cartoon-btn bg-[#FBBF24] text-lg px-8 py-3 w-full hover:translate-y-[-4px] active:translate-y-[0px] transition-all"
                >
                    AWESOME!
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
