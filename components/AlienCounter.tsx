'use client'

import {useSignal} from '@/use/alien-signals/use-signal'
import {AlienCounterNumber} from './AlienCounterNumber'
import {useState} from 'react'

export const AlienCounter = () => {
    const count = useSignal(0)

    const [actions] = useState({
        increment: () => count(count() + 1),
    })

    return <div>
        <h2>Alien Counter</h2>
        <AlienCounterNumber count$={count} />
        <button onClick={actions.increment}>Increment</button>
    </div>
}