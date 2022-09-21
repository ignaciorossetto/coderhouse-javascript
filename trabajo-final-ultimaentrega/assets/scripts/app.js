//PRODUCTOS


// VARIABLES GLOBALES

const file = '../products1.json'

async function getProductsFromJson(json_file) {
  let x = await fetch(json_file);
  let y = await x.json();
  return y
}


let products = []
let carrito = JSON.parse(sessionStorage.getItem("carritoStorage")) ?? [];
const envioGratis = 20000;
let params = new URLSearchParams(document.location.search)
let currentFilter = params.get("category")




const categoryMenuHtml = document.getElementById("categoria-productos");
const modalBodyHtml = document.getElementById("modalBody");
const modalBtn = document.getElementById("modalBtn");
const borrarCarrito = document.getElementById("borrarCarrito");
const productGridHtml = document.getElementById("products_grid");
const numeroCarritoIcon = document.getElementById("carritoCount");
const numeroCarritoIconClass = document.getElementsByClassName("carritoCount")[0]

// CREACION DE CLASE PRODUCTOS Y SUS METODOS.

class Product {
  constructor(props) {
      (this.id = props.id),
      (this.productName = props.productName),
      (this.medidas = props.medidas),
      (this.price = props.price),
      (this.stock = props.stock),
      (this.image = props.image);
    this.stockAvailability = props.stockAvailability;
    this.shopBag = props.shopBag;
  }
}


// FUNCIONES UTILES

const productFinder = (id) => {
  return products.find((value) => value.id === id);
};
const checkStock = (id) => {
  const product = productFinder(id);
  if (product.stock > 0) {
    product.stockAvailability = true;
    return true;
  } else {
    product.stockAvailability = false;
    return false;
  }
};

const updateSessionStorage = () => {
  sessionStorage.setItem("carritoStorage", JSON.stringify(carrito));
};

const agregarCarrito = (id) => {
  const result = carrito.find((value) => value.id === id);
  const product = productFinder(id);
  if (result === undefined) {
    carrito.push({
      id: product.id,
      productName: product.productName,
      medidas: product.medidas,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    updateSessionStorage();
    product.stock--;
    displayProducts(currentFilter);
  } else {
    const index = carrito.indexOf(result);
    carrito[index].quantity++;
    updateSessionStorage();
    product.stock--;
    displayProducts(currentFilter);
  }
};

const updateCurrentFilter = (category) => {
  return currentFilter = category
}

const eliminarItemCarrito = (id) => {
  const result = carrito.find((value) => value.id === id);
  const product = productFinder(id);
  const index = carrito.indexOf(result);

  if (result.quantity>1){
    carrito[index].quantity--;
    updateSessionStorage();
    product.stock++;
    displayCarrito()
    displayProducts(currentFilter)
  } else {
    carrito.splice(index, 1)
    updateSessionStorage();
    product.stock++;
    displayCarrito()
    displayProducts(currentFilter)
  }
};

const eliminarCarrito = () => {
  carrito.forEach(carritoItem =>{
    const aa = products.find((value => value.id === carritoItem.id)).stock += carritoItem.quantity
    carrito = []
    updateSessionStorage();
    displayCarrito()
    displayProducts();
  })
  
};

const carritoTotalPrice = () => {
  let total = 0
  carrito.forEach((value)=> total += value.quantity*value.price)
  return total;
};

const carritoTotalQuantity = () => {
  let total = 0
  carrito.forEach((value)=> total += value.quantity)
  return total
}

const checkFreeShipping = () => {
  const totalPrice = carritoTotalPrice();
  if (totalPrice >= envioGratis) {
    return true;
  } else {
    return false;
  }
};

const checkCategories = () => {
  let categories = []
  let categoriesHtml = ''
  products.forEach((value)=> categories.push(value.category) )
  const newSet = new Set(categories)
  newSet.forEach((value)=> categoriesHtml += `
          <li>
            <a class="dropdown-item" id="${value}-filter" 
            onclick="displayProducts('${value}'), updateCurrentFilter('${value}')"
            href="#">
                    ${value}
            </a>
          </li>`)

  return categoriesHtml
}

const productoEliminadoToast = () => {
  Toastify({
    text: "Producto eliminado del carrito",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:  "linear-gradient(to right, #c56b1c, #ed0404)",
      borderRadius: "30px",
      fontWeight: "bold"

    },
    onClick: function(){} // Callback after click
  }).showToast();
}

const productoAgregadoToast = () => {
  Toastify({
    text: "Agregaste un producto al carrito",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:  "linear-gradient(to right, #a7eea7c6, #bceaa8)",

      borderRadius: "30px",
      fontWeight: "bold"

    },
    onClick: function(){} // Callback after click
  }).showToast();
}




