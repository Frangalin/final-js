const titulo = document.querySelector("#titulo"),
  autor = document.querySelector("#autor"),
  isbn = document.querySelector("#isbn"),
  categoria = document.querySelector("#categoria"),
  precio = document.querySelector("#precio"),
  img = document.querySelector("#img"),
  search = document.querySelector("#search"),
  tbody = document.querySelector("#table-body"),
  btnGuardar = document.querySelector("#btnGuardar");
const radios = document.querySelectorAll('input[type="radio"]');

const inventario = [
  {
    titulo: "El resplandor",
    autor: "Stephen King",
    isbn: "36515615",
    categoria: "Novela",
    precio: 8000,
    img: "http://boutiquedezothique.es/793-large_default/cuentos-completos-edgar-allan-poe.jpg",
  },
  {
    titulo: "Cementerio de animales",
    autor: "stephen king",
    isbn: "261655265",
    categoria: "Terror",
    precio: 7500,
    img: "http://d2r9epyceweg5n.cloudfront.net/stores/001/421/275/products/king_quienpierdepaga_libro3d1-186af08b4fbf47f81116071041288636-640-0.png",
  },
];

let libros;
if (JSON.parse(localStorage.getItem("inventario"))) {
  libros = JSON.parse(localStorage.getItem("inventario"));
} else {
  libros = [];
}

function Libro(titulo, autor, isbn, categoria, precio, img) {
  this.titulo = titulo;
  this.autor = autor;
  this.isbn = isbn;
  this.categoria = categoria;
  if (precio == "") {
    this.precio = 1;
  } else {
    this.precio = parseFloat(precio);
  }

  if (img == '') {
    this.img = `https://via.placeholder.com/150`;
  } else {
    this.img = img;
  }
}

function cargarInventario(arr, libro) {
  return arr.push(libro);
}

function guardarLS(arr) {
  localStorage.setItem("inventario", JSON.stringify(arr));
}
function guardarLS(arr, key) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function recuperarLS(key) {
  return JSON.parse(localStorage.getItem(key));
}


function filtrar(arr, filtro, param) {
  return arr.filter((el) => {
    if (param == "precio") {
      return el[`${param}`] <= parseFloat(filtro);
    } else {
      return el[`${param}`].includes(filtro);
    }
  });
}


function crearHtml(arr) {
  tbody.innerHTML = "";

  let html = "";
  for (const item of arr) {
    html = `<tr>
              <td>${item.titulo}</td>
              <td>${item.autor}</td>
              <td>${item.isbn}</td>
              <td>${item.categoria}</td>
              <td>${item.precio}</td>
              <td><img src="${item.img}"/></td>
              <td><button class="btn red" id="${item.isbn}">Borrar</button></td>
            </tr>`;
    tbody.innerHTML += html;
  }

  const arrayBotones = document.querySelectorAll('td .btn');
  arrayBotones.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log(btn.id);
      libros = libros.filter(el => el.isbn != btn.id);
      guardarLS(libros);
      crearHtml(libros)
    })
  })

}

function limpiarCampos() {
  titulo.value = "";
  autor.value = "";
  isbn.value = "";
  categoria.value = "";
  precio.value = "";
  img.value = "";
}

guardarLS(libros);
crearHtml(libros);

//Listeners
btnGuardar.addEventListener("click", () => {
  const nuevoLibro = new Libro(
    titulo.value,
    autor.value,
    isbn.value,
    categoria.value,
    precio.value,
    img.value
  );
  cargarInventario(libros, nuevoLibro);
  limpiarCampos();
  guardarLS(libros);
  crearHtml(libros);
});


search.addEventListener("input", () => {
  let nuevoFiltro = filtrar(libros, search.value, "titulo");
  crearHtml(nuevoFiltro);
});

for (const radio of radios) {
  console.log(radio);
  radio.addEventListener('change', () => {
    if (radio.checked) {
      search.addEventListener("input", () => {
        let nuevoFiltro = filtrar(libros, search.value, radio.value);
        crearHtml(nuevoFiltro);
      });

    }
  })
}
