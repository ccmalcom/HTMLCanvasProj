class Events {
    callbacks = [];
    nextId = 0;

    //Emit event
    emit(eventName, value) {
        this.callbacks.forEach(stored => {
            if (stored.eventName === eventName) {
                stored.callback(value);
            }
        })
    }

    // subscribe to event
    on(eventName, caller, callback) {
        this.nextId++;
        this.callbacks.push({
            id: this.nextId,
            eventName,
            caller,
            callback
        });
        // return id to caller
        return this.nextId;
    }

    // unsubscribe from event
    // remove callback by id
    off(id) {
        this.callbacks = this.callbacks.filter(cb => cb.id !== id);
    }
    // remove all callbacks by caller
    unsubscribe(caller) {
        this.callbacks = this.callbacks.filter(cb => cb.caller !== caller);
    }

}

export const events = new Events();