// DISPLAY WEBAPP PRODUCTOS



const displayProducts = (category) => {


  numeroCarritoIcon.innerHTML = carritoTotalQuantity();
  numeroCarritoIconClass.innerHTML = carritoTotalQuantity();
  categoryMenuHtml.innerHTML = checkCategories()

  const displayedProducts = category === undefined ? products : products.filter((value) => value.category === category)


  if(displayedProducts.length===0){
    document.getElementById('products_grid').style.display = 'flex'
    productGridHtml.innerHTML = `<main class="proximamente__main m-0">
    <h1 class="animate__animated animate__bounce">PROXIMAMENTE</h1>
</main>`
  } else {
    document.getElementById('products_grid').style.display = 'grid'
    productGridHtml.innerHTML = "";
  



  displayedProducts.forEach((product) => {
    const avaliableProduct =
      product.stock > 0
        ? ` <a href="#" class="alm__comprar" id="agregar-item-${product.id}" >
            <i class="fa-solid fa-bag-shopping"></i>
        </a>
      `
        : `<a style="pointer-events: none" href="javascript:void(0)" id="agregar-item-${product.id}" class="alm__comprar" >Sin Stock</i></a>`;

    productGridHtml.innerHTML += `<div class="almohadones__${product.id} alm">
      <div class="img alm_position" style="
      background-image: url(${product.image});
      ">
      ${avaliableProduct}
      </div>
      <div class="info">
      <div>
      <h3>${product.productName}</h3>
      </div>
      <div>$${product.price.toLocaleString()}</div>
      <div>Stock: ${product.stock}</div>
      
      </div>
      </div>`;
  });

  displayedProducts.forEach(
    (product) =>(
      document.getElementById(`agregar-item-${product.id}`).onclick = () => {
        agregarCarrito(product.id),
        productoAgregadoToast()
      } 
    ))
  }

};

const displayCarrito = () => {
  modalBodyHtml.innerHTML = "";

  carrito.forEach(
    (carritoProduct) =>
      (modalBodyHtml.innerHTML += `
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-4">
                <img src="${carritoProduct.image}"
                    class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title">${carritoProduct.productName}</h5>
                <p class="card-text">${carritoProduct.medidas}</p>
                <p class="card-text">Precio: $${carritoProduct.price.toLocaleString()}</p>
                <p class="card-text">
                  <small class="text-muted">
                  Cantidad: ${carritoProduct.quantity}
                  <br/>
                  Total de ${carritoProduct.productName}: $${(
        carritoProduct.price * carritoProduct.quantity
      ).toLocaleString()}
                  </small>
                  </p>
                <button type="button" class="btn btn-secondary" id="eliminar-item-${carritoProduct.id}"> Eliminar producto del carrito </button>
                
              </div>
            </div>
          </div>
        </div>
        `)
  );
  


  let envioGratis = checkFreeShipping()
    ? `${carritoTotalPrice().toLocaleString()} (Envio
    Gratis!!)`
    : carritoTotalPrice().toLocaleString();

  const buttonDisplayed = carrito.length > 0 ? `style=""` :  `style="display:none"`

  modalBodyHtml.innerHTML += `
    <div class="modal-body ">
          <div class="card-body">
          <h5 class="card-title">Total</h5>
          <p class="card-text">Total : $${envioGratis} </p>
        </div>
      </div> 
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary"
          data-bs-dismiss="modal">Cerrar</button>
      <button type="button" class="btn btn-secondary"
          id='eliminar-carrito-completo' ${buttonDisplayed}>Eliminar carrito!</button>
      <button type="button" class="btn btn-primary" ${buttonDisplayed}><a href="./datospersonales.html">Pagar<a/></button>
    </div>`;

    
    document.getElementById('eliminar-carrito-completo').onclick= () => {
      Swal.fire({
        title: 'Desea borrar el carrito?',
        text: "Se eliminaran todos los productos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar carrito!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El carrito esta vacio!',
            'success'
          )
          eliminarCarrito()
        }
      })
    }

    carrito.forEach(
      (carritoProduct) =>(
        document.getElementById(`eliminar-item-${carritoProduct.id}`).onclick = () => {
          eliminarItemCarrito(carritoProduct.id),
          productoEliminadoToast()
          displayCarrito()
          
        }
      ))
    
  
};


