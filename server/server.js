let express = require('express');
let mongoose = require('mongoose');
let songsRoutes = require('./routes/songsRoutes');
let app = express();
let port = 3000;

async function connectDB() {
    try{
        await mongoose.connect('mongodb://localhost:27017/music',{useNewUrlParser:true, useUnifiedTopology:true});
    }catch(err){
        console.error("Error en la conexión", err);
        process.exit(1);
    };
}

connectDB();

app.use(express.json());
app.use('/songs', songsRoutes);

app.listen(port, ()=> {
    console.log("Server is up");
})