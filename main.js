document.addEventListener('DOMContentLoaded', function() {
    const instrumentosContainer = document.getElementById('instrumentos');
    const carritoContainer = document.getElementById('carrito');

    function agregarAlCarrito(nombre, tipo) {
        const instrumento = { nombre: nombre, tipo: tipo };
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(instrumento);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    function eliminarDelCarrito(index) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    function actualizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoContainer.innerHTML = '';
        carrito.forEach((instrumento, index) => {
            const instrumentoDiv = document.createElement('div');
            instrumentoDiv.textContent = `${instrumento.nombre} - ${instrumento.tipo}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                eliminarDelCarrito(index);
                alert('Instrumento eliminado del carrito');
            });

            instrumentoDiv.appendChild(botonEliminar);
            carritoContainer.appendChild(instrumentoDiv);
        });
    }

    const instrumentos = [
        { nombre: "Guitarra", tipo: "Cuerda" },
        { nombre: "Batería", tipo: "Percusión" },
        { nombre: "Teclado", tipo: "Teclado" },
        { nombre: "Saxofón", tipo: "Viento" },
        { nombre: "Violín", tipo: "Cuerda" },
        { nombre: "Trompeta", tipo: "Viento" }
    ];

    instrumentos.slice(0, 6).forEach(instrumento => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('instrumento');
        tarjeta.innerHTML = `<h3>${instrumento.nombre}</h3><p>${instrumento.tipo}</p>`;
        
        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar';
        botonAgregar.addEventListener('click', () => {
            agregarAlCarrito(instrumento.nombre, instrumento.tipo);
            alert('Instrumento agregado al carrito');
        });

        tarjeta.appendChild(botonAgregar);
        instrumentosContainer.appendChild(tarjeta);
    });

    actualizarCarrito();
});