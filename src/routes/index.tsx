import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
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
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Simple Calculator</h1>
        
        {/* Display */}
        <div className="bg-gray-900 text-white text-right text-2xl p-4 rounded mb-4 font-mono">
          {display}
        </div>
        
        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* First Row */}
          <button
            onClick={clear}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded font-semibold"
          >
            Clear
          </button>
          <button
            onClick={() => inputOperation('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded font-semibold"
          >
            ÷
          </button>
          <button
            onClick={() => inputOperation('*')}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded font-semibold"
          >
            ×
          </button>
          
          {/* Second Row */}
          <button
            onClick={() => inputNumber('7')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            9
          </button>
          <button
            onClick={() => inputOperation('-')}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded font-semibold"
          >
            −
          </button>
          
          {/* Third Row */}
          <button
            onClick={() => inputNumber('4')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            6
          </button>
          <button
            onClick={() => inputOperation('+')}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded font-semibold"
          >
            +
          </button>
          
          {/* Fourth Row */}
          <button
            onClick={() => inputNumber('1')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            3
          </button>
          <button
            onClick={performCalculation}
            className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded font-semibold"
          >
            =
          </button>
          
          {/* Fifth Row */}
          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            0
          </button>
          <button
            onClick={() => inputNumber('.')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded font-semibold"
          >
            .
          </button>
        </div>
      </div>
    </div>
  )
}
