import React, { useState } from 'react'
import Count from './Count'
import { useDispatch } from 'react-redux'
import { increment, incrementByAmount } from './store/features/counterSlice';

const App = () => {
  const dispatch = useDispatch();

  const [count, setCount] = useState(0)

  // const handleIncrement = () => {
  //   setCount(prev => prev + 1)
  // }

  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleIncrementByAmount = () => {
    // console.log(incrementByAmount(10));
    
    dispatch(incrementByAmount(10))
  }

  const handleDecrementByAmount = () => {

  }
  
  return (
    <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleIncrementByAmount}>Increment By Amount</button>
        <button onClick={handleDecrementByAmount}>Decrement</button>
   
        <Count count={count}/>
    </div>
  )
}

export default App