// instantiates
import memory from './memory'

// interfaces
import { IMemoryObject, IMemory } from './interfaces'

export default class Signal {

    create = (signalName: string, defaultValue: any) => {
        const obj: IMemoryObject = {
            name: signalName,
            value: defaultValue,
            fns: [] as any
        }
        memory.createSignalTableInMemory(obj);
    }

    emit = (signalName: string, value: any) => memory.updateValueOnSignalTable(signalName, value);

    readAllTable = (): IMemory => memory.readAllMemory();

    readTable = (signalName: string): IMemoryObject | undefined => memory.readSingleMemory(signalName);
}