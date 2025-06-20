import {ReactNode, createElement} from 'react'
import {Signal} from './types'
import {Memo} from './Memo'

export const MemoElement = ({children}: {children: Signal<ReactNode>}) => {
    return <Memo>{children}</Memo>
}