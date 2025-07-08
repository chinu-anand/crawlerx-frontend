import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import JobForm from './components/JobForm'
import JobList from './components/JobList'
import JobDetails from './components/JobDetails'

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check user preference or system preference
    return localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <header className={`py-4 px-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🕷️</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                CrawlerX
              </h1>
            </div>
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={
              <>
                <div className={`rounded-xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className="text-xl font-semibold mb-4">Start a New Crawl</h2>
                  <JobForm darkMode={darkMode} />
                </div>
                
                <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <JobList darkMode={darkMode} />
                </div>
              </>
            } />
            <Route path="/jobs/:id" element={<JobDetails darkMode={darkMode} />} />
          </Routes>
        </main>
      
        <footer className={`py-4 px-6 mt-12 text-center text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
          <div className="max-w-6xl mx-auto">
            <p>CrawlerX - Modern Web Crawler Dashboard © {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App