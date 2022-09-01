class Producto {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.stock = props.stock;
    this.price = props.price;
  }
}

const datosproducto = {
  id: 1,
  name: "Mesa",
  stock: 100,
  price: 15000,
};

const producto = new Producto(datosproducto);

const producto1 = {
  id: 1,
  name: "Mesa",
  stock: 100,
  price: 15000,
};
const producto2 = {
  id: 2,
  name: "Silla",
  stock: 100,
  price: 3500,
};

let carritoTotal = 0;
let carritoTexto = "";
let savedName = ''

const carrito = (valorPromptNombre) => {
  let idProductoOSalir = Number(prompt(
    `Hola ${valorPromptNombre}, Eliga el nro de articulo que quiere agregar al carrito: \n 1-MESA \n 2-SILLA \n 3-FINALIZAR COMPRA \n 4-SALIR DEL CARRITO`
  ))
  if (idProductoOSalir === 1) {
    let nombre = producto1.name
    let precio = producto1.price;
    carritoTexto += `${nombre}, `
    carritoTotal += precio;
    carrito(savedName)
  } else if (idProductoOSalir === 2) {
    let nombre = producto2.name
    let precio = producto2.price;
    carritoTexto += `${nombre}, `
    carritoTotal += precio;
    carrito(savedName)
  } else if (idProductoOSalir === 3) {
    return alert(`Su carrito esta compuesto por los siguientes items:\n
                PRODUCTOS: ${carritoTexto},\n
                TOTAL: $${carritoTotal}              
    `)
  }  else if (idProductoOSalir === 4) {
    return alert(`Gracias por su visita!          
    `)
  } else {
    alert('El codigo de item es incorrecto!')
    carrito(savedName)
  }
};

function calcularCarrito() {
  const promptNombre = prompt("Ingrese su nombre o SALIR si quiere salir");
  const exitCode = 'SALIR'.toLowerCase()
  if (promptNombre.toLowerCase() === exitCode) {
    return alert("Gracias por su visita!")
  } else if (promptNombre.length) {
    savedName = promptNombre
    return carrito(promptNombre);
  } else {
    alert("No ingreso ningun nombre");
    calcularCarrito();
  }
}

calcularCarrito()
