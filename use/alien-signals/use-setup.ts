import {useMemo, useState, useEffect, useRef} from 'react'
import {effectScope} from 'alien-signals'

export const useSetup = (value: () => any) => {
    const valueRef = useRef(value)
    const isFirstRender = useRef(true)
    const [setupValue, setSetupValue] = useState(value)

    useEffect(() => {
        const stop = effectScope(() => {
            const newSetupValue = valueRef.current()
            if (isFirstRender.current) {
                isFirstRender.current = false
            } else {
                setSetupValue(newSetupValue)
            }
        })

        return () => {
            stop()
        }
    }, [valueRef, isFirstRender])

    return setupValue
}