import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { JOB_SUBMITTED_EVENT } from './JobForm'

const JobList = ({ darkMode }) => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    
    useEffect(() => {
        fetchJobs();
        
        const base = import.meta.env.VITE_API_URL;
        const ws = new WebSocket(`${base.replace(/^http/, 'ws')}/api/v1/ws`);
        console.log("Connecting to WebSocket:", ws.url);

        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            console.log("WebSocket message received:", msg);
            
            if (msg.id && msg.status) {
                console.log(`Updating job ${msg.id} status to ${msg.status}`);
                fetchJobs();
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            setConnectionStatus('error');
        };

        ws.onopen = () => {
            console.log("WebSocket connection established");
            setConnectionStatus('connected');
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            setConnectionStatus('disconnected');
        };
        
        const handleJobSubmitted = (event) => {
            console.log("Job submitted event received:", event.detail);
            fetchJobs();
        };
        
        window.addEventListener(JOB_SUBMITTED_EVENT, handleJobSubmitted);

        return () => {
            ws.close();
            window.removeEventListener(JOB_SUBMITTED_EVENT, handleJobSubmitted);
        };
    }, [])

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/jobs");
            console.log("Jobs fetched:", res.data);
            setJobs(res.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Filter jobs based on search query and status filter
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            // Filter by search query (case insensitive)
            const matchesSearch = searchQuery === '' || 
                job.URL.toLowerCase().includes(searchQuery.toLowerCase()) || 
                job.ID.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Filter by status
            const matchesStatus = filterStatus === 'all' || job.Status === filterStatus;
            
            return matchesSearch && matchesStatus;
        });
    }, [jobs, searchQuery, filterStatus]);
    
    // Clear filters
    const clearFilters = () => {
        setSearchQuery('');
        setFilterStatus('all');
    };

    const getStatusBadgeClasses = (status) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        
        if (darkMode) {
            switch (status) {
                case "done":
                    return `${baseClasses} bg-green-900/30 text-green-300`;
                case "failed":
                    return `${baseClasses} bg-red-900/30 text-red-300`;
                default:
                    return `${baseClasses} bg-yellow-900/30 text-yellow-300`;
            }
        } else {
            switch (status) {
                case "done":
                    return `${baseClasses} bg-green-100 text-green-800`;
                case "failed":
                    return `${baseClasses} bg-red-100 text-red-800`;
                default:
                    return `${baseClasses} bg-yellow-100 text-yellow-800`;
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Crawl Jobs</h2>
                <div className="flex items-center">
                    <div className={`mr-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {connectionStatus === 'connected' && (
                            <span className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                                Live updates active
                            </span>
                        )}
                        {connectionStatus === 'connecting' && (
                            <span className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse mr-1.5"></span>
                                Connecting...
                            </span>
                        )}
                        {(connectionStatus === 'disconnected' || connectionStatus === 'error') && (
                            <span className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-red-400 mr-1.5"></span>
                                Disconnected
                            </span>
                        )}
                    </div>
                    <button 
                        onClick={fetchJobs}
                        className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
                        title="Refresh jobs"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Search and filter section */}
            <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search input */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by URL or ID"
                            className={`w-full pl-10 pr-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'} border focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'}`}
                        />
                    </div>
                    
                    {/* Status filter */}
                    <div className="sm:w-48">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className={`w-full py-2 px-3 rounded-md appearance-none ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'}`}
                        >
                            <option value="all">All Statuses</option>
                            <option value="done">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                    
                    {/* Clear filters button */}
                    {(searchQuery || filterStatus !== 'all') && (
                        <button
                            onClick={clearFilters}
                            className={`px-4 py-2 rounded-md text-sm ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
                
                {/* Search results count */}
                <div className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {searchQuery || filterStatus !== 'all' ? (
                        <span>
                            Found <span className="font-medium">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'} matching your filters
                            {filteredJobs.length !== jobs.length && (
                                <span> (out of {jobs.length} total)</span>
                            )}
                        </span>
                    ) : (
                        <span>Showing all {jobs.length} jobs</span>
                    )}
                </div>
            </div>
            
            {isLoading && jobs.length === 0 ? (
                <div className={`flex justify-center items-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <svg className="animate-spin h-8 w-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading jobs...</span>
                </div>
            ) : filteredJobs.length === 0 && jobs.length > 0 ? (
                <div className={`text-center py-12 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <p className="text-lg font-medium">No matching jobs found</p>
                    <p className="mt-1">Try adjusting your search filters</p>
                </div>
            ) : jobs.length === 0 ? (
                <div className={`text-center py-12 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">No crawl jobs yet</p>
                    <p className="mt-1">Submit a URL above to start crawling</p>
                </div>
            ) : (
                <div className={`overflow-hidden shadow ring-1 ${darkMode ? 'ring-gray-700 bg-gray-800' : 'ring-gray-200 bg-white'} rounded-lg`}>
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                            <tr>
                                <th scope="col" className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'} sm:pl-6`}>ID</th>
                                <th scope="col" className={`px-3 py-3.5 text-left text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>URL</th>
                                <th scope="col" className={`px-3 py-3.5 text-left text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Status</th>
                                <th scope="col" className={`px-3 py-3.5 text-left text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                            {filteredJobs.map((job) => (
                                <tr key={job.ID} className={darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}>
                                    <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'} sm:pl-6`}>
                                        <span className="font-mono">{job.ID.slice(0, 8)}</span>
                                    </td>
                                    <td className={`whitespace-nowrap px-3 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                            <span className="truncate max-w-xs">{job.URL}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        <span className={getStatusBadgeClasses(job.Status)}>
                                            {job.Status === "done" && (
                                                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                                                    <circle cx="4" cy="4" r="3" />
                                                </svg>
                                            )}
                                            {job.Status === "failed" && (
                                                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                                                    <circle cx="4" cy="4" r="3" />
                                                </svg>
                                            )}
                                            {job.Status !== "done" && job.Status !== "failed" && (
                                                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 8 8">
                                                    <circle cx="4" cy="4" r="3" />
                                                </svg>
                                            )}
                                            {job.Status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        <div className="flex space-x-2">
                                            <a
                                                className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${darkMode ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                                                href={`/jobs/export/${job.ID}?format=json`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                JSON
                                            </a>
                                            <a
                                                className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${darkMode ? 'bg-green-900/30 text-green-300 hover:bg-green-800/50' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                                                href={`/jobs/export/${job.ID}?format=csv`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                CSV
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default JobList