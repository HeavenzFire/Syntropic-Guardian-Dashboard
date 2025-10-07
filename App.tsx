import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <div className="container mx-auto p-4">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </div>
  );
}

export default App;
