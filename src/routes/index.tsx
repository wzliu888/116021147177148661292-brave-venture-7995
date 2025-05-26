import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Calculator,
})

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
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

    setWaitingForNewValue(true)
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

  const clearAll = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const Button = ({ onClick, className, children }: {
    onClick: () => void
    className?: string
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-colors ${
        className || 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Calculator
        </h1>
        
        <div className="bg-gray-900 text-white text-right text-3xl font-mono p-4 rounded-lg mb-4 overflow-hidden">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clearAll} className="bg-red-500 hover:bg-red-600 text-white">
            C
          </Button>
          <Button onClick={() => {}} className="bg-gray-400 hover:bg-gray-500 text-white">
            ±
          </Button>
          <Button onClick={() => {}} className="bg-gray-400 hover:bg-gray-500 text-white">
            %
          </Button>
          <Button onClick={() => inputOperation('/')} className="bg-orange-500 hover:bg-orange-600 text-white">
            ÷
          </Button>

          <Button onClick={() => inputNumber('7')}>
            7
          </Button>
          <Button onClick={() => inputNumber('8')}>
            8
          </Button>
          <Button onClick={() => inputNumber('9')}>
            9
          </Button>
          <Button onClick={() => inputOperation('*')} className="bg-orange-500 hover:bg-orange-600 text-white">
            ×
          </Button>

          <Button onClick={() => inputNumber('4')}>
            4
          </Button>
          <Button onClick={() => inputNumber('5')}>
            5
          </Button>
          <Button onClick={() => inputNumber('6')}>
            6
          </Button>
          <Button onClick={() => inputOperation('-')} className="bg-orange-500 hover:bg-orange-600 text-white">
            −
          </Button>

          <Button onClick={() => inputNumber('1')}>
            1
          </Button>
          <Button onClick={() => inputNumber('2')}>
            2
          </Button>
          <Button onClick={() => inputNumber('3')}>
            3
          </Button>
          <Button onClick={() => inputOperation('+')} className="bg-orange-500 hover:bg-orange-600 text-white">
            +
          </Button>

          <Button onClick={() => inputNumber('0')} className="col-span-2">
            0
          </Button>
          <Button onClick={() => inputNumber('.')}>
            .
          </Button>
          <Button onClick={performCalculation} className="bg-orange-500 hover:bg-orange-600 text-white">
            =
          </Button>
        </div>
      </div>
    </div>
  )
}
