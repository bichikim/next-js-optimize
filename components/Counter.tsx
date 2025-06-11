'use client'

import {useObservable, Memo} from '@legendapp/state/react'
import {useState} from 'react'
import {CounterNumber} from './CounterNumber'

export const Counter = () => {
    const state$ = useObservable(0)

    // Put all fixed elements that are not related to the rendering loop here.
   const [actions] = useState({
    increment: () => state$.set(state$.get() + 1),
   })


  return <div>
    <h2>Counter</h2>
    <CounterNumber count$={state$} />
    <button onClick={actions.increment}>Increment</button>
  </div>
}