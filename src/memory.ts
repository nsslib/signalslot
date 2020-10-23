// instantiates
import errhandler, { WARNS, ERRS } from './errhandler'

// interfaces
import { IMemory, IMemoryObject, t_slotFn } from './interfaces'

class Memory {
    private m_Memory: IMemory = {};

    private checkIfSignalTableExist = (signalName: string): boolean => this.m_Memory.hasOwnProperty(signalName);

    createSignalTableInMemory = (storeObj: IMemoryObject): void => {
        if(this.checkIfSignalTableExist(storeObj.name)) { return errhandler.warnings(storeObj.name, WARNS.SIGNAL_ALREADY_EXIST) };
        this.m_Memory[storeObj.name] = storeObj
    }

    pushSlotIntoSignalTable = (signalName: string, fn: t_slotFn): void => {
        if(!this.checkIfSignalTableExist(signalName)) { return errhandler.fatal(signalName, ERRS.SIGNAL_NEVER_CREATED) };
        this.m_Memory[signalName].fns?.push(fn);
    }

    updateValueOnSignalTable = (signalName: string, value: any): void => {
        if(!this.checkIfSignalTableExist(signalName)) { return errhandler.fatal(signalName, ERRS.SIGNAL_NEVER_CREATED) };
        this.m_Memory[signalName].value = value;
        this.callSlots(signalName, value, this.m_Memory[signalName].fns)
    }

    callSlots = (signalName: string, value: any, fns?: [t_slotFn]): void => {
        if(fns && fns.length > 0) {
            fns.map((fn) => { // iterate all functions
                fn(value); // call all functions with callback parameter
            })
        } else {
            errhandler.warnings(signalName, WARNS.NO_SLOT_EXIST)
        }
    }

    readAllMemory = (): IMemory => {
        // This is the copy of memory, any direct changes will never affect on actual memory!
        return {...this.m_Memory};
    }

    readSingleMemory = (signalName: string): IMemoryObject | undefined => {
        if(!this.checkIfSignalTableExist) { 
            errhandler.fatal(signalName, ERRS.SIGNAL_NEVER_CREATED)
            return undefined;
        };
        return {...this.m_Memory[signalName]}
    }

    slotLength = (signalName: string): number => {
        if(!this.checkIfSignalTableExist(signalName)) {
            errhandler.fatal(signalName, ERRS.SIGNAL_NEVER_CREATED);
            return 0;
        };
        return this.m_Memory[signalName].fns?.length;
    }
}

const memory = new Memory();
export default memory;