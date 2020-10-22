export enum ERRS {
    SIGNAL_NEVER_CREATED
}

export enum WARNS {
    NO_SLOT_EXIST,
    SIGNAL_ALREADY_EXIST
}

class ErrHandler {

    warnings = (signalName: string, warnType: WARNS) => {
        switch (warnType) {
            case WARNS.NO_SLOT_EXIST:
                console.warn(`[!] There are no any slot assigned to the signal(${signalName})`)
                break;
            case WARNS.SIGNAL_ALREADY_EXIST:
                console.warn(`[!] The signal(${signalName}) is already exist in memory`)
                break;
            default:
                break;
        }
    }

    fatal = (signalName: string, errType: ERRS) => {
        switch (errType) {
            case ERRS.SIGNAL_NEVER_CREATED:
                console.error(`[-] The signal(${signalName}) never created before!`)
                break;
            default:
                break;
        }
    }

}

const errhandler = new ErrHandler()
export default errhandler