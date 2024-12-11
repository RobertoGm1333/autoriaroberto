const botonResena = document.querySelectorAll('.boton-resena button');


botonResena.forEach(boton => {
    boton.addEventListener('click', () => {
        const categoriaSeleccionada = boton.textContent.trim(); 
        mostrarPeliculas(categoriaSeleccionada);
    });
});