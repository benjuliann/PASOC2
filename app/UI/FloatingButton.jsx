import React from 'react';

export function FloatingButton() {
    return (
        <button className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-green-700 border-4 border-green-600 flex items-center justify-center shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
            <div className="w-6 h-6 rounded-full">
                <span className="text-white text-lg">?</span>
            </div>
        </button>
    );
};