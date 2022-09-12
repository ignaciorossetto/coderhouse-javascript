// DECLARACION DE VARIABLES GLOBALES
let savedName = "";
let products = [];
let shopChart = [];
const envioGratis = 20000;

// CREACION DE CLASE PRODUCTOS Y SUS METODOS.

class Producto {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.stock = props.stock;
    this.price = props.price;
  }

  updateStock = (newstock) => {
    this.stock = newstock;
  };
  substractStock = (amount) => {
    if (this.stock <= 0) {
      return alert(
        `No hay stock del producto ${this.name}. El stock disponible es: ${this.stock}`
      );
    }
    this.stock -= amount;
  };

  addOneToStock = () => {
    this.stock++ ;
  };
}

// CREACION DE PRODUCTOS Y PUSHEARLOS AL CATALOGO DE PRODUCTOS

products.push(
  new Producto({
    id: 1,
    name: "Mesa",
    stock: 5,
    price: 10000,
  })
);
products.push(
  new Producto({
    id: 2,
    name: "Silla",
    stock: 5,
    price: 5000,
  })
);
products.push(
  new Producto({
    id: 3,
    name: "Mantel",
    stock: 5,
    price: 2500,
  })
);

// FUNCIONES DE SOPORTE


const inputPromptCarrito = () => {
  let input = Number(
    prompt(
      `Hola ${savedName}, Eliga el nro de articulo que quiere agregar al carrito:\n${textFunction(
        products
      )} \n 4-FINALIZAR COMPRA \n 99-ELIMINAR PRODUCTO DEL CARRITO\n 5-SALIR DEL CARRITO`
    )
  );
  return input 
}

const textFunction = (array) => {
  let displayText = "\n";
  array?.forEach((value) => (displayText += `${value.id} - ${value.name} \n`));
  return displayText;
};

const findProductInArray = (array, value, updatestock) => {
  const result = array?.find((obj) => obj.id === value);
  if (result && updatestock) {
    updateStock_and_ShopChart(result);
  }
  return result;
};

const updateStock_and_ShopChart = (result) => {
  const index = products.indexOf(result);
  let input = Number(
    prompt(
      `Cuantos productos del producto ${result?.name} quiere llevar? \n El stock disponible es: ${result?.stock}\n\n Ingrese 0 si desea volver al menu anterior`
    )
  );

  if (input > result.stock) {
    alert("No hay suficiente stock! Eliga menos cantidad!");
  } else if (input === 0) {
    return;
  } else {
    products[index].substractStock(input);
    for (i = 0; i < input; i++) {
      shopChart.push(result);
    }
    alert(`Agergo ${input} ${result.name}s al carrito`);
  }
};

const carritoTotalPrice = () => {
  let totalPrice = 0;
  shopChart.forEach((value) => {
    totalPrice += value.price;
  });
  return totalPrice;
};

const checkFreeShipping = () => {
  const totalPrice = carritoTotalPrice()
  if (totalPrice>=envioGratis){
    return true
  } else {
    return false
  }
}


const finalizarCompra = () =>{
    let envioGratis = checkFreeShipping()
    if (envioGratis){
      return alert(`Su carrito esta compuesto por los siguientes items:
                        ${textFunction(shopChart)}
                TOTAL: $${carritoTotalPrice()} (Envio Gratis!!!)

    `)
    } else {
      return alert(`Su carrito esta compuesto por los siguientes items:
      ${textFunction(shopChart)}
TOTAL: $${carritoTotalPrice()} (Acordar envio con vendedor!!)              
`)
    }
    
}

const salirDelCarrito = () =>{
  return alert(`Gracias por su visita!          
  `)
  
}

const eliminarProductoCarrito = () => {
  let productToModify = Number(
    prompt(
      `Hola ${savedName}, Eliga el nro de articulo que quiere eliminar del carrito: \n${textFunction(shopChart)}`
    )
  );
  const result = findProductInArray(shopChart, productToModify, false)

  if (result != undefined) {
    const index = shopChart.indexOf(result)
    shopChart.splice(index, 1)
    products[index].addOneToStock()
    alert(`Su carrito ahora esta compuesto por:\n ${textFunction(shopChart)}`);
  } else {
    alert("No ingreso un nro de producto valido.");
  }
  carrito(savedName);
}




// APP

const carrito = (valorPromptNombre) => {

  // Funcion carrito, pide un id de articulo por prompt, o 3 codigos para diferentes funciones (Ir a pagar, eliminar productos del carrito o salir)
  // con la funcion findProductInArray, actualizo stock y agrego al carrito, siempre que el parametro updatecarrito sea true.


  let inputCarrito = inputPromptCarrito()
  console.log(inputCarrito);
  console.log(typeof(inputCarrito));

  const resultado = findProductInArray(products, inputCarrito, true);

  if (resultado != undefined) {
    return carrito(savedName);
  }


  switch (inputCarrito) {
    case 4:
      finalizarCompra()
      break
    case 5:
      salirDelCarrito();
      break
    case 99:
      eliminarProductoCarrito()
      break
    default:
      alert('codigo incorrecto')
      carrito(savedName)
}

}

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

