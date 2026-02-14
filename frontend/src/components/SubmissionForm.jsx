import React, { useState } from 'react';
import { useGuestIdentity } from '../hooks/useGuestIdentity';
import SuccessModal from './SuccessModal';

const SubmissionForm = ({ onSubmit }) => {
    const guestId = useGuestIdentity();
    const [formData, setFormData] = useState({
        item_name: '',
        price: '',
        store_name: '',
        category: 'General'
    });
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Use username if provided, otherwise fallback to guestId
            const reportedBy = formData.username && formData.username.trim() !== '' ? formData.username : guestId;
            await onSubmit({ ...formData, reported_by: reportedBy });

            setFormData({ item_name: '', price: '', store_name: '', category: 'General', username: formData.username }); // Keep username for next submission
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting price:', error);
            alert('Failed to report price.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="cartoon-card p-4 sm:p-6 md:p-8 mb-8 relative overflow-hidden bg-[#F472B6]">
            {/* Shapes */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#FBCFE8] border-4 border-black rounded-full z-0"></div>

            <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 text-white flex items-center relative z-10 bg-[#F97316] border-3 border-black px-3 sm:px-4 py-2 rounded-lg shadow-[4px_4px_0px_#000] inline-block rotate-1">
                <span className="">Report Price</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
                <div>
                    <label className="block text-xs sm:text-sm font-bold text-black uppercase tracking-wider mb-2">Your Name (Optional)</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                        className="cartoon-input w-full text-sm sm:text-base"
                        placeholder="e.g. Ali"
                    />
                </div>
                <div>
                    <label className="block text-xs sm:text-sm font-bold text-black uppercase tracking-wider mb-2">Item Name</label>
                    <input
                        type="text"
                        name="item_name"
                        value={formData.item_name}
                        onChange={handleChange}
                        required
                        className="cartoon-input w-full text-sm sm:text-base"
                        placeholder="e.g. Milo 1KG"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                        <label className="block text-xs sm:text-sm font-bold text-black uppercase tracking-wider mb-2">Price (RM)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="cartoon-input w-full text-sm sm:text-base"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-bold text-black uppercase tracking-wider mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="cartoon-input w-full appearance-none cursor-pointer text-sm sm:text-base font-bold text-black bg-white"
                        >
                            <option value="General">General 📦</option>
                            <option value="Bakery">Bakery 🍞</option>
                            <option value="Meat">Meat & Seafood 🥩</option>
                            <option value="Dairy">Dairy & Eggs 🥛</option>
                            <option value="Produce">Produce 🍎</option>
                            <option value="Pantry">Pantry 🥫</option>
                            <option value="Beverages">Beverages 🥤</option>
                            <option value="Household">Household 🧼</option>
                            <option value="Personal Care">Personal Care 🧴</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-xs sm:text-sm font-bold text-black uppercase tracking-wider mb-2">Store Name</label>
                    <input
                        type="text"
                        name="store_name"
                        value={formData.store_name}
                        onChange={handleChange}
                        required
                        className="cartoon-input w-full text-sm sm:text-base"
                        placeholder="e.g. 99 Speedmart"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full cartoon-btn text-base sm:text-lg bg-[#8B5CF6] hover:bg-[#7C3AED] mt-4"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message="Your price report has been submitted! You're a true deal hunter! 🏹"
            />
        </div>
    );

};

export default SubmissionForm;
