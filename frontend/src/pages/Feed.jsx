import React from 'react';
import PriceFeed from '../components/PriceFeed';

const FeedPage = ({ prices }) => {
    return (
        <div className="max-w-5xl mx-auto pt-4 lg:pt-12 animate-fade-in">
            <div className="mb-4 lg:mb-8 text-center hidden lg:block">
                <h2 className="text-4xl font-bold text-white mb-2">Live Market Feed</h2>
                <p className="text-indigo-300">Real-time prices reported by the community</p>
            </div>
            <PriceFeed prices={prices} />
        </div>
    );
};

export default FeedPage;
