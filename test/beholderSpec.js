const beholder = require('../index');

describe('mutableThing: ', function () {
    describe('create', function () {
        it('empty args should give an empty map', function () {
            var mutableThing = beholder.mutableThing();
            expect(mutableThing.deref()).toEqual({});
        });

        it('model from a map', function () {
            var mutableThing = beholder.mutableThing({name: 'Ysera'});
            expect(mutableThing.deref()).toEqual({name: 'Ysera'});
        });
    });

    describe('reset', function () {
        it('reset the model', function () {
            var mutableThing = beholder.mutableThing({name: 'Ysera'});
            var result = mutableThing.reset({anotherName: 'Onyxia'});
            expect(result).toEqual({anotherName: 'Onyxia'});
            expect(mutableThing.deref()).toEqual({anotherName: 'Onyxia'});
        });
    });

    describe('swap', function () {
        it('add a key-value to the model', function () {
            var mutableThing = beholder.mutableThing({name: 'Ysera'});

            function addFriend(state, friend) {
                state.friend = friend;
                return state;
            }

            var result = mutableThing.swap(addFriend, 'Onyxia');
            expect(result).toEqual({name: 'Ysera', friend: 'Onyxia'});
            expect(mutableThing.deref()).toEqual({name: 'Ysera', friend: 'Onyxia'});
        });

        it('add a key-value to the model with anonymous function ', function () {
            var mutableThing = beholder.mutableThing({name: 'Ysera'});
            var result = mutableThing.swap(function (state) {
                state.friend = 'Onyxia';
                return state;
            });
            expect(result).toEqual({name: 'Ysera', friend: 'Onyxia'});
            expect(mutableThing.deref()).toEqual({name: 'Ysera', friend: 'Onyxia'});
        });
    });

    describe('watchers', function () {
        it('should be able to add multiple watchers', function () {
            var mutableThing = beholder.mutableThing({name: 'Ysera'});
            mutableThing.addWatch('watcher-1', function (data) {
            });
            mutableThing.addWatch('watcher-2', function (data) {
            });
        });

        it('single watcher should be notified', function (done) {
            var mutableThing = beholder.mutableThing({name: 'Ysera'});
            mutableThing.addWatch('ctrl', function (data) {
                done();
            });

            mutableThing.reset({name: 'Onyxia'});
        });

        it('multiple watchers should be notified', function (done) {
            var mutableThing = beholder.mutableThing({name: 'Ysera'});

            var results = [];

            function isItDone() {
                if (results.length === 2) {
                    done();
                }
            }

            mutableThing.addWatch('ctrl-1', function (data) {
                expect(true).toEqual(true);
                results.push('1');
                isItDone();
            });

            mutableThing.addWatch('ctrl-2', function (data) {
                expect(true).toEqual(true);
                results.push('2');
                isItDone();
            });

            mutableThing.swap(function (state) {
                return {
                    name: 'Onyxia'
                };
            });
        });

        it('should be able to remove watchers', function (done) {
            var mutableThing = beholder.mutableThing({name: 'Ysera'});
            mutableThing.addWatch('old-watcher', function (data) {
                if (data === {}) {
                    fail();
                }
                expect(true).toEqual(true);
                mutableThing.removeWatch('old-watcher');
                mutableThing.addWatch('new-watcher', function (data) {
                    done();
                });
                mutableThing.reset({});
            });

            mutableThing.swap(function (state) {
                return {
                    name: 'Onyxia'
                };
            });
        });
    });
});
