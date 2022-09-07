// PRUEBA DE CREACION DE OBJETO CON CLASS

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

// OBJETOS DINAMICOS USADOS PARA EL TP

let productText = "";
let carritoText = "";
let carritoPrice = 0;
let savedName = "";
let carritoArray = [];
let productosArray = [];

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

productosArray.push(producto1);
productosArray.push(producto2);


// FUNCIONES REUTILIZABLES PARA MODIFICAR LOS TEXTOS DE PRODUCTOS Y TEXTO Y PRECIO TOTAL DE CARRITO

const productTextFunction = () => {
  productText = "";
  for (i = 0; i <= productosArray.length - 1; i++) {
    productText += `${productosArray[i].id}-${productosArray[i].name} \n`;
  }
};
const carritoTextFunction = () => {
  carritoText = "";
  for (i = 0; i <= carritoArray.length - 1; i++) {
    carritoText += `\n ${carritoArray[i].id}-${carritoArray[i].name} \n`;
  }
};

const carritoTotalPrice = () => {
  carritoPrice = 0;
  for (i = 0; i <= carritoArray.length - 1; i++) {
    carritoPrice += carritoArray[i].price;
  }
};


// FUNCIONES PRINCIPALES

const carrito = (valorPromptNombre) => {
  
  productTextFunction()

  let idProductoOSalir = Number(
    prompt(
      `Hola ${valorPromptNombre}, Eliga el nro de articulo que quiere agregar al carrito:\n${productText} \n 3-FINALIZAR COMPRA \n 99-ELIMINAR PRODUCTO DEL CARRITO\n 4-SALIR DEL CARRITO`
    )
  );


  if (idProductoOSalir === 1) {

    const pickedProduct = productosArray[0];
    carritoArray.push(pickedProduct);
    carrito(savedName);


  } else if (idProductoOSalir === 2) {

    const pickedProduct = productosArray[1];
    carritoArray.push(pickedProduct);
    carrito(savedName);

  } else if (idProductoOSalir === 3) {
    
    carritoTotalPrice()
    carritoTextFunction()
    return alert(`Su carrito esta compuesto por los siguientes items:
                        ${carritoText}
                TOTAL: $${carritoPrice}              
    `);

  } else if (idProductoOSalir === 4) {

    return alert(`Gracias por su visita!          
    `);

  } else if (idProductoOSalir === 99) {
    
    carritoTextFunction()
    let ProductToModify = Number(
      prompt(
        `Hola ${savedName}, Eliga el nro de articulo que quiere eliminar del carrito: \n${carritoText}`
      )
    );
    let prod = carritoArray.indexOf(productosArray[ProductToModify - 1]);
    if (prod != -1) {
      carritoArray.splice(prod, 1);
      carritoTextFunction()
      alert(`Su carrito ahora esta compuesto por:\n ${carritoText}`);
    } else {
      alert("No ingreso un nro de producto valido.");
    }
    carrito(savedName);

  } else {

    alert("El codigo de item es incorrecto!");
    carrito(savedName);

  }
};

function calcularCarrito() {

  const promptNombre = prompt("Ingrese su nombre o SALIR si quiere salir");
  const exitCode = "SALIR".toLowerCase();

  if (promptNombre.toLowerCase() === exitCode) {
    return alert("Gracias por su visita!");
  } else if (promptNombre.length) {
    savedName = promptNombre;
    return carrito(promptNombre);
  } else {
    alert("No ingreso ningun nombre");
    calcularCarrito();
  }
  
}

calcularCarrito();
