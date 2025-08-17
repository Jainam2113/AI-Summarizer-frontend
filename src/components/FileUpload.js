import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onTranscriptUpload, transcript, onSummaryGenerated, loading, setLoading }) => {
    const [customPrompt, setCustomPrompt] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            onTranscriptUpload(content);
        };
        reader.readAsText(file);
    };

    const handleTextareaChange = (e) => {
        onTranscriptUpload(e.target.value);
    };

    const generateSummary = async () => {
        if (!transcript.trim()) {
            alert('Please upload or enter a transcript first.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/summarize', {
                transcript,
                customPrompt: customPrompt.trim() || undefined
            });
            onSummaryGenerated(response.data.summary);
        } catch (error) {
            console.error('Error generating summary:', error);
            alert('Failed to generate summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass rounded-xl p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 1: Upload Transcript</h2>

            {/* File Drop Zone */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragActive
                        ? 'border-gray-400 bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept=".txt"
                    onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-gray-600 mb-2">
                        📄 Drop a text file here or click to browse
                    </div>
                    <div className="text-gray-500 text-sm">
                        Supports .txt files
                    </div>
                </label>
            </div>

            {/* Text Area */}
            <div className="mt-4">
                <label className="block text-gray-800 mb-2">Or paste your transcript:</label>
                <textarea
                    value={transcript}
                    onChange={handleTextareaChange}
                    placeholder="Paste your meeting transcript here..."
                    className="w-full h-32 p-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all duration-300"
                />
            </div>

            {/* Custom Prompt */}
            <div className="mt-4">
                <label className="block text-gray-800 mb-2">Custom Instructions (Optional):</label>
                <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., Summarize in bullet points for executives"
                    className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all duration-300"
                />
            </div>

            {/* Generate Button */}
            <button
                onClick={generateSummary}
                disabled={loading || !transcript.trim()}
                className={`mt-4 w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    loading || !transcript.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-800 text-white hover:bg-gray-900 hover:scale-105'
                }`}
            >
                {loading ? 'Generating Summary...' : 'Generate Summary'}
            </button>
        </div>
    );
};

export default FileUpload;