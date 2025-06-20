/**
 * @vitest-environment jsdom
 */
import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {signal} from './signal'
import {DynamicElement} from './DynamicElement'

describe('DynamicElement', () => {
    it('should render with static props', () => {
        render(
            <DynamicElement _as="div" data-testid="test">
                Hello World
            </DynamicElement>
        )

        const element = screen.getByTestId('test')
        expect(element).toBeInTheDocument()
        expect(element).toHaveTextContent('Hello World')
    })

    it('should render with signal props', () => {
        const classNameSignal = signal('test-class')

        render(
            <DynamicElement _as="div" data-testid="test" className={classNameSignal}>
                Hello
            </DynamicElement>
        )

        const element = screen.getByTestId('test')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('test-class')
        expect(element).toHaveTextContent('Hello')
    })

    it('should update when signal props change', () => {
        const textSignal = signal('Hello')
        const classNameSignal = signal('test-class')

        const {rerender} = render(
            <DynamicElement _as="div" data-testid="test" className={classNameSignal}>
                Hello
            </DynamicElement>
        )

        const element1 = screen.getByTestId('test')
        expect(element1).toHaveClass('test-class')

        // Update signals
        classNameSignal('updated-class')

        rerender(
            <DynamicElement _as="div" data-testid="test" className={classNameSignal}>
                Hello
            </DynamicElement>
        )

        const element2 = screen.getByTestId('test')
        expect(element2).toHaveClass('updated-class')
    })

    it('should handle mixed static and signal props', () => {
        const classNameSignal = signal('dynamic-class')

        render(
            <DynamicElement 
                _as="div" 
                data-testid="test" 
                className={classNameSignal}
                id="static-id"
            >
                Static content
            </DynamicElement>
        )

        const element = screen.getByTestId('test')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('dynamic-class')
        expect(element).toHaveAttribute('id', 'static-id')
        expect(element).toHaveTextContent('Static content')
    })

    it('should render different HTML elements', () => {
        render(
            <DynamicElement _as="span" data-testid="span">
                Span content
            </DynamicElement>
        )

        render(
            <DynamicElement _as="button" data-testid="button">
                Button content
            </DynamicElement>
        )

        expect(screen.getByTestId('span')).toBeInTheDocument()
        expect(screen.getByTestId('button')).toBeInTheDocument()
        expect(screen.getByTestId('span')).toHaveTextContent('Span content')
        expect(screen.getByTestId('button')).toHaveTextContent('Button content')
    })
})
