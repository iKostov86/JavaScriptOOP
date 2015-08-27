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

    function sortFunction (firstParameter, secondParameter) {
        return function (item1, item2) {
            if (item1[firstParameter] === item2[firstParameter]) {
                return item1[secondParameter] - item2[secondParameter];
            }
            //return item1.title.localeCompare(item2.title);
            return item1[firstParameter] > item2[firstParameter];
        }
    }

    var CONSTANTS = {
        TEXT_MIN_LENGTH: 3,
        TEXT_MAX_LENGTH: 25,
        IMDB_MIN_RATING: 1,
        IMDB_MAX_RATING: 5,
    }

    var validator = {
        validateIfUndefined: function (value, valueAsString) {
          if (typeof value === 'undefined') {
              throw new Error(valueAsString + ' can\'t be undefined!');
          }
        },
        validateIfNegative: function (value, valueAsString) {
            if (value < 0) {
                throw new Error(valueAsString + ' can\'t be negative!');
            }
        },
        validateIfZero: function (value, valueAsString) {
            if (value === 0) {
                throw new Error(valueAsString + ' can\'t be 0!');
            }
        },
        validateNumber: function (value, valueAsString) {
            validator.validateIfUndefined(value);

            if (!validator.isType(value, 'number')) {
                throw new Error(valueAsString
                    + 'must be a number!');
            }
        },
        validateString: function (value, valueAsString) {
            validator.validateIfUndefined(value);

            if (!validator.isType(value, 'string')) {
                throw new Error(valueAsString
                    + 'must be a string!');
            }
        },
        validateObject: function (value, valueAsString) {
            validator.validateIfUndefined(value);

            if (!validator.isType(value, 'object')) {
                throw new Error(valueAsString
                    + ' must be a object!');
            }
        },
        validateImdbRating: function (imdbRating, imdbRatingAsStr) {
            validator.validateNumber(imdbRating, imdbRatingAsStr);

            if (imdbRating < CONSTANTS.IMDB_MIN_RATING ||
                imdbRating > CONSTANTS.IMDB_MAX_RATING) {
                throw new Error(imdbRatingAsStr
                    + ' must be a number between '
                    + CONSTANTS.IMDB_MIN_RATING
                    + ' and ' +
                    CONSTANTS.IMDB_MAX_RATING
                    + '!');
            }
        },
        validateText: function (value, valueAsString) {
            validator.validateString(value, valueAsString);

            if (value.length < CONSTANTS.TEXT_MIN_LENGTH ||
                value.length > CONSTANTS.TEXT_MAX_LENGTH) {
                throw new Error(valueAsString
                    + ' must be string between '
                    + CONSTANTS.TEXT_MIN_LENGTH
                    + ' and '
                    + CONSTANTS.TEXT_MAX_LENGTH
                    + ' symbols');
            }
        },
        validatePaging: function (page, size, maxLength, givenLenghtAsStr, maxLengthAsStr) {
            validator.validateNumber(page, 'Page');
            validator.validateNumber(size, 'Size');
            validator.validateIfNegative(page, 'Page');
            validator.validateIfNegative(size, 'Size');
            validator.validateIfZero(size, 'Size');

            if ((page * size) > maxLength) {
                throw new Error(givenLenghtAsStr
                    + ' can\'t be more than '
                    + maxLengthAsStr + '!');
            }
        },
        isType: function (value, mustBe) {
            return typeof value === mustBe;
        },
    };

    /* classes */
    var player = (function () {
        var idCount = 0,
            player = {
            init: function (name) {
                this.id = idCount += 1;
                this.name = name;
                this._playlists = [];

                return this;
            },
            addPlaylist: function (playlistToAdd) {
                validator.validateObject(playlistToAdd, 'Playlist to add');

                this._playlists.push(playlistToAdd);

                return this;
            },
            getPlaylistById: function (id) {
                var playlistToFind = this._playlists.find(function (item) {
                    return item.id === id;
                });

                return playlistToFind ? playlistToFind : null;
            },
            removePlaylist: function (value) {
                var id,
                    index;

                validator.validateIfUndefined(value);

                if (validator.isType(value, 'number')) {
                    id = value;
                } else {
                    id = value.id;
                }

                index = this._playlists.findIndex(function (item) {
                    return item.id === id;
                });

                validator.validateIfNegative(index, 'Index');

                this._playlists.splice(index, 1);

                return this;
            },
            listPlaylists: function (page, size) {
                validator.validatePaging(page, size, this._playlists.length,
                    'Page * size', '_playlists.length');

                return this._playlists
                    .slice()
                    .sort(sortFunction('name', 'id'))
                    .splice(page * size, size);
            },
            contains: function (playable, playlist) {
                validator.validateObject(playable);
                validator.validateObject(playlist);

                var searchPlaylist = this.getPlaylistById(playlist.id);
                var searchPlayable = this.getPlayableById(playable.id);

                if (searchPlaylist === null || searchPlayable === null) {
                    return false;
                } return true;
            },
            search: function (pattern) {
                validator.validateString(pattern, 'Pattern');

                pattern = pattern.toLowerCase();

                return this._playlists
                    .filter(function (playlistItem) {
                        return playlistItem
                            .getAllPlayables()
                            .some(function (playableItem) {
                                return playableItem
                                    .title
                                    .toLowerCase()
                                    .indexOf(pattern) >= 0;
                        });
                    })
                    .map(function (filteredItem) {
                        return {
                            id: filteredItem.id,
                            name: filteredItem.name,
                        };
                    });
            }
        };

        Object.defineProperties(player, {
            'name': {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    validator.validateText(value, 'Player name');

                    this._name = value;
                }
            }
        });

        return player;
    }());

    var playlist = (function () {
        var idCount = 0;

        var playlist = {
            init: function (name) {
                this.id = idCount += 1;
                this.name = name;
                this._playables = [];

                return this;
            },
            addPlayable: function (playable) {
                validator.validateObject(playable, 'Playable');

                this._playables.push(playable);

                return this;
            },
            getPlayableById: function (id) {
                var playableToFind = this._playables.find(function (item) {
                    return item.id === id;
                });

                return playableToFind ? playableToFind : null;
            },
            removePlayable: function (value) {
                var id,
                    index;

                validator.validateIfUndefined(value);

                if (validator.isType(value, 'number')) {
                    id = value;
                } else {
                    id = value.id;
                }

                index = this._playables.findIndex(function (item) {
                    return item.id === id;
                });

                validator.validateIfNegative(index, 'Index');

                this._playables.splice(index, 1);

                return this;
            },
            getAllPlayables: function () {
                return this._playables.slice();
            },
            listPlayables: function (page, size) {
                validator.validatePaging(page, size, this._playables.length,
                    'Page * size', '_playables.length');

                return this._playables
                    .slice()
                    .sort(sortFunction('title', 'id'))
                    .splice(page * size, size);
            }
        };

        Object.defineProperties(playlist, {
            'name': {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    validator.validateText(value, 'Playlist name');

                    this._name = value;
                }
            }
        });

        return playlist;
    }());

    var playable = (function () {
        var idCount = 0;

        var playable = {
            init: function (title, author) {
                this.id = idCount += 1;
                this.title = title;
                this.author = author;

                return this;
            },
            play: function () {
                return this.id + '. ' + this.title + ' - ' + this.author;
            }
        };

        Object.defineProperties(playable, {
            'title': {
                get: function () {
                    return this._title;
                },
                set: function (value) {
                    validator.validateText(value, 'Playable title');

                    this._title = value;
                }
            },
            'author': {
                get: function () {
                    return this._author;
                },
                set: function (value) {
                    validator.validateText(value, 'Playable author');

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
                    return parent.play.call(this) + ' - ' + this.length;
                }
            },
            'length': {
                get: function () {
                    return this._length;
                },
                set: function (value) {
                    validator.validateNumber(value, 'Audio length');
                    validator.validateIfNegative(value, 'Audio length');
                    validator.validateIfZero(value, 'Audio length');

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
                    return parent.play.call(this) + ' - ' + this.imdbRating;
                }
            },
            'imdbRating': {
                get: function () {
                    return this._imdbRating;
                },
                set: function (value) {
                    validator.validateImdbRating(value, 'ImdbRating');

                    this._imdbRating = value;
                }
            }
        });

        return video;
    }(playable));

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

//var result = solve();
//
//var player = result.getPlayer('Batman\'s playlist')
//    .addPlaylist(result.getPlaylist('Cool')
//        .addPlayable(result.getAudio('They are green', 'Author', 5))
//        .addPlayable(result.getAudio('I am Batman', 'Author', 5)))
//    .addPlaylist(result.getPlaylist('Green')
//        .addPlayable(result.getAudio('Green they are', 'Author', 5))
//        .addPlayable(result.getAudio('Green is beautiful', 'Author', 5))
//        .addPlayable(result.getAudio('To the green and beyond', 'Author', 5)));

//console.log(player.search('green'));
// returns:
//  [{name: 'Cool', id: 1}, {name: 'Green', id: 2}]

//console.log(player.search('batman'));
// returns:
//  [{name: 'Cool', id: 1}]

//console.log(player.search('beyond'))
// returns:
//  [{name: Green, id: 2}]

//console.log(player.search('John'));
// returns:
//  []

module.exports = solve;