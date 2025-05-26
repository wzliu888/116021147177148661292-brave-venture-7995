import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const clearDisplay = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Calculator</h1>
        
        <div className="bg-gray-900 text-white text-right p-4 rounded mb-4 text-xl font-mono">
          {display}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <button onClick={clearDisplay} className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Clear</button>
          <button onClick={() => inputOperation('/')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">÷</button>
          <button onClick={() => inputOperation('*')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">×</button>
          
          {[7, 8, 9].map(num => (
            <button key={num} onClick={() => inputNumber(num)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">{num}</button>
          ))}
          <button onClick={() => inputOperation('-')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">-</button>
          
          {[4, 5, 6].map(num => (
            <button key={num} onClick={() => inputNumber(num)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">{num}</button>
          ))}
          <button onClick={() => inputOperation('+')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">+</button>
          
          {[1, 2, 3].map(num => (
            <button key={num} onClick={() => inputNumber(num)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">{num}</button>
          ))}
          <button onClick={performCalculation} className="row-span-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">=</button>
          
          <button onClick={() => inputNumber(0)} className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">0</button>
          <button onClick={() => inputNumber('.')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">.</button>
        </div>
      </div>
    </div>
  )
}
