import {useState} from 'react'

export const OldWayCounterNumber = ({count, onIncrement}: {count: number, onIncrement: () => void}) => {
    const style = {
        backgroundColor: 'red',
        width: `${100 + count}px`,
    }
    return <div>
        <p style={style}>{count}</p>
        <button onClick={onIncrement}>Increment</button>
    </div>
}