const displayCarrito2 = () => {
  document.getElementById('responsive-modal-body').innerHTML = "";

  carrito.forEach(
    (carritoProduct) =>
      (document.getElementById('responsive-modal-body').innerHTML += `
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-4">
                <img src="${carritoProduct.image}"
                    class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title">${carritoProduct.productName}</h5>
                <p class="card-text">${carritoProduct.medidas}</p>
                <p class="card-text">Precio: $${carritoProduct.price.toLocaleString()}</p>
                <p class="card-text">
                  <small class="text-muted">
                  Cantidad: ${carritoProduct.quantity}
                  <br/>
                  Total de ${carritoProduct.productName}: $${(
        carritoProduct.price * carritoProduct.quantity
      ).toLocaleString()}
                  </small>
                  </p>
                <button type="button" class="btn btn-secondary btnGrisResponsive" id="eliminar-item-${carritoProduct.id}"> Eliminar producto del carrito </button>
                
              </div>
            </div>
          </div>
        </div>
        `)
  );
  


  let envioGratis = checkFreeShipping()
    ? `${carritoTotalPrice().toLocaleString()} (Envio
    Gratis!!)`
    : carritoTotalPrice().toLocaleString();

  const buttonDisplayed = carrito.length > 0 ? `style=""` :  `style="display:none"`


  document.getElementById('responsive-modal-body').innerHTML += `
    <div class="modal-body ">
          <div class="card-body">
          <h5 class="card-title">Total</h5>
          <p class="card-text">Total : $${envioGratis} </p>
        </div>
      </div> 
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary btnGrisResponsive"
          data-bs-dismiss="modal">Cerrar</button>
      <button type="button" class="btn btn-secondary btnGrisResponsive"
          id='eliminar-carrito-completo' ${buttonDisplayed}>Eliminar carrito!</button>
      <button type="button" class="btn btn-primary btnVerdeResponsive" ${buttonDisplayed}><a href="./datospersonales.html">Pagar<a/></button>
    </div>`;

    
    document.getElementById('eliminar-carrito-completo').onclick= () => {
      Swal.fire({
        title: 'Desea borrar el carrito?',
        text: "Se eliminaran todos los productos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar carrito!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El carrito esta vacio!',
            'success'
          )
          eliminarCarrito()
        }
      })
    }

    carrito.forEach(
      (carritoProduct) =>(
        document.getElementById(`eliminar-item-${carritoProduct.id}`).onclick = () => {
          eliminarItemCarrito(carritoProduct.id),
          productoEliminadoToast()
          displayCarrito2()
          
        }
      ))
    
  
};



// EVENTS

// display carrito

modalBtn.addEventListener("click", displayCarrito);
document.getElementById('sandwichmenu').addEventListener("click", displayCarrito2);


window.onload = async() =>{
  products = await getProductsFromJson(file)
  await displayProducts(currentFilter);
}




