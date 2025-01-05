let Song = require('../models/song');

exports.addSong = async(req, res)=>{
    const {name, artist, url_video} = req.body;
    const song = new Song({name, artist, url_video});

    try{
        await song.save();
        res.status(201).json(song);
    }catch(error){
        console.error(error);
        res.status(400).json({message: 'Error al guardar la canción'});
    };
};