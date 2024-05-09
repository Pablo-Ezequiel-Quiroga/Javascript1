document.addEventListener('DOMContentLoaded', function() {
  cargarInstrumentos();
  actualizarCarrito();
});

function cargarInstrumentos() {
  fetch('instrumentos.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('No se pudo cargar los datos de los instrumentos.');
          }
          return response.json();
      })
      .then(data => {
          mostrarInstrumentos(data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

function agregarAlCarrito(nombre, tipo, precio) {
  const instrumento = { nombre, tipo, precio };
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

function finalizarCompra() {
  localStorage.removeItem('carrito');
  actualizarCarrito();
}

function actualizarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoContainer = document.getElementById('carrito');
  carritoContainer.innerHTML = '';
  let total = 0;
  carrito.forEach((instrumento, index) => {
      const instrumentoDiv = document.createElement('div');
      instrumentoDiv.textContent = `${instrumento.nombre} - ${instrumento.tipo} - Precio: $${instrumento.precio}`;

      total += instrumento.precio;

      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', () => {
          eliminarDelCarrito(index);
      });

      instrumentoDiv.appendChild(botonEliminar);
      carritoContainer.appendChild(instrumentoDiv);
  });

  const totalDiv = document.createElement('div');
  totalDiv.textContent = `Total: $${total}`;
  carritoContainer.appendChild(totalDiv);
}

function mostrarInstrumentos(instrumentos) {
  const instrumentosContainer = document.getElementById('instrumentos');
  instrumentos.forEach(instrumento => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('instrumento');
      tarjeta.innerHTML = `
          <img src="${instrumento.imagen}" alt="${instrumento.nombre}">
          <h3>${instrumento.nombre}</h3>
          <p>${instrumento.tipo} - Precio: $${instrumento.precio}</p>
      `;

      const botonAgregar = document.createElement('button');
      botonAgregar.textContent = 'Agregar';
      botonAgregar.addEventListener('click', () => {
          agregarAlCarrito(instrumento.nombre, instrumento.tipo, instrumento.precio);
      });

      tarjeta.appendChild(botonAgregar);
      instrumentosContainer.appendChild(tarjeta);
  });
}