// DECLARACION VARIABLES GLOBALES

let carrito = JSON.parse(sessionStorage.getItem("carritoStorage")) ?? [];

const envioGratis = 20000;

const categoryMenuHtml = document.getElementById("categoria-productos");
const modalBodyHtml = document.getElementById("modalBody");
const modalBtn = document.getElementById("modalBtn");
const borrarCarrito = document.getElementById("borrarCarrito");
const productGridHtml = document.getElementById("products_grid");

const numeroCarritoIcon = document.getElementById("carritoCount");

// DECLARACION FUNCIONES UTILES

const carritoTotalQuantity = () => {
  let total = 0;
  carrito.forEach((value) => (total += value.quantity));
  numeroCarritoIcon.innerHTML = total;
};

const updateSessionStorage = () => {
  sessionStorage.setItem("carritoStorage", JSON.stringify(carrito));
};

const carritoTotalPrice = () => {
  let total = 0;
  carrito.forEach((value) => (total += value.quantity * value.price));
  return total;
};

const checkFreeShipping = () => {
  const totalPrice = carritoTotalPrice();
  if (totalPrice >= envioGratis) {
    return true;
  } else {
    return false;
  }
};

const eliminarItemCarrito = (id) => {
  const result = carrito.find((value) => value.id === id);
  const index = carrito.indexOf(result);

  if (result.quantity > 1) {
    carrito[index].quantity--;
    updateSessionStorage();
    displayCarrito();
    carritoTotalQuantity();
  } else {
    carrito.splice(index, 1);
    updateSessionStorage();
    displayCarrito();
    carritoTotalQuantity();
  }
};

const eliminarCarrito = () => {
  carrito.forEach((carritoItem) => {
    carrito = [];
    updateSessionStorage();
    displayCarrito();
    carritoTotalQuantity();
  });
};

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

// DISPLAYS

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

  const eliminarCarritoButton = carrito.length > 0 ? `style=""` :  `style="display:none"`

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
          id='eliminar-carrito-completo' ${eliminarCarritoButton}>Eliminar carrito!</button>
      <button type="button" class="btn btn-primary"><a href="./datospersonales.html">Pagar<a/></button>
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
          
        }
      ))
    
  
};

modalBtn.addEventListener("click", displayCarrito);

carritoTotalQuantity();
