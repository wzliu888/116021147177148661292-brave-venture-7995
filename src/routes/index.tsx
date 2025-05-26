import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Calculator,
})

function Calculator() {
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

  const calculate = (first: number, second: number, operation: string): number => {
    switch (operation) {
      case '+':
        return first + second
      case '-':
        return first - second
      case '*':
        return first * second
      case '/':
        return first / second
      default:
        return second
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

  const Button = ({ onClick, className, children, ...props }: {
    onClick: () => void
    className?: string
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-colors ${
        className || 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      }`}
      {...props}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Calculator</h1>
        
        <div className="mb-4">
          <div className="bg-gray-900 text-white text-right p-4 rounded-lg text-3xl font-mono">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clear} className="col-span-2 bg-red-500 hover:bg-red-600 text-white">
            Clear
          </Button>
          <Button onClick={() => inputOperation('/')} className="bg-blue-500 hover:bg-blue-600 text-white">
            ÷
          </Button>
          <Button onClick={() => inputOperation('*')} className="bg-blue-500 hover:bg-blue-600 text-white">
            ×
          </Button>

          <Button onClick={() => inputNumber('7')}>7</Button>
          <Button onClick={() => inputNumber('8')}>8</Button>
          <Button onClick={() => inputNumber('9')}>9</Button>
          <Button onClick={() => inputOperation('-')} className="bg-blue-500 hover:bg-blue-600 text-white">
            -
          </Button>

          <Button onClick={() => inputNumber('4')}>4</Button>
          <Button onClick={() => inputNumber('5')}>5</Button>
          <Button onClick={() => inputNumber('6')}>6</Button>
          <Button onClick={() => inputOperation('+')} className="bg-blue-500 hover:bg-blue-600 text-white">
            +
          </Button>

          <Button onClick={() => inputNumber('1')}>1</Button>
          <Button onClick={() => inputNumber('2')}>2</Button>
          <Button onClick={() => inputNumber('3')}>3</Button>
          <Button onClick={performCalculation} className="row-span-2 bg-green-500 hover:bg-green-600 text-white">
            =
          </Button>

          <Button onClick={() => inputNumber('0')} className="col-span-2">0</Button>
          <Button onClick={() => inputNumber('.')}>.</Button>
        </div>
      </div>
    </div>
  )
}
