interface FPSControllerT {
    currentFrame: number
}
const FPSController: FPSControllerT = { currentFrame: 0 }

/** Retorna el mismo callback que solo se ejecuta cuando se presiona la tecla correcta y el frame es diferente */
function getCustomListener(key: string, listener: (e: KeyboardEvent) => void) {
    let lastFrame: null | number = null
    return (e: KeyboardEvent) => {
        if (lastFrame == FPSController.currentFrame) return;
        if (e.key != key) return;
        listener(e);
    }
}

export default class KeyboardEventManager{
    #isLocked: boolean = false;

    setKeyDownEvent(key: string, listener: (e: KeyboardEvent) => void): void { 
        document.addEventListener('keydown', getCustomListener(key, listener))
    }

    setKeyUpEvent(key: string, listener: (e: KeyboardEvent) => void): void { 
        document.addEventListener('keyup', getCustomListener(key, listener))
    }

    lockEvents(): void {
        this.#isLocked = true;
    }

    unlockEvents(): void {
        this.#isLocked = false;
    }

    clearEvents(): void {
        document.onkeydown = null
        document.onkeyup = null
    }
}


