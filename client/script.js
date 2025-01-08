document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            if (tabId === 'songlist') {
                allSongs();
            }
        });
    });

    let form = document.getElementById("Form");
    let button = document.getElementById("save");
    let buttonGetRandomSong = document.getElementById("getRandomSong");

    button.addEventListener("click", saveData);
    buttonGetRandomSong.addEventListener("click", getData);
});

async function saveData() {
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    const songInput = document.getElementById("song");
    const artistInput = document.getElementById("artist");
    const urlInput = document.getElementById("url");
    
    if (!songInput.value.trim() || !artistInput.value.trim() || !urlInput.value.trim()) {
        alert("Complete todos los campos por favor.");
    } else {
        if (!youtubePattern.test(urlInput.value)) {
            alert("El enlace de youtube no es válido.");
        } else {
            let name = songInput.value;
            let artist = artistInput.value;
            let url = urlInput.value;
            let votes = 0;
            let body = JSON.stringify({name, artist, url_video: url, votes})
            
            try {
                let response = await fetch('http://localhost:3000/songs', {  
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: body
                });
                
                if (response.status == 201) {
                    let song = await response.json();
                    console.log(song);
                    songInput.value = '';
                    artistInput.value = '';
                    urlInput.value = '';
                }
                alert("La canción se ha guardado correctamente");
            } catch(error) {
                console.error(error);
                alert("Error al guardar la canción");
            }
        }
    }
}

async function getData() {
    try {
        let newElement = document.createElement("p");
        newElement.setAttribute("id", "randomSong");
        let form = document.getElementById("Form");
        let existingElement = form.querySelector("p");
        
        let response = await fetch('http://localhost:3000/songs/random', { 
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        });
        let data = await response.json();

        if (existingElement) {
            existingElement.remove();
        }
        
        newElement.innerHTML = `La canción es: ${data.name} - ${data.artist}<br>
            Enlace: <a href='${data.url_video}' target='_blank'>${data.url_video}</a>
            <br><br>Votos: ${data.votes}`;
        form.appendChild(newElement);
    } catch(error) {
        console.error(error);
    }
}

async function updateVotes(songId) {
    try {
        const response = await fetch(`http://localhost:3000/songs/vote/${songId}`, {  
            method: 'PUT'
        });
        const updatedSong = await response.json();
        const votesDisplay = document.getElementById(`votes-${songId}`);
        if (votesDisplay) {
            votesDisplay.textContent = `Votos: ${updatedSong.votes}`;
        }
    } catch (error) {
        console.error('Error al actualizar votos:', error);
    }
}

async function allSongs() {
    try {
        const response = await fetch('http://localhost:3000/songs/all');  
        const songs = await response.json();
        const songsListContainer = document.getElementById('songList');
        songsListContainer.innerHTML = '';
        
        if (songs.length === 0) {
            songsListContainer.innerHTML = '<p>No hay canciones disponibles.</p>';
        } else {
            songs.forEach(song => {
                const songElement = document.createElement('div');
                songElement.id = `song-${song._id}`; 
                songElement.classList.add('randomSong');
                songElement.innerHTML = `
                    <h3>${song.name} - ${song.artist}</h3>
                    <p><a href="${song.url_video}" target="_blank">${song.url_video}</a></p>
                    <br><p id="votes-${song._id}">Votos: ${song.votes}</p>
                    <button onclick="updateVotes('${song._id}')" class="get">
                        Votar
                    </button>
                `;
                
                songsListContainer.appendChild(songElement);
            });
        }
    } catch (error) {
        console.error('Error al cargar las canciones:', error);
        const songsListContainer = document.getElementById('songList');
        songsListContainer.innerHTML = '<p>Hubo un error al cargar las canciones.</p>';
    }
}