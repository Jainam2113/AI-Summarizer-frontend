import React, { useState } from 'react';

const SummaryEditor = ({ summary, onSummaryEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSummary, setEditedSummary] = useState(summary);

    const handleSave = () => {
        onSummaryEdit(editedSummary);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedSummary(summary);
        setIsEditing(false);
    };

    return (
        <div className="glass rounded-xl p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Step 2: Review & Edit Summary</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-300 border border-gray-300"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            {isEditing ? (
                <div>
          <textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="w-full h-64 p-4 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all duration-300"
          />
                    <div className="flex space-x-2 mt-4">
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <pre className="text-gray-800 whitespace-pre-wrap font-sans">{summary}</pre>
                </div>
            )}
        </div>
    );
};

export default SummaryEditor;