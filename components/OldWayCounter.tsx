'use client'
import {useState} from 'react'
import {OldWayCounterNumber} from './OldWayCounterNumber'

export const OldWayCounter = () => {
    const [count, setCount] = useState(0)

    const onIncrement = () => {
        setCount(count + 1)
    }

    return <div>
        <h2>Old Way Counter</h2>
        <OldWayCounterNumber count={count} onIncrement={onIncrement} />
    </div>
}