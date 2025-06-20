/**
 * @vitest-environment jsdom
 */
import {describe, it, expect} from 'vitest'
import {Element} from './WithDynamic'
import {render, screen} from '@testing-library/react'

describe('Element', () => {
    it('should render div element', () => {
        render(<Element.div data-testid="div">Hello World</Element.div>)
        const divElement = screen.getByTestId('div')
        expect(divElement.tagName.toLowerCase()).toBe('div')
        expect(screen.getByText('Hello World')).toBeInTheDocument()
    })
})

