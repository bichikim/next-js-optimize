/**
 * @vitest-environment jsdom
 */
import {describe, it, expect} from 'vitest'
import {useSignalEffect} from './use-signal-effect'
import {renderHook} from '@testing-library/react'
import {signal} from './signal'

describe('useSignalEffect', () => {
    it('should run effect when signal changes', () => {
        const count = signal(0)
        let effectCount = 0
        
        renderHook(() => useSignalEffect(() => {
            count()
            effectCount++
        }))
        
        expect(effectCount).toBe(1)
        
        count(5)
        expect(effectCount).toBe(2)
    })

    it('should cleanup effect on unmount', () => {
        const count = signal(0)
        let effectCount = 0
        
        const {unmount} = renderHook(() => useSignalEffect(() => {
            count()
            effectCount++
        }))
        
        expect(effectCount).toBe(1)
        
        unmount()
        count(5)
        expect(effectCount).toBe(1) // Should not run after unmount
    })

    it('should handle multiple signals', () => {
        const a = signal(1)
        const b = signal(2)
        let lastSum = 0
        
        renderHook(() => useSignalEffect(() => {
            lastSum = a() + b()
        }))
        
        expect(lastSum).toBe(3)
        
        a(5)
        expect(lastSum).toBe(7)
        
        b(3)
        expect(lastSum).toBe(8)
    })
})
