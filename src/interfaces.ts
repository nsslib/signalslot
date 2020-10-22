export interface IMemory {
    [key: string]: IMemoryObject
}

export interface IMemoryObject {
    fns: [t_slotFn]
    name: string
    value: any
}

export type t_slotFn = (val: any) => void;