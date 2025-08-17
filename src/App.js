import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import SummaryEditor from './components/SummaryEditor';
import EmailSharer from './components/EmailSharer';

function App() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleTranscriptUpload = (uploadedTranscript) => {
    setTranscript(uploadedTranscript);
    setCurrentStep(2);
  };

  const handleSummaryGenerated = (generatedSummary) => {
    setSummary(generatedSummary);
    setCurrentStep(3);
  };

  const handleSummaryEdit = (editedSummary) => {
    setSummary(editedSummary);
  };

  const reset = () => {
    setTranscript('');
    setSummary('');
    setCurrentStep(1);
  };

  return (
      <div className="min-h-screen p-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              AI Meeting Summarizer
            </h1>
            <p className="text-gray-600 text-lg">
              Upload, Summarize, Edit & Share your meeting notes
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            currentStep >= step
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                        <div
                            className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                                currentStep > step ? 'bg-gray-800' : 'bg-gray-200'
                            }`}
                        />
                    )}
                  </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {currentStep >= 1 && (
                <div className="animate-slide-up">
                  <FileUpload
                      onTranscriptUpload={handleTranscriptUpload}
                      transcript={transcript}
                      onSummaryGenerated={handleSummaryGenerated}
                      loading={loading}
                      setLoading={setLoading}
                  />
                </div>
            )}

            {currentStep >= 3 && summary && (
                <div className="animate-slide-up">
                  <SummaryEditor
                      summary={summary}
                      onSummaryEdit={handleSummaryEdit}
                  />
                </div>
            )}

            {currentStep >= 3 && summary && (
                <div className="animate-slide-up">
                  <EmailSharer summary={summary} />
                </div>
            )}
          </div>

          {/* Reset Button */}
          {currentStep > 1 && (
              <div className="text-center mt-8">
                <button
                    onClick={reset}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-300 border border-gray-300"
                >
                  Start Over
                </button>
              </div>
          )}
        </div>
      </div>
  );
}

export default App;