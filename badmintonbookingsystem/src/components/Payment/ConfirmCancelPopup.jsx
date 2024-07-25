import React from 'react';

const ConfirmCancelPopup = ({ title, message, onConfirm, onCancel, isVisible }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button 
                        onClick={onCancel} 
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
                        No
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="bg-red-500 text-white px-4 py-2 rounded">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCancelPopup;