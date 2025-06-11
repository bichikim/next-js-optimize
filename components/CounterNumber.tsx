import {Memo, useObservable} from '@legendapp/state/react'
import {$React} from '@legendapp/state/react-web'
import {StateProps} from './types'

/**
 * It just work with same solution as SolidJS Lol
 * @param param0
 * @returns
 */
export const CounterNumber = ({count$}: StateProps<{count$: number}>) => {

  const style$ = useObservable(() => ({
    backgroundColor: 'red',
    width: `${100 + count$.get() * 10}px`,
  }))
  
  return <$React.p $style={style$}><Memo>{count$}</Memo></$React.p>
}