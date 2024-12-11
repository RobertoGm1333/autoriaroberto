
const peliculaApiUrl = 'https://localhost:7057/MinimalCinema/Pelicula';
const categoriaApiUrl = 'https://localhost:7057/MinimalCinema/Pelicula/categoria';

const caratulaElement = document.querySelector('.pelicula__movie-poster img');
const movieTitle = document.querySelector('.pelicula__movie-title');
const directorElement = document.querySelector('.director');
const actoresElement = document.querySelector('.actores');
const sinopsisElement = document.querySelector('.sinopsis');
const duracionElement = document.querySelector('.duracion');
const categoriaElement = document.querySelector('.categoria');
const showtimeContainer = document.querySelector('.pelicula__showtime-container');
const similarMoviesContainer = document.querySelector('.pelicula__similar-posters');

const cargarDetallesPelicula = async (idPelicula) => {
  try {
    const response = await fetch(`${peliculaApiUrl}/${idPelicula}`);
    if (!response.ok) {
      throw new Error('Error al cargar los detalles de la película.');
    }
    const pelicula = await response.json();

    console.log('Película obtenida:', pelicula);

    movieTitle.textContent = pelicula.nombre;
    directorElement.textContent = pelicula.directores;
    actoresElement.textContent = pelicula.actores;
    sinopsisElement.textContent = pelicula.descripcion;
    duracionElement.textContent = `${pelicula.duracion}h`;
    categoriaElement.textContent = pelicula.nombre_Categoria;

    if (pelicula.caratula) {
      caratulaElement.src = pelicula.caratula;
      caratulaElement.alt = `Carátula de ${pelicula.nombre}`;
    }

    const categoriaId = pelicula.id_Categoria;
    console.log('idCategoria:', categoriaId);

    if (categoriaId) {
      cargarPeliculasSimilares(categoriaId);
    } else {
      console.error('idCategoria es undefined');
    }

  } catch (error) {
    console.error('Error al cargar los detalles de la película:', error);
  }
};

const cargarPeliculasSimilares = async (categoriaId) => {
  try {
    if (!categoriaId) {
      throw new Error('Categoria ID es undefined');
    }

    const response = await fetch(`${categoriaApiUrl}?idCategoria=${categoriaId}`);
    if (!response.ok) {
      throw new Error('Error al cargar las películas similares.');
    }
    const peliculasSimilares = await response.json();

    console.log('Películas similares:', peliculasSimilares);

    similarMoviesContainer.innerHTML = '';
    peliculasSimilares.forEach((pelicula) => {
      const similarMovieCard = `
        <a href="pelicula.html?id=${pelicula.id_Pelicula}">
          <img src="${pelicula.caratula}" alt="Carátula de ${pelicula.nombre}" />
          <p class="center">${pelicula.nombre}</p>
        </a>
      `;
      similarMoviesContainer.innerHTML += similarMovieCard;
    });
  } catch (error) {
    console.error('Error al cargar las películas similares:', error);
    similarMoviesContainer.innerHTML = '<p>Error al cargar las películas similares.</p>';
  }
};

const urlParams = new URLSearchParams(window.location.search);
const idPelicula = urlParams.get('id')

cargarDetallesPelicula(idPelicula);




const cargarHorarios = async (idPelicula) => {
  try {
    if (!idPelicula) {
      throw new Error('No se ha proporcionado un ID de película válido.');
    }

    const horariosApiUrl = `https://localhost:7057/MinimalCinema/Sesion/pelicula/${idPelicula}/salas-horarios`;

    const response = await fetch(horariosApiUrl);

    if (!response.ok) {
      throw new Error(`Error al cargar los horarios. Código de error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error('No se encontraron horarios.');
    }

    showtimeContainer.innerHTML = '';

    data.forEach(({ idSesion, horario }) => {
      if (!horario || !horario.horario) {
        console.warn('Horario incompleto encontrado:', horario);
        return;
      }

      const buttonHTML = `
        <a href="butacas.html?idSesion=${idSesion}">
          <button class="pelicula__showtime-button">
            <i class="fas fa-map-marker-alt"></i>
            <span>${horario.horario}</span>
          </button>
        </a>
      `;

      showtimeContainer.insertAdjacentHTML('beforeend', buttonHTML);
    });

  } catch (error) {
    console.error('Error al cargar los horarios:', error);
    showtimeContainer.innerHTML = '<p>No hay horarios disponibles.</p><br><p>Gracias y sentimos las molestias.<p>';
  }
};

cargarHorarios(idPelicula);
