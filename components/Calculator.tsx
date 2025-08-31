
import React, { useState, useCallback } from 'react';
import Button from './Button';
import { getPythonCalculation } from '../services/geminiService';
import type { CalculationResult } from '../types';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
    </div>
);

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleButtonClick = useCallback((value: string) => {
    setError(null);
    if (value === 'C') {
      setExpression('');
      setResult(null);
    } else if (value === '=') {
      if (expression.trim()) {
        calculate();
      }
    } else {
      setExpression(prev => prev + value);
    }
  }, [expression]);

  const calculate = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiResult = await getPythonCalculation(expression);
      setResult(apiResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const displayValue = expression || (result?.result) || '0';

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 space-y-4">
      {/* Display Screen */}
      <div className="bg-gray-900 rounded-lg p-4 text-right break-words h-28 flex flex-col justify-end">
        <div className="text-gray-400 text-xl min-h-[28px]">{expression || " "}</div>
        <div className="text-white text-4xl font-bold min-h-[40px]">
          {isLoading ? <span className="text-2xl text-cyan-400">Calculating...</span> : error ? <span className="text-red-400 text-lg">{error}</span> : result?.result || '0'}
        </div>
      </div>
      
      {/* Result Display */}
      {result && !isLoading && !error && (
        <div className="bg-gray-900 rounded-lg p-4 text-left space-y-2 animate-fade-in">
            <h3 className="text-sm font-semibold text-cyan-400">Python Code:</h3>
            <code className="bg-gray-700 text-white p-2 rounded-md block text-sm overflow-x-auto">
                {result.pythonCode}
            </code>
        </div>
      )}
      
      {isLoading && !error && (
         <div className="bg-gray-900 rounded-lg p-4 text-center">
             <LoadingSpinner />
         </div>
      )}


      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-4">
        <Button value="C" onClick={handleButtonClick} className="col-span-2 bg-red-500 hover:bg-red-400" ariaLabel="Clear" />
        <Button value="/" onClick={handleButtonClick} ariaLabel="Divide" />
        <Button value="*" onClick={handleButtonClick} ariaLabel="Multiply" />
        
        <Button value="7" onClick={handleButtonClick} />
        <Button value="8" onClick={handleButtonClick} />
        <Button value="9" onClick={handleButtonClick} />
        <Button value="-" onClick={handleButtonClick} ariaLabel="Subtract" />
        
        <Button value="4" onClick={handleButtonClick} />
        <Button value="5" onClick={handleButtonClick} />
        <Button value="6" onClick={handleButtonClick} />
        <Button value="+" onClick={handleButtonClick} ariaLabel="Add" />
        
        <Button value="1" onClick={handleButtonClick} />
        <Button value="2" onClick={handleButtonClick} />
        <Button value="3" onClick={handleButtonClick} />
        <Button value="=" onClick={handleButtonClick} className="row-span-2" ariaLabel="Equals" />
        
        <Button value="0" onClick={handleButtonClick} className="col-span-2" />
        <Button value="." onClick={handleButtonClick} />
      </div>
    </div>
  );
};

// Defined outside to prevent re-creation on every render
const MemoizedCalculator = React.memo(Calculator);
export default MemoizedCalculator;
