// Obtener el botón para cargar más Pokémon y asignarle un evento de clic
let cargar_pokemon = document.getElementById('cargar-mas'); 
cargar_pokemon.addEventListener("click", cargarMasPokemon);

// Inicializar el contador de Pokémon para la paginación de la API
let contador_pokemon = 0;

// Obtener el contenedor donde se mostrarán los Pokémon y el elemento de carga
const container = document.getElementById('pokemon-container');
const loading = document.getElementById('loading');

// Función asíncrona para cargar más Pokémon cuando se hace clic en el botón
async function cargarMasPokemon() { 
  // Mostrar el indicador de carga
  loading.style.display = 'block';
  
  try {
    // Realizar una solicitud a la API de Pokémon con límite y desplazamiento
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${contador_pokemon}`);
    const data = await response.json();
    
    // Iterar sobre los resultados y obtener la URL de cada Pokémon
    data.results.forEach(pokemon => {
      var URL = pokemon.url;

      // Realizar una solicitud para obtener los detalles de cada Pokémon
      fetch(URL)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data));
    });
    
    // Incrementar el contador para la próxima carga de Pokémon
    contador_pokemon += 20;
  } catch (error) {
    // Capturar y registrar errores si la solicitud falla
    console.error('Error al cargar Pokémon:', error);
  }

  // Ocultar el indicador de carga después de un segundo
  setTimeout(function(){
    loading.style.display = 'none';
  },1000);  
}

// Función para mostrar los detalles de un Pokémon en el DOM
function mostrarPokemon(poke) {
  // Crear un nuevo elemento div y asignarle la clase 'pokemon'
  const div = document.createElement('div');
  div.classList.add('pokemon');
  
  // Establecer el contenido HTML del div con la información del Pokémon
  div.innerHTML = `
  <p class="pokemon-id-back">#${poke.id}</p>
  <div class="pokemon-imagen">
      <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
  </div>
  <div class="pokemon-info">
      <div class="nombre-contenedor">
          <p class="pokemon-id">#${poke.id}</p>
          <h2 class="pokemon-nombre">${poke.name}</h2>
      </div> 
  </div>
  `;
  
  // Agregar el div al contenedor de Pokémon en el DOM
  container.appendChild(div);
}

// Llamar a la función para cargar más Pokémon inicialmente
cargarMasPokemon();