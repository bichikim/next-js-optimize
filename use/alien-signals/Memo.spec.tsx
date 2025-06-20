/**
 * @vitest-environment jsdom
 */
import {render, screen, act} from '@testing-library/react'
import {Memo} from './Memo'
import {describe, it, expect, vi, afterEach} from 'vitest'
import {signal} from './signal'
import {useState} from 'react'
import {useSignal} from './use-signal'

afterEach(() => {
    vi.clearAllMocks()
})

describe('Memo', () => {
    it('should render', () => {
        const children = signal('Hello')
        render(<Memo>{children}</Memo>)
        
        expect(screen.getByText('Hello')).toBeInTheDocument()

        act( () => children('Hello World'))

        expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

})

describe('Memo re-render', () => {
    it('should not re-render when parent re-render', async() => {
        vi.spyOn((Memo as any), 'type')
        const Parent = () => {
            const [count, setCount] = useState(0)
            const countSignal = useSignal(count)

            return <div>
                <span data-testid="count">{count}</span>
                <span data-testid="count-signal"><Memo>{countSignal}</Memo></span>
                <button onClick={() => setCount(count + 1)}>Increment1</button>
                <button onClick={() => countSignal(countSignal() + 1)}>Increment2</button>
            </div>
        }
        render(<Parent />)

        expect((Memo as any).type).toHaveBeenCalledTimes(1)
        expect(screen.getByTestId('count')).toHaveTextContent('0')
        expect(screen.getByTestId('count-signal')).toHaveTextContent('0')

        act(() => screen.getByText('Increment1').click())

        expect((Memo as any).type).toHaveBeenCalledTimes(1)
        expect(screen.getByTestId('count')).toHaveTextContent('1')
        expect(screen.getByTestId('count-signal')).toHaveTextContent('0')

        act(() => screen.getByText('Increment2').click())

        expect((Memo as any).type).toHaveBeenCalledTimes(2)
        expect(screen.getByTestId('count')).toHaveTextContent('1')
        expect(screen.getByTestId('count-signal')).toHaveTextContent('1')
    })
})
