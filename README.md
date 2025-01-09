# musicR

Es una sitio web para compartir y descubrir música mediante recomendaciones. Los usuarios pueden añadir canciones, votar por sus favoritas y obtener recomendaciones aleatorias.

## Características

- Añadir canciones con nombre, artista y enlace de YouTube
- Listar todas las canciones guardadas
- Sistema de votos para las canciones
- Obtener recomendaciones aleatorias

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB (v4.4 o superior)
- npm (viene con Node.js)

## Instalación

1. Clonar el repositorio:
~~~
git clone https://github.com/Jwerthe/musicR.git
~~~

2. Dirigirse a la carpeta server para instalar dependencias
~~~
cd .\musicR\server\
npm install express mongoose cors
~~~

3. Levantamos el servidor
~~~
node server.js
~~~

4. Ruta del sitio web
~~~
http://localhost:3000
~~~

