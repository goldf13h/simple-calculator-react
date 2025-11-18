import React, { useState } from 'react'

function safeEvaluate(expr) {
  if (!expr) return ''
  const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/')
  if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) return 'Error'
  try {
    // small safe eval: only numbers/operators/parentheses allowed
    // eslint-disable-next-line no-new-func
    const res = Function('"use strict";return (' + sanitized + ')')()
    if (res === Infinity || res === -Infinity || Number.isNaN(res)) return 'Error'
    return String(res)
  } catch (e) {
    return 'Error'
  }
}

export default function App() {
  const [expr, setExpr] = useState('')
  const [result, setResult] = useState('')

  const append = (v) => {
    if (result && /^[0-9.]/.test(v)) {
      setExpr(v)
      setResult('')
    } else {
      setExpr((s) => s + v)
    }
  }

  const clear = () => {
    setExpr('')
    setResult('')
  }

  const backspace = () => setExpr((s) => s.slice(0, -1))

  const compute = () => {
    const res = safeEvaluate(expr)
    setResult(res)
  }

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expr || '0'}</div>
        <div className="result">{result ? `= ${result}` : ''}</div>
      </div>

      <div className="keys">
        <button className="span2" onClick={clear}>C</button>
        <button onClick={backspace}>⌫</button>
        <button onClick={() => append('÷')}>÷</button>

        <button onClick={() => append('7')}>7</button>
        <button onClick={() => append('8')}>8</button>
        <button onClick={() => append('9')}>9</button>
        <button onClick={() => append('×')}>×</button>

        <button onClick={() => append('4')}>4</button>
        <button onClick={() => append('5')}>5</button>
        <button onClick={() => append('6')}>6</button>
        <button onClick={() => append('-')}>-</button>

        <button onClick={() => append('1')}>1</button>
        <button onClick={() => append('2')}>2</button>
        <button onClick={() => append('3')}>3</button>
        <button onClick={() => append('+')}>+</button>

        <button className="span2" onClick={() => append('0')}>0</button>
        <button onClick={() => append('.')}>.</button>
        <button className="equals" onClick={compute}>=</button>
      </div>
    </div>
  )
}
