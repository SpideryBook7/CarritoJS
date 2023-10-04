// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

// Funciones
const agregarCurso = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

const eliminarCurso = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

const vaciarCarrito = () => {
    // Forma Lenta
    // contenedorCarrito.innerHTML = '';
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

// Leer el contenido del elemento html
const leerDatosCurso = (curso) => {
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si ya existe el elemento en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregar elementos al arreglo de carritos
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en HTML
const carritoHTML = () => {

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src='${imagen}' width='100'>
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
        `;
        // Agrega el objeto de carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

const cargarEventListener = () => {
    // Agrega evento a botones agregar curso
    listaCursos.addEventListener('click', agregarCurso);
    
    // Agrega evento elemento dle carrito
    carrito.addEventListener('click', eliminarCurso)
    
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}
cargarEventListener();