// Obtener el elemento de carga para mostrar durante la carga de datos
const loading = document.getElementById('loading');
// Inicializar el número de página para la paginación de la API
let page = 1;

// Función para crear y agregar un elemento de personaje al DOM
function createCharacterElement(character) {
  // Crear un nuevo div y asignarle la clase 'character'
  const characterElement = document.createElement('div');
  characterElement.className = 'character';
  // Establecer el HTML interno del div, incluyendo la imagen y la información del personaje
  characterElement.innerHTML = `
  <img class="character-imagen" src="${character.image}" alt="${character.name}">
  <div class="character-info">
    <div class="nombre-contenedor">
        <p class="character-id">id: ${character.id}</p>
        <h2 class="character-nombre">${character.name}</h2>
    </div> 
  </div>
  `;
  // Agregar el nuevo elemento de personaje al contenedor 'characters' en el DOM
  document.getElementById('characters').appendChild(characterElement);
}

// Función para obtener personajes de la API y agregarlos al DOM
function fetchCharacters() {
  // Mostrar el elemento de carga
  loading.style.display = 'block';

  // Retornar una promesa que maneja la solicitud de la API
  return new Promise((resolve, reject) => {
    // Realizar la solicitud a la API de Rick y Morty con la página actual
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => response.json()) // Convertir la respuesta en JSON
      .then(data => {
        // Para cada personaje en los resultados, crear y agregar un elemento al DOM
        data.results.forEach(createCharacterElement);
        page++; // Incrementar el número de página para la próxima carga
        resolve(data); // Resolver la promesa con los datos obtenidos
      })
      .catch(error => {
        // En caso de error, registrar en consola y rechazar la promesa
        console.error('Error:', error);
        reject(error);
      })
      .finally(() => {
        // Finalmente, ocultar el elemento de carga después de un retraso de 1 segundo
        setTimeout(function(){
          loading.style.display = 'none';
        },1000);  
      });
  });
}

// Agregar un evento de clic al botón 'loadMore' para cargar más personajes
document.getElementById('loadMore').addEventListener('click', () => {
  fetchCharacters().then(() => {
    // Registrar en consola cuando nuevos personajes son cargados
    console.log('Nuevos personajes cargados.');
  }).catch(() => {
    // Registrar en consola en caso de error al cargar nuevos personajes
    console.error('Error al cargar nuevos personajes.');
  });
});

// Cargar el primer lote de personajes al cargar la página
fetchCharacters();