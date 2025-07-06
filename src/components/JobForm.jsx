import axios from 'axios'
import React, { useState } from 'react'

// Custom event name for job submission
export const JOB_SUBMITTED_EVENT = 'job-submitted';

const JobForm = ({ darkMode }) => {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success"); // success, error

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && url.trim()) {
            submitJob();
        }
    };

    const submitJob = async () => {
        if (!url.trim()) return;
        
        setIsLoading(true);
        setMessage("");
        
        try {
            console.log("Submitting job to:", "/crawl");
            const res = await axios.post("/crawl", { url });
            console.log("Job submission response:", res);
            setMessageType("success");
            setMessage(`Job submitted successfully! ID: ${res.data.id.slice(0, 8)}`);
            setUrl("");
            
            // Dispatch a custom event to notify other components
            const jobSubmittedEvent = new CustomEvent(JOB_SUBMITTED_EVENT, { 
                detail: { job: res.data } 
            });
            window.dispatchEvent(jobSubmittedEvent);
        } catch (error) {
            console.error("Error submitting job:", error);
            setMessageType("error");
            setMessage(`Error: ${error.response?.status || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`flex-1 relative rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        className={`w-full py-3 pl-10 pr-4 block appearance-none focus:outline-none ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'}`}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter URL to crawl (e.g., https://example.com)"
                        type="url"
                        disabled={isLoading}
                    />
                </div>
                <button
                    className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'} ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    onClick={submitJob}
                    disabled={isLoading || !url.trim()}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                            </svg>
                            Start Crawling
                        </>
                    )}
                </button>
            </div>
            
            {message && (
                <div className={`p-4 rounded-lg ${messageType === "success" ? (darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800') : (darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800')}`}>
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            {messageType === "success" ? (
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobForm