/**
 * EventDispatcher.ts
 * created by Jacob on 2017-06-20
 */


namespace adapter {

/**
 * interface EventListener
 */
export interface EventListener {
    handleEvent(code: number, data: any, src: any): void;
}


/**
 * class EventDispatcher, adapter the event
 */
export class EventDispatcher {
    private static LOG_TAG: string = "EventDispatcher";
    private listenersMap: NumberDictionary< Array<EventListener> > = {};

    /**
     * constructor
     */
    constructor() {

    }

    /**
     * Add a listener to the listener list which listen to the event code.
     * @param code event code.
     * @param listener the listener listen to the event code.
     */
    addListener(code: number, listener: EventListener): void {
        if (!listener) {
            Logger.warn(EventDispatcher.LOG_TAG, "Add a null or undefined listener to the list!");
            return;
        }

        let listeners = this.listenersMap[code];
        if (!listeners) {
            this.listenersMap[code] = new Array<EventListener>();
            listeners = this.listenersMap[code];
        }

        if (listeners.indexOf(listener) >= 0) {
            Logger.warn(EventDispatcher.LOG_TAG, "Add a exist listener to the list!");
            return;
        }

        listeners.push(listener);
    }

    /**
     * Remove a listener from the listener list which listen to the event code.
     * @param code event code.
     * @param listener the listener listen to the event code.
     */
    removeListener(code: number, listener: EventListener): void {
        if (!listener) {
            Logger.warn(EventDispatcher.LOG_TAG, "Remove a null or undefined listener to the list!");
            return;
        }

        let listeners = this.listenersMap[code];
        if (!listeners) {
            Logger.warn(EventDispatcher.LOG_TAG, "Remove a listener from a list which is not exist!");
            return;
        }

        let idx = listeners.indexOf(listener);
        if (idx < 0) {
            Logger.warn(EventDispatcher.LOG_TAG, "Remove a listener which is not exist in the list!");
            return;
        }

        listeners.splice(idx, 1);
    }

    /**
     * Dispatch event.
     * @param code event code.
     * @param data event data.
     * @param src event src, default is null.
     */
    dispatch(code: number, data: any, src: any = null): void {
        let listeners = this.listenersMap[code];
        if (!listeners) {
            Logger.warn(EventDispatcher.LOG_TAG, "Dispatch event failed, list is not exist!");
            return;
        }

        for (let i = 0, n = listeners.length; i < n; i++) {
            listeners[i].handleEvent(code, data, src);
        }
    }
}

}