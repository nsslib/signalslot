// instantiates
import memory from './memory'

// interfaces
import { t_slotFn } from './interfaces'

export default class Slot {

    register = (signalName: string, fn: t_slotFn) => memory.pushSlotIntoSignalTable(signalName, fn);

    count = (signaName: string): number => memory.slotLength(signaName)
}