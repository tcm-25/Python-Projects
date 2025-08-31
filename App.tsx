
import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-mono p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">Gemini Python Calculator</h1>
        <p className="text-gray-400 mt-2">Enter a math expression and see the Python code behind it.</p>
      </header>
      <main>
        <Calculator />
      </main>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
