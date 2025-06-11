import {ObservableReadable} from '@legendapp/state'

export type StateProps<P> = {
    [p in keyof P]: ObservableReadable<P[p]>
}