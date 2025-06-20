import {ReadonlySignal, SIGNAL_MARKER} from './types'
import {computed as _computed} from 'alien-signals'

const markedComputed = <T>(value: () => T): ReadonlySignal<T> => {
    const computedValue: any = _computed(value)

    computedValue[SIGNAL_MARKER] = true

    return computedValue
}

export const computed = markedComputed