import {Signal} from '@/use/alien-signals/types'
import {Memo} from '@/use/alien-signals/Memo'
import {Element} from '@/use/alien-signals/WithDynamic'
import {useComputed} from '@/use/alien-signals/use-computed'

export const AlienCounterNumber = ({count$}: {count$: Signal<number>}) => {
    const style = useComputed(() => ({
        backgroundColor: 'red',
        width: `${100 + count$() * 10}px`,
    }))

    return <div>
        <h3>Alien Counter Number</h3>
        <Element.p style={style}><Memo>{count$}</Memo></Element.p>
    </div>
}