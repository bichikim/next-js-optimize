/**
 * @vitest-environment jsdom
 */
import {describe, it, expect} from 'vitest'
import {signal, isSignal} from './signal'

describe('signal', () => {
    it('should create a signal with initial value', () => {
        const count = signal(0)
        expect(count()).toBe(0)
    })

    it('should update signal value', () => {
        const count = signal(0)
        count(5)
        expect(count()).toBe(5)
    })

    it('should be a signal', () => {
        const count = signal(0)
        expect(isSignal(count)).toBe(true)
    })

    it('should not be a signal for non-signal values', () => {
        expect(isSignal(0)).toBeFalsy()
        expect(isSignal('hello')).toBeFalsy()
        expect(isSignal({})).toBeFalsy()
        expect(isSignal(null)).toBeFalsy()
        expect(isSignal(undefined)).toBeFalsy()
        expect(isSignal(() => null)).toBeFalsy()
    })
})
