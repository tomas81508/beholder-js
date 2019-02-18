function mutableThing(initialState) {
    var state = initialState || {};
    var watchers = {};

    function addWatch(key, callback) {
        if (watchers[key]) {
            throw new Error('A watcher with the specific key already exist.');
        }
        watchers[key] = callback;
        return undefined;
    }

    function deref() {
        return state;
    }

    function notifyWatchers(state) {
        let callbacks = [];
        for (var key in watchers) {
            if (watchers.hasOwnProperty(key)) {
                callbacks.push(watchers[key]);
            }
        }
        callbacks.forEach(function (callback) { callback(state); });
        return undefined;
    }

    function reset(newState) {
        state = newState;
        notifyWatchers(state);
        return state;
    }

    function swap(f) {
        var args = Array.prototype.slice.call(arguments, 1);
        var newState = f.apply(null, [state].concat(args));
        if (!newState) {
            throw new Error('It is a rookie mistake not to return a map. Keep on learning good stuff :).');
        }
        state = newState;
        notifyWatchers(state);
        return state;
    }

    function removeWatch(key) {
        delete watchers[key];
        return undefined;
    }

    return {
        addWatch: addWatch,
        deref: deref,
        removeWatch: removeWatch,
        reset: reset,
        swap: swap
    };
}

module.exports = {
    mutableThing: mutableThing
};
