import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobDetails = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                setLoading(true);
                // Fetch job details from API
                const res = await axios.get(`/jobs/${id}`);
                console.log("Job details:", res.data);
                setJob(res.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching job details:", err);
                setError(`Failed to load job details: ${err.response?.status || err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const getStatusColor = (status) => {
        if (darkMode) {
            switch (status) {
                case "done":
                    return "text-green-300 bg-green-900/30";
                case "failed":
                    return "text-red-300 bg-red-900/30";
                default:
                    return "text-yellow-300 bg-yellow-900/30";
            }
        } else {
            switch (status) {
                case "done":
                    return "text-green-800 bg-green-100";
                case "failed":
                    return "text-red-800 bg-red-100";
                default:
                    return "text-yellow-800 bg-yellow-100";
            }
        }
    };

    if (loading) {
        return (
            <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-3 mb-6">
                    <button 
                        onClick={handleGoBack}
                        className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold">Job Details</h2>
                </div>
                <div className="flex justify-center items-center py-12">
                    <svg className="animate-spin h-8 w-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading job details...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-3 mb-6">
                    <button 
                        onClick={handleGoBack}
                        className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold">Job Details</h2>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'}`}>
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        onClick={handleGoBack}
                        className={`px-4 py-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    >
                        Return to Job List
                    </button>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-3 mb-6">
                    <button 
                        onClick={handleGoBack}
                        className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold">Job Details</h2>
                </div>
                <div className="text-center py-8">
                    <p>Job not found</p>
                    <button
                        onClick={handleGoBack}
                        className={`mt-4 px-4 py-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    >
                        Return to Job List
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Header with back button */}
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                    <button 
                        onClick={handleGoBack}
                        className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
                        aria-label="Go back"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold">Job Details</h2>
                    <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.Status)}`}>
                        {job.Status === "done" && (
                            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400 inline" fill="currentColor" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="3" />
                            </svg>
                        )}
                        {job.Status === "failed" && (
                            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400 inline" fill="currentColor" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="3" />
                            </svg>
                        )}
                        {job.Status !== "done" && job.Status !== "failed" && (
                            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-yellow-400 animate-pulse inline" fill="currentColor" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="3" />
                            </svg>
                        )}
                        {job.Status}
                    </span>
                </div>
            </div>
            
            {/* Job summary */}
            <div className="p-6">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                    <div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Job ID</h3>
                        <p className="mt-1 font-mono">{job.ID}</p>
                    </div>
                    <div>
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Created At</h3>
                        <p className="mt-1">{new Date(job.CreatedAt).toLocaleString()}</p>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>URL</h3>
                        <div className="mt-1 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <a 
                                href={job.URL} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                            >
                                {job.URL}
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="border-b mb-6">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'overview'
                                    ? `${darkMode ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600'}`
                                    : `${darkMode ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('results')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'results'
                                    ? `${darkMode ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600'}`
                                    : `${darkMode ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                            }`}
                        >
                            Results
                        </button>
                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'logs'
                                    ? `${darkMode ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600'}`
                                    : `${darkMode ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                            }`}
                        >
                            Logs
                        </button>
                    </nav>
                </div>
                
                {/* Tab content */}
                <div className="pb-6">
                    {activeTab === 'overview' && (
                        <div>
                            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                                <h3 className="text-lg font-medium mb-4">Crawl Summary</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
                                        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Title</h4>
                                        <p className="text-lg font-semibold mt-1 line-clamp-2">{job.Title || 'N/A'}</p>
                                    </div>
                                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
                                        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Links Found</h4>
                                        <p className="text-2xl font-semibold mt-1">{job.Links?.length || 0}</p>
                                    </div>
                                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
                                        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</h4>
                                        <p className="text-xl font-semibold mt-1 capitalize">{job.Status || 'N/A'}</p>
                                    </div>
                                </div>
                                
                                <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
                                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Description</h4>
                                    <p className="mt-1">{job.Description || 'No description available'}</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <a
                                    href={`/jobs/export/${job.ID}?format=json`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Export as JSON
                                </a>
                                <a
                                    href={`/jobs/export/${job.ID}?format=csv`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center ${darkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Export as CSV
                                </a>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'results' && (
                        <div>
                            <div className="mb-4 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Links Found</h3>
                                <div className="flex space-x-2">
                                    <button
                                        className={`px-3 py-1 rounded text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                                    >
                                        Filter
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                                    >
                                        Sort
                                    </button>
                                </div>
                            </div>
                            
                            {job.Links && job.Links.length > 0 ? (
                                <div className={`overflow-hidden shadow ring-1 ${darkMode ? 'ring-gray-700' : 'ring-gray-200'} rounded-lg`}>
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                                            <tr>
                                                <th scope="col" className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'} sm:pl-6`}>Link URL</th>
                                                <th scope="col" className={`px-3 py-3.5 text-left text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                            {job.Links.map((link, index) => {
                                                const isExternal = link.startsWith('http');
                                                const displayUrl = link.length > 60 ? link.substring(0, 57) + '...' : link;
                                                
                                                return (
                                                    <tr key={index} className={darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}>
                                                        <td className={`py-4 pl-4 pr-3 text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'} sm:pl-6`}>
                                                            <a 
                                                                href={isExternal ? link : `${job.URL.split('/').slice(0, 3).join('/')}${link}`} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                                                            >
                                                                {displayUrl}
                                                            </a>
                                                        </td>
                                                        <td className={`px-3 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isExternal ? 
                                                                (darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800') : 
                                                                (darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800')}`}
                                                            >
                                                                {isExternal ? 'External' : 'Internal'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className={`text-center py-12 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-lg font-medium">No results available</p>
                                    {job.Status === 'pending' && (
                                        <p className="mt-1">The job is still in progress</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {activeTab === 'logs' && (
                        <div>
                            <h3 className="text-lg font-medium mb-4">Crawl Details</h3>
                            <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Created At</h4>
                                        <p className="mt-1">{new Date(job.CreatedAt).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Updated At</h4>
                                        <p className="mt-1">{new Date(job.UpdatedAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                
                                {job.Error && (
                                    <div className="mt-4">
                                        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Errors</h4>
                                        <div className={`mt-1 p-3 rounded ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'}`}>
                                            {job.Error}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-4">Raw Data</h3>
                                <div className={`rounded-lg p-4 font-mono text-sm ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'} overflow-auto max-h-96`}>
                                    <pre>{JSON.stringify(job, null, 2)}</pre>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
