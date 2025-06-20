import {Signal, SIGNAL_MARKER} from './types'
import {signal as _signal} from 'alien-signals'

const markedSignal = <T>(initialValue: T): Signal<T> => {
    const signalValue: any = _signal(initialValue)

    signalValue[SIGNAL_MARKER] = true

    return signalValue
}

export const signal = markedSignal

export const isSignal = (value: any): value is Signal<any> => {
    return value && value[SIGNAL_MARKER]
}
