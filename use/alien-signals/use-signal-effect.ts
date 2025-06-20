import {effectScope, effect} from 'alien-signals'
import {useEffect, useRef, useMemo} from 'react'

export const useSignalEffect = (value: () => void) => {
    // avoid strict mode re-render
    const isFirstRender = useRef(true)
    const stopRef = useRef<() => void>(() => {})
    const valueRef = useRef(value)
    
    useEffect(() => {
        if (isFirstRender.current) {
            stopRef.current = effectScope(() => {
                effect(valueRef.current)
            })
            isFirstRender.current = false
            
        }
        return () => {
            stopRef.current()
        }
    }, [stopRef, isFirstRender, valueRef])
}