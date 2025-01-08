let Song = require('../models/song');

exports.addSong = async(req, res) => {
    const {name, artist, url_video} = req.body;
    const song = new Song({
        name,
        artist,
        url_video,
        votes: 0
    });
    
    try {
        await song.save();
        console.log("Se guardó la canción");
        res.status(201).json(song);
    } catch(error) {
        console.error(error);
        res.status(400).json({message: 'Error al guardar la canción'});
    }
};

exports.updateVotes = async (songId) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(
            songId,
            { $inc: { votes: 1 } },
            { new: true, runValidators: true }
        );
        return updatedSong;
    } catch (error) {
        console.error('Error al actualizar votos:', error);
        throw error;
    }
};