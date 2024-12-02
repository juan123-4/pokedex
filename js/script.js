let paginaActual = 1;
const limit = 10;

const botonBuscar = document.getElementById('searchBtn');
const contenedorpokemon = document.getElementById('contenedor');
const botonAnterior = document.getElementById('prevBtn');
const botonSiguiente = document.getElementById('nextBtn');
const reiniciar = document.getElementById('resetBtn');
const buscarInput = document.getElementById('searchInput');
const favorito = document.getElementById('favoritos'); // Cambiado a 'favoritos' para coincidir con HTML

async function obtenerPokemones(pagina) {
    const offset = (pagina - 1) * limit;
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const datos = await respuesta.json();
    return datos;
}

function mostrarPokemones(datos) {
    contenedorpokemon.innerHTML = '';
    datos.results.forEach(async (pokemon) => {
        const pokemonData = await fetch(pokemon.url).then(res => res.json());
        const divpokemon = document.createElement('li');
        divpokemon.classList.add('pokemon');
        const imagen = pokemonData.sprites.other['official-artwork'].front_default;
        const nombre = pokemonData.name;
        const tipo = pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ");
        const altura = pokemonData.height; 
        const peso = pokemonData.weight;
        divpokemon.innerHTML = `
            <ul class="dentro">
                <button class="agregarfavorito" data-nombre="${nombre}" data-imagen="${imagen}" data-tipo="${tipo}" data-peso="${peso}" data-altura="${altura}">&hearts; Favorito</button>
                <li><img src="${imagen}" alt="${nombre}" class="imagen-pokemon"></li>
                <li><span><strong>${nombre}</strong></span></li>
            </ul>
        `;
        divpokemon.querySelector('img').addEventListener('click', () => {
            mostrarventana(imagen, nombre, tipo, peso, altura);
        });
        contenedorpokemon.appendChild(divpokemon);
    });

    document.querySelectorAll('.agregarfavorito').forEach(button => {
        button.addEventListener('click', (event) => {
            const { nombre, imagen, tipo, peso, altura } = event.target.dataset;
            agregarFavorito({ nombre, imagen, tipo, peso, altura });
        });
    });

    botonAnterior.disabled = !datos.previous;
    botonSiguiente.disabled = !datos.next;
}

function mostrarventana(imagen, nombre, tipo, peso, altura) {
    const priVentana = document.getElementById('ventana');
    if (priVentana) {
        document.body.removeChild(priVentana);
    }
    const ventana = document.createElement('div');
    ventana.id = 'ventana';
    ventana.classList.add('ventana');
    ventana.innerHTML = `
        <span class="close">&times;</span>
        <img src="${imagen}" alt="${nombre}" class="imagen-pokemon">
        <h2>${nombre}</h2> 
        <p><strong>Tipo:</strong> ${tipo}</p>
        <p><strong>Peso:</strong> ${peso / 10} Kg</p>
        <p><strong>Altura:</strong> ${altura / 10} m</p>
    `;
    ventana.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(ventana);
    });
    document.body.appendChild(ventana);
}

function agregarFavorito(pokemon) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos.push(pokemon);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert(`${pokemon.nombre} ha sido añadido a favoritos!`);
}

botonAnterior.addEventListener('click', async () => {
    if (paginaActual > 1) {
        paginaActual--;
        const datos = await obtenerPokemones(paginaActual);
        mostrarPokemones(datos);
    }
});

botonSiguiente.addEventListener('click', async () => {
    paginaActual++;
    const datos = await obtenerPokemones(paginaActual);
    mostrarPokemones(datos);
});

reiniciar.addEventListener('click', async () => {
    paginaActual = 1;
    const datos = await obtenerPokemones(paginaActual);
    mostrarPokemones(datos);
});

botonBuscar.addEventListener('click', async () => {
    const busqueda = buscarInput.value.toLowerCase();
    if (busqueda) {
        try {
            const datos = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`);
            const pokemonData = await datos.json();
            const imagen = pokemonData.sprites.other['official-artwork'].front_default;
            const tipo = pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ");
            const altura = pokemonData.height; 
            const peso = pokemonData.weight;
            
            mostrarventana(imagen, pokemonData.name, tipo, peso, altura);
        } catch (error) {
            alert("Pokémon no encontrado");
        }
    }
});

favorito.addEventListener('click', () => {
    window.location.href = "favoritos.html";
});

(async () => {
    const datos = await obtenerPokemones(paginaActual);
    mostrarPokemones(datos);
})();
