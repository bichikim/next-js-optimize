/**
 * @vitest-environment jsdom
 */
import {describe, it, expect} from 'vitest'
import {useSignal} from './use-signal'
import {renderHook} from '@testing-library/react'

describe('useSignal', () => {
    it('should create a signal with initial value', () => {
        const {result} = renderHook(() => useSignal(42))
        
        expect(result.current()).toBe(42)
    })

    it('should update signal value', () => {
        const {result} = renderHook(() => useSignal(0))
        
        expect(result.current()).toBe(0)
        
        result.current(5)
        expect(result.current()).toBe(5)
    })

    it('should memoize the signal', () => {
        const {result, rerender} = renderHook(() => useSignal(0))
        
        const firstSignal = result.current
        
        rerender()
        
        expect(result.current).toBe(firstSignal)
    })

    it('should handle different types', () => {
        const {result: stringResult} = renderHook(() => useSignal('hello'))
        const {result: arrayResult} = renderHook(() => useSignal([1, 2, 3]))
        const {result: objectResult} = renderHook(() => useSignal({a: 1, b: 2}))
        
        expect(stringResult.current()).toBe('hello')
        expect(arrayResult.current()).toEqual([1, 2, 3])
        expect(objectResult.current()).toEqual({a: 1, b: 2})
    })
})
