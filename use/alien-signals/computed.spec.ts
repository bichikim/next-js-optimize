/**
 * @vitest-environment jsdom
 */
import {describe, it, expect} from 'vitest'
import {computed} from './computed'
import {signal} from './signal'
import {isSignal} from './signal'

describe('computed', () => {
    it('should create a computed signal', () => {
        const count = signal(1)
        const doubled = computed(() => count() * 2)

        expect(doubled()).toBe(2)
    })

    it('should update when dependencies change', () => {
        const count = signal(1)
        const doubled = computed(() => count() * 2)

        expect(doubled()).toBe(2)

        count(3)
        expect(doubled()).toBe(6)
    })

    it('should handle multiple dependencies', () => {
        const a = signal(1)
        const b = signal(2)
        const sum = computed(() => a() + b())

        expect(sum()).toBe(3)

        a(5)
        expect(sum()).toBe(7)

        b(10)
        expect(sum()).toBe(15)
    })

    it('should be a signal', () => {
        const count = signal(1)
        const doubled = computed(() => count() * 2)

        expect(isSignal(doubled)).toBe(true)
    })
})
