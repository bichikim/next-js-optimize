import {useEffect, useState, memo, ReactNode} from 'react'
import {effectScope, effect} from 'alien-signals'
import {Signal} from './types'

export type MemoComponent= <T extends ReactNode>(props: {children: Signal<T>}) => ReactNode

export const Memo: MemoComponent = memo(function Memo ({children}) {
    const [value, setValue] = useState(children())

    useEffect(() => {
        const stop = effectScope(() => {
            effect(() => {
              setValue(children())
            })
        })

        return () => {
            stop()
        }
    }, [children])

    return <>{value}</>
})
