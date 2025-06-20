import {useMemo, useEffect} from 'react'
import {signal} from './signal'


export const useSignal = <T>(initialValue: T) => {
    const signalValue = useMemo(() => signal(initialValue), [])

    return signalValue
}

