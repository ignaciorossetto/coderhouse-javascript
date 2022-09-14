//PRODUCTOS 

let productsArray = [
  {
    id: 1,
    productName: "Almohadon 1",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 0,
    image: "../../assets/multimedia/almohadones/almohadon_caracol_b_b.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 2,
    productName: "Almohadon 2",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 0,
    image:
      "../../assets/multimedia/almohadones/almohadon_caracol_b_b_flecos.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 3,
    productName: "Almohadon 3",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 2,
    image:
      "../../assets/multimedia/almohadones/almohadon_caracol_n_n_flecos.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 4,
    productName: "Almohadon 4",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 3,
    image: "../../assets/multimedia/almohadones/almohadon_mediapluma_b_b.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 5,
    productName: "Almohadon 5",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 2,
    image:
      "../../assets/multimedia/almohadones/almohadon_mediapluma_b_b_flecos.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 6,
    productName: "Almohadon 6",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 3,
    image: "../../assets/multimedia/almohadones/almohadon_mediapluma_b_n.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 7,
    productName: "Almohadon 7",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 3,
    image: "../../assets/multimedia/almohadones/almohadon_mediapluma_n_n.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 8,
    productName: "Almohadon 8",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 10,
    image: "../../assets/multimedia/almohadones/almohadon_pluma_b_b_flecos.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 9,
    productName: "Almohadon 9",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 6,
    image: "../../assets/multimedia/almohadones/almohadon_pluma_b_n.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 10,
    productName: "Almohadon 10",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 5,
    image: "../../assets/multimedia/almohadones/almohadon_pluma_b_n.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 11,
    productName: "Almohadon 11",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 3,
    image: "../../assets/multimedia/almohadones/almohadon_pluma_b_n.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 12,
    productName: "Almohadon 12",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 3,
    image: "../../assets/multimedia/almohadones/almohadon_pluma_b_n.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 13,
    productName: "Almohadon 13",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 3,
    image: "../../assets/multimedia/almohadones/almohadon_pluma_b_n.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 14,
    productName: "Almohadon 14",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 3,
    image: "../../assets/multimedia/almohadones/almohadon_pluma_b_n.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
  {
    id: 15,
    productName: "Almohadon 15",
    medidas: "Medidas 60x60",
    price: 10000,
    stock: 3,
    image: "../../assets/multimedia/almohadones/almohadon_pluma_b_n.jpg",
    stockAvailability: true,
    shopBag: 0,
  },
];

// VARIABLES GLOBALES
const url = document.URL.split("/")[6].split(".")[0];

let products = [];
let carrito = [];
const envioGratis = 20000;

const modalBodyHtml = document.getElementById("modalBody");
const modalBtn = document.getElementById("modalBtn");
const productGridHtml = document.getElementById("products_grid");
const numeroCarritoIcon = document.getElementById('carritoCount')


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
    this.stock++;
  };

  checkAvailability = () => {
    if (this.stock > 0) {
      this.stockAvailability = true;
      return true;
    } else {
      this.stockAvailability = false;
      return false;
    }
  };

  quantityInShopBag = (operation) => {
    if (operation === "sum") {
      this.shopBag++;
    } else if (operation === "sub") {
      this.shopBag--;
    }
  };

  totalPriceShopBagItem = () => {
    return this.shopBag * this.price;
  };
}


// CREACION DE PRODUCTOS

productsArray.forEach((product) =>
  products.push(
    new Product({
      id: product.id,
      productName: product.productName,
      medidas: product.medidas,
      price: product.price,
      stock: product.stock,
      image: product.image,
      stockAvailability: product.stockAvailability,
      shopBag: product.shopBag,
    })
  )
);


// FUNCIONES UTILES

const productFinder = (id) => {
  return products.find((value) => value.id === id);
};

const agregarCarrito = (id) => {
  const product = productFinder(id);

  if (product.shopBag === 0) {
    product.substractStock(1);
    product.quantityInShopBag("sum");
    carrito.push(product);
    return displayProducts();
  } else {
    product.substractStock(1);
    product.quantityInShopBag("sum");
    return displayProducts();
  }
};

const carritoTotalPrice = () => {
  let totalPrice = 0;
  carrito.forEach((value) => {
    totalPrice += value.totalPriceShopBagItem();
  });
  return totalPrice;
};

const carritoTotalQuantity= () => {
  let contador = 0
  carrito.forEach((value) => contador += value.shopBag)
  return contador
  }

const checkFreeShipping = () => {
  const totalPrice = carritoTotalPrice();
  if (totalPrice >= envioGratis) {
    return true;
  } else {
    return false;
  }
};

const eliminarProductoCarrito = (id) => {
  const product = productFinder(id)
  const index = carrito.indexOf(product)
  if (product.shopBag === 1){
    carrito.splice(index, 1)
    product.addOneToStock()
    product.quantityInShopBag('sub')
    displayProducts()
    displayCarrito()
  } else {
    product.addOneToStock()
    product.quantityInShopBag('sub')
    displayProducts()
    displayCarrito()
  }
}


// DISPLAY WEBAPP PRODUCTOS

const displayProducts = () => {
  numeroCarritoIcon.innerHTML = carritoTotalQuantity()
  productGridHtml.innerHTML = "";
  products.forEach((product) => {
    const avaliableProduct = product.checkAvailability()
      ? ` <a href="#" class="alm__comprar" onclick="agregarCarrito(${product.id})"'>
            <i class="fa-solid fa-bag-shopping"></i>
        </a>
      `
      : '<a style="pointer-events: none" href="javascript:void(0);" class="alm__comprar" >Sin Stock</i></a>';

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

};




const displayCarrito = () => {

  modalBody.innerHTML = "";
  if (!carrito) {
    modalBody.innerHTML = "Carrito vacio!";
  } else {
    carrito.forEach(
      (carritoProduct) =>
        (modalBody.innerHTML += `
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
                  Cantidad: ${carritoProduct.shopBag}
                  <br/>
                  Total de ${carritoProduct.productName}: $${carritoProduct
          .totalPriceShopBagItem()
          .toLocaleString()}
                  </small>
                  </p>
                <button type="button" class="btn btn-secondary" 
                onclick="eliminarProductoCarrito(${carritoProduct.id})"> Eliminar producto del carrito </button>
                
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

    modalBody.innerHTML += `
      <div class="modal-body ">
            <div class="card-body">
            <h5 class="card-title">Total</h5>
            <p class="card-text">Total : $${envioGratis} </p>
          </div>
        </div> 
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary"
            data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Comprar</button>
      </div>`;
  }
};

// if (url === "almohadones") {
//   displayProducts();
// }

// EVENTS

  // display carrito

modalBtn.addEventListener("click", displayCarrito);



displayProducts()






