# beholder-js
A simple observable model.

## Basic usage

    var beholder = require('beholder-js);
    
    var model = beholder.mutableThing({name: 'Ysera'});
    
    model.addWatch('watcher-id', functiom (state) {
        // do something like rendering when the model updates...
    });
    
    model.swap(function (state) {
        state.race = 'dragon';
        return state;
    });
    
    model.deref(); // returns plain old js {name: 'Ysera', race: 'dragon'}
    
    model.reset({name: 'Nefarian'});
    
    model.removeWatch('watcher-id');
    
    
    
    
    

