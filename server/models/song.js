let mongoose = require('mongoose');
let songSchema = new mongoose.Schema({
    name : {type: String, required:true},
    artist : {type: String, required:true},
    url_video : {type: String, required:true},
});

let Song = mongoose.model('Song', songSchema);

module.exports = Song;