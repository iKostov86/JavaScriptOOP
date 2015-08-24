function solve() {
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

    var playlist = {
        init: function (name) {
            this.name = name;
            return this;
        },
        addPlayable: function (playlistToAdd) {

        },
        getPlayableById: function (id) {

        },
        removePlayable: function (id, playlist) {

        },
        listPlayables: function (page, size) {

        }
    };

    var playable = (function () {
        var playable = {
            init: function (title, author) {
                this.title = title;
                this.author = author;
                return this;
            },
            play: function () {
                return '[' + this.id + ']. [' + this.title + '] - [' + this.author + ']';
            }
        }
    }());

    var audio = {
        init: function (title, author, length) {
            this.title = title;
            this.author = author;
            this.length = length;
            return this;
        },
        play: function () {

        }
    };

    var video = {
        init: function (title, author, imdbRating) {
            this.title = title;
            this.author = author;
            this.imdbRating = imdbRating;
            return this;
        },
        play: function () {

        }
    };

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
