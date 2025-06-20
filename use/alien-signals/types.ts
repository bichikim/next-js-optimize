import {ReactElement} from 'react'

export const SIGNAL_MARKER = Symbol('signal-marker')

export type ReactNode = ReactElement | string | number | boolean | null | undefined

export interface Signal<T> {
    // getter
    (): T
    // setter
    (value: T): void
    readonly [SIGNAL_MARKER]: true
}

export interface ReadonlySignal<T> {
    (): T
    readonly [SIGNAL_MARKER]: true
}