function solve () {
    var module = {
        getPlayer: function (name){
            return Object.create(player)
                .init(name);
        },
        getPlaylist: function(name){
            return Object.create(playlist)
                .init(name);
        },
        getAudio: function(title, author, length){
            return Object.create(audio)
                .init(title, author, length);
        },
        getVideo: function(title, author, imdbRating){
            return Object.create(video)
                .init(title, author, imdbRating);
        }
    };

    return module;
}
