// document.addEventListener('DOMContentLoaded', () => {
//     const contenedorFavoritos = document.getElementById('contenedor-favoritos');
//     const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

//     if (favoritos.length > 0) {
//         favoritos.forEach(pokemon => {
//             const divpokemon = document.createElement('li');
//             divpokemon.classList.add('pokemon');
//             divpokemon.innerHTML = `
//                 <ul class="dentro">
//                     <li><img src="${pokemon.imagen}" alt="${pokemon.nombre}" class="imagen-pokemon"></li>
//                     <li><span><strong>${pokemon.nombre}</strong></span></li>
//                     <li><p><strong>Tipo:</strong> ${pokemon.tipo}</p></li>
//                     <li><p><strong>Peso:</strong> ${pokemon.peso / 10} Kg</p></li>
//                     <li><p><strong>Altura:</strong> ${pokemon.altura / 10} m</p></li>
//                 </ul>
//             `;
//             contenedorFavoritos.appendChild(divpokemon);
//         });
//     } else {
//         contenedorFavoritos.innerHTML = "<p>No hay Pokémon favoritos guardados</p>";
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const contenedorFavoritos = document.getElementById('contenedor-favoritos');
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoritos.length > 0) {
        favoritos.forEach(pokemon => {
            const divpokemon = document.createElement('li');
            divpokemon.classList.add('pokemon');
            divpokemon.innerHTML = `
                <ul class="dentro">
                    <li><img src="${pokemon.imagen}" alt="${pokemon.nombre}" class="imagen-pokemon"></li>
                    <li><span><strong>${pokemon.nombre}</strong></span></li>
                    <li><p><strong>Tipo:</strong> ${pokemon.tipo}</p></li>
                    <li><p><strong>Peso:</strong> ${pokemon.peso / 10} Kg</p></li>
                    <li><p><strong>Altura:</strong> ${pokemon.altura / 10} m</p></li>
                </ul>
            `;
            contenedorFavoritos.appendChild(divpokemon);
        });
    } else {
        contenedorFavoritos.innerHTML = "<p>No hay Pokémon favoritos guardados</p>";
    }
});

function regresar() {
    window.location.href = "index.html";
}


