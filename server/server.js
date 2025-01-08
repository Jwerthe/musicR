let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const path = require('path');
let songsRoutes = require('./routes/songsRoutes');

let app = express();
let port = 3000;

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/songs', {useNewUrlParser: true,useUnifiedTopology: true});
        console.log('Conectado a MongoDB');
    } catch(err) {
        console.error("Error en la conexión", err);
        process.exit(1);
    }
}

connectDB();

app.use(cors());
app.use(express.json());
app.use('/songs', songsRoutes);

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
    console.log(`Server is up: http://localhost:${port}`);
});