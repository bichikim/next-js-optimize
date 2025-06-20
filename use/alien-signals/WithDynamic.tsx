import {DynamicElement, DynamicElementComponentProps} from './DynamicElement'
import {JSX, ReactNode} from 'react'

export type DynamicElementComponentWith = <T extends keyof JSX.IntrinsicElements>(props: Omit<DynamicElementComponentProps<T>, '_as'>) => ReactNode

export const withDynamic = <T extends keyof JSX.IntrinsicElements>(as: T): DynamicElementComponentWith => {
    // Logic to imprint component name
    const nameContainer = {
        [as]: (props: any) => {
            return <DynamicElement {...props} _as={as} />
        }
    }

    return nameContainer[as]
}

export const Element = Object.freeze({
    div: withDynamic('div'),
    span: withDynamic('span'),
    p: withDynamic('p'),
    h1: withDynamic('h1'),
    h2: withDynamic('h2'),
    h3: withDynamic('h3'),
    h4: withDynamic('h4'),
    h5: withDynamic('h5'),
    h6: withDynamic('h6'),
    button: withDynamic('button'),
    input: withDynamic('input'),
    textarea: withDynamic('textarea'),
    select: withDynamic('select'),
    option: withDynamic('option'),
    label: withDynamic('label'),
    form: withDynamic('form'),
    img: withDynamic('img'),
})