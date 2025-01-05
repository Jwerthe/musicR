let express = require('express');
const router = express.Router();
let songController = require('../controller/songController');

router.get('/', (req, res)=>{
    res.send("Hola");
});

router.post('/', songController.addSong);

module.exports = router;