import {createElement, JSX, ReactNode, useMemo, useEffect, useState, useRef} from 'react'
import {Signal, ReadonlySignal} from './types'
import {isSignal} from './signal'
import {effectScope, effect} from 'alien-signals'

export type MaybeSignalProps<T extends Record<string, any>> = {
    [K in keyof T]: ReadonlySignal<T[K]> | T[K]
}

export type DynamicElementComponent = <T extends keyof JSX.IntrinsicElements>(props: DynamicElementComponentProps<T>) => ReactNode

export type DynamicElementComponentProps<T extends keyof JSX.IntrinsicElements> = {
    children: ReactNode
    _as: T
} & MaybeSignalProps<JSX.IntrinsicElements[T]>


const getAllSignalsValue = (props: Record<string, Signal<any>>): Record<string, any> => {
    const signals: Record<string, any> = {}
    for (const [key, value] of Object.entries(props)) {
        signals[key] = value()
    }

    return signals
}

const getAllSignals = (props: Record<string, any>): [Record<string, Signal<any>>, Record<string, any>] => {
    const signals: Record<string, any> = {}
    const restProps: Record<string, any> = {}
    for (const [key, value] of Object.entries(props)) {
        if (isSignal(value)) {
            signals[key] = value
        } else {
            restProps[key] = value
        }
    }

    return [signals, restProps]
}

export const DynamicElement: DynamicElementComponent = ({children, _as, ...props}) => {
    const isFirstRender = useRef(true)

    const [reactiveArgs, restProps]: [Record<string, Signal<any>>, Record<string, any>] = useMemo(() => {
        return getAllSignals(props)
        
        // run only once
    }, [])


    const [args, setArgs] = useState<Record<string, any>>(getAllSignalsValue(reactiveArgs))

    useEffect(() => {
        const stop = effectScope(() => {
            effect(() => {
                setArgs(getAllSignalsValue(reactiveArgs))
            })
        })

        return () => {
            stop()
        }
    }, [reactiveArgs, isFirstRender])

    isFirstRender.current = false

    return createElement(_as, { ...args}, children)
}
