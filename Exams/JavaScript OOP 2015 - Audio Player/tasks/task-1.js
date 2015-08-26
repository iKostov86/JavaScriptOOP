function solve() {
    if (!Array.prototype.find) {
        Array.prototype.find = function(predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }

    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = function(predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }
            return -1;
        };
    }

    if (typeof Object.create != 'function') {
        // Production steps of ECMA-262, Edition 5, 15.2.3.5
        // Reference: http://es5.github.io/#x15.2.3.5
        Object.create = (function() {
            // To save on memory, use a shared constructor
            function Temp() {}

            // make a safe reference to Object.prototype.hasOwnProperty
            var hasOwn = Object.prototype.hasOwnProperty;

            return function (O) {
                // 1. If Type(O) is not Object or Null throw a TypeError exception.
                if (typeof O != 'object') {
                    throw TypeError('Object prototype may only be an Object or null');
                }

                // 2. Let obj be the result of creating a new object as if by the
                //    expression new Object() where Object is the standard built-in
                //    constructor with that name
                // 3. Set the [[Prototype]] internal property of obj to O.
                Temp.prototype = O;
                var obj = new Temp();
                Temp.prototype = null; // Let's not keep a stray reference to O...

                // 4. If the argument Properties is present and not undefined, add
                //    own properties to obj as if by calling the standard built-in
                //    function Object.defineProperties with arguments obj and
                //    Properties.
                if (arguments.length > 1) {
                    // Object.defineProperties does ToObject on its first argument.
                    var Properties = Object(arguments[1]);
                    for (var prop in Properties) {
                        if (hasOwn.call(Properties, prop)) {
                            obj[prop] = Properties[prop];
                        }
                    }
                }

                // 5. Return obj
                return obj;
            };
        })();
    }

    function isStringValid (str, minLength, maxLength) {
        if (typeof str !== 'string' || str.length < minLength || str.length > maxLength) {
            return false;
        } return true;
    }

    /* classes */
    var player = {
        init: function (name) {
            this.name = name;
            return this;
        },
        addPlaylist: function (playlistToAdd) {

        },
        getPlaylistById: function (id) {

        },
        removePlaylist: function (id, playlist) {

        },
        listPlaylists: function (page, size) {

        },
        contains: function (playable, playlist) {

        },
        search: function (pattern) {

        }
    };

    var playlist = (function () {
        var idCount = 0,
            _playables;

        var playlist = {
            init: function (name) {
                this.id = idCount += 1;
                this.name = name;
                _playables = [];
                return this;
            },
            addPlayable: function (playable) {
                if (typeof (playable) === 'undefined') {
                    throw Error;
                }
                _playables.push(playable);
                return this;
            },
            getPlayableById: function (id) {
                var playableToFind = _playables.find(function (item) {
                    return item.id === id;
                });

                return playableToFind ? playableToFind : null;
            },
            removePlayable: function (value) {
                var id,
                    index;

                var typeOfValue = typeof (value);

                if (typeOfValue === 'undefined') {
                    throw Error;
                }
                if (typeOfValue !== 'number') {
                    id = value.id;
                } else {
                    id = value;
                }

                index = _playables.findIndex(function (item) {
                    return item.id === id;
                });

                if (index < 0) {
                    throw Error;
                }

                _playables.splice(index, 1);

                return this;
            },
            listPlayables: function (page, size) {
                if (typeof (page) === undefined ||
                    typeof (size) === undefined ||
                    (page * size) > _playables.length ||
                    page < 0 ||
                    size <= 0) {
                    throw  Error;
                }

                _playables.sort(function (item1, item2) {
                    if (item1.title === item2.title) {
                        return item1.id - item2.id;
                    }
                    //return item1.title.localeCompare(item2.title);
                    return item1.title > item2.title;
                });

                return _playables.slice(page * size, (page + 1) * size);
            }
        }

        Object.defineProperties(playlist, {
            'name': {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    if (!isStringValid(value, 3, 25)) {
                        throw Error;
                    }
                    this._name = value;
                }
            }
        })

        return playlist;
    }());

    var playable = (function () {
        var idCount = 0,
            playable = {
            init: function (title, author) {
                this.id = idCount += 1;
                this.title = title;
                this.author = author;
                return this;
            },
            play: function () {
                return '[' + this.id + ']. [' + this.title + '] - [' + this.author + ']';
            }
        };

        Object.defineProperties(playable, {
            'title': {
                get: function () {
                    return this._title;
                },
                set: function (value) {
                    if (!isStringValid(value, 3, 25)) {
                        throw  Error;
                    }
                    this._title = value;
                }
            },
            'author': {
                get: function () {
                    return this._author;
                },
                set: function (value) {
                    if (!isStringValid(value, 3, 25)) {
                        throw  Error;
                    }
                    this._author = value;
                }
            }
        });

        return playable;
    }());

    var audio = (function (parent) {
        var audio = Object.create(parent, {
            'init': {
                value: function (title, author, length) {
                    parent.init.call(this, title, author);
                    this.length = length;
                    return this;
                }
            },
            'play': {
                value: function () {
                    return parent.play.call(this) + ' - [' + this.length + ']';
                }
            },
            'length': {
                get: function () {
                    return this._length;
                },
                set: function (value) {
                    if (value < 1) {
                        throw  Error;
                    }
                    this._length = value;
                }
            }
        });

        return audio;
    }(playable));


    var video = (function (parent) {
        var video = Object.create(parent, {
            'init': {
                value: function (title, author, imdbRating) {
                    parent.init.call(this, title, author);
                    this.imdbRating = imdbRating;
                    return this;
                }
            },
            'play': {
                value: function () {
                    return parent.play.call(this) + ' - [' + this.imdbRating + ']';
                }
            },
            'imdbRating': {
                get: function () {
                    return this._imdbRating;
                },
                set: function (value) {
                    if (typeof (value) !== 'number' || value < 1 || value > 5) {
                        throw Error;
                    }
                    this._imdbRating = value;
                }
            }
        });

        return video;
    }(playable));

    //var video = (function (parent) {
    //    var video = Object.create(parent, {
    //        'init': {
    //            value: function (title, author, imdbRating) {
    //                parent.init.call(this, title, author);
    //                this.imdbRating = imdbRating;
    //                return this;
    //            }
    //        },
    //        'play': {
    //            value: function () {
    //                return parent.play.call(this) + ' - [' + this.imdbRating + ']';
    //            }
    //        },
    //        'imdbRating': {
    //            get: function () {
    //                return this._imdbRating;
    //            },
    //            set: function (value) {
    //                if (typeof (value) !== 'number' || value < 1 || value > 5) {
    //                    throw Error;
    //                }
    //                this._imdbRating = value;
    //            }
    //        }
    //    });
    //
    //    return video;
    //}(playable));

    /* module */
    var module = {
        getPlayer: function (name) {
            return Object.create(player)
                .init(name);
        },
        getPlaylist: function (name) {
            return Object.create(playlist)
                .init(name);
        },
        getAudio: function (title, author, length) {
            return Object.create(audio)
                .init(title, author, length);
        },
        getVideo: function (title, author, imdbRating) {
            return Object.create(video)
                .init(title, author, imdbRating);
        }
    };

    return module;
}
//
//var result = solve();
//
//var myPlaylist = result.getPlaylist('Rock and Roll');
//myPlaylist.addPlayable(result.getAudio('Basi Rocka1', 'Pesho', 5));
//myPlaylist.addPlayable(result.getAudio('Basi Rocka2', 'Pesho', 5));
//myPlaylist.addPlayable(result.getAudio('Basi Rocka3', 'Pesho', 5));
//myPlaylist.addPlayable(result.getAudio('Basi Rocka4', 'Pesho', 5));
//myPlaylist.addPlayable(result.getAudio('Basi Rocka5', 'Pesho', 5));
//myPlaylist.addPlayable(result.getAudio('Basi Rocka6', 'Pesho', 5));
//myPlaylist.addPlayable(result.getAudio('Basi Rocka7', 'Pesho', 5));
//myPlaylist.addPlayable(result.getAudio('Basi Rocka8', 'Pesho', 5));
//myPlaylist.addPlayable(result.getAudio('Basi Rocka9', 'Pesho', 5));
//
//console.log(myPlaylist.listPlayables(2, 4));

module.exports = solve;