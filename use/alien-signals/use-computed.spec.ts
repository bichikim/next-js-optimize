/**
 * @vitest-environment jsdom
 */
import {describe, it, expect} from 'vitest'
import {useComputed} from './use-computed'
import {renderHook} from '@testing-library/react'
import {signal} from './signal'

describe('useComputed', () => {
    it('should create a computed signal', () => {
        const count = signal(0)
        const {result} = renderHook(() => useComputed(() => count() * 2))
        
        expect(result.current()).toBe(0)
    })

    it('should update computed value when dependencies change', () => {
        const count = signal(0)
        const {result} = renderHook(() => useComputed(() => count() * 2))
        
        expect(result.current()).toBe(0)
        
        count(5)
        expect(result.current()).toBe(10)
    })

    it('should memoize the computed signal', () => {
        const count = signal(0)
        const {result, rerender} = renderHook(() => useComputed(() => count() * 2))
        
        const firstComputed = result.current
        
        rerender()
        
        expect(result.current).toBe(firstComputed)
    })

    it('should handle multiple dependencies', () => {
        const a = signal(1)
        const b = signal(2)
        const {result} = renderHook(() => useComputed(() => a() + b()))
        
        expect(result.current()).toBe(3)
        
        a(5)
        expect(result.current()).toBe(7)
        
        b(3)
        expect(result.current()).toBe(8)
    })
})
