
import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};

export default App;
