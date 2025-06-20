import {useEffect, useState, memo, ReactNode, useRef} from 'react'
import {effectScope, effect} from 'alien-signals'
import {Signal} from './types'

export type MemoComponent= <T extends ReactNode>(props: {children: Signal<T>}) => ReactNode

/**
 * to Render Signal value for children
 */
export const Memo: MemoComponent = memo(function Children ({children}) {
    const childrenRef = useRef(children)
    const isFirstRender = useRef(true)
    const [value, setValue] = useState(children())

    useEffect(() => {
        const stop = effectScope(() => {
            effect(() => {
                const value = childrenRef.current()
                if (isFirstRender.current) {
                    isFirstRender.current = false
                } else {
                    setValue(value)
                }
            })
        })

        return () => {
            stop()
        }
    }, [children, isFirstRender, childrenRef])

    return <>{value}</>
})
