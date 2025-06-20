import {useMemo} from 'react'
import {ReadonlySignal} from './types'
import {computed} from './computed'

export const useComputed = <T>(value: () => T): ReadonlySignal<T> => {
    return useMemo(() => {
        return computed(value)
    }, []) as ReadonlySignal<T>
}