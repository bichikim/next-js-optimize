import {render} from 'vitest-browser-react'
import {Memo} from './Memo'
import {describe, it, expect} from 'vitest'
import {signal} from './signal'
import {useState} from 'react'
import {useSignal} from './use-signal'

describe('Memo', () => {
    it('should render', async() => {
        const children = signal('Hello')
        const {getByText,} = render(<Memo>{children}</Memo>)
        
        await expect.element(getByText('Hello')).toBeInTheDocument()

        children('Hello World')

        await expect.element(getByText('Hello World')).toBeInTheDocument()
    })

})

describe('Memo re-render', () => {
    it('should not re-render when parent re-render', async() => {
        const Parent = () => {
            const [count, setCount] = useState(0)
            const countSignal = useSignal(count)

            return <div>
                <span>{count}</span>
                <Memo>{countSignal}</Memo><br/ >
                <button onClick={() => setCount(count + 1)}>Increment1</button>
                <button onClick={() => countSignal(countSignal() + 1)}>Increment2</button>
            </div>
        }
        const {getByText,} = render(<Parent />)
        
        await expect.element(getByText('00')).toBeInTheDocument()

        await getByText('Increment1').click()

        await expect.element(getByText('10')).toBeInTheDocument()

        await getByText('Increment2').click()

        await expect.element(getByText('11')).toBeInTheDocument()
    })
})