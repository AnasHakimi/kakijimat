import React from 'react';
import SubmissionForm from '../components/SubmissionForm';

const SubmitPage = ({ onSubmit }) => {
    return (
        <div className="max-w-2xl mx-auto pt-4 lg:pt-16 animate-fade-in">
            <div className="text-center mb-6 lg:mb-10 hidden lg:block">
                <h2 className="text-4xl font-bold text-white mb-4">Contribute Data</h2>
                <p className="text-indigo-300">Help the community by reporting price changes in your area.</p>
            </div>
            <SubmissionForm onSubmit={onSubmit} />
        </div>
    );
};

export default SubmitPage;
