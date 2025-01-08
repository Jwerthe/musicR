const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const songController = require('../controller/songController');

router.get('/all', async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        console.error('Error al obtener las canciones:', error);
        res.status(500).json({ 
            mensaje: 'Error al obtener las canciones', 
            error: error.message 
        });
    }
});

router.get('/random', async (req, res) => {
    try {
        const songs = await Song.find();
        if (songs.length === 0) {
            return res.status(404).json({ mensaje: 'No hay canciones disponibles' });
        }
        const randomIndex = Math.floor(Math.random() * songs.length);
        res.status(200).json(songs[randomIndex]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las canciones', error });
    }
});

router.put('/vote/:id', async (req, res) => {
    try {
        const songId = req.params.id;
        const updatedSong = await songController.updateVotes(songId);
        
        if (!updatedSong) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        
        res.json(updatedSong);
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ 
            message: 'Error al actualizar votos',
            error: error.message 
        });
    }
});

router.post('/', songController.addSong);

module.exports = router;