let infoCliente = JSON.parse(sessionStorage.getItem("infocliente")) ?? [];
let carritoSession = JSON.parse(sessionStorage.getItem("carritoStorage")) ?? [];

const sessionStorageCarrito = document.getElementById("sessionStorageInfoCarrito");
const sessionStorageCliente = document.getElementById("sessionStorageInfoCliente");

const displaySessionStorage = () => {

  

  sessionStorageCarrito.innerHTML = "";
  sessionStorageCarrito.innerHTML = `<ul id="sessionStorageInfoCarritoLista" class="list-group">`;
  let total=0


const sessionStorageCarritoLista = document.getElementById("sessionStorageInfoCarritoLista");
sessionStorageCarritoLista.innerHTML = ''


  for (let index = 0; index < carritoSession.length; index++) {
    const element = carritoSession[index];
    total += element.quantity * element.price
  sessionStorageCarritoLista.innerHTML += `
  <li class="list-group-item">Item: ${element.productName}, Cantidad: ${element.quantity}, Precio Unitario: $${element.price}</li>
  `;
  }
  sessionStorageCarritoLista.innerHTML += `<br/><div id="sessionStorageCarritoListaTotal">TOTAL: $${total.toLocaleString()} <div/>`
  sessionStorageCarrito.innerHTML += `</ul>`;


  sessionStorageCliente.innerHTML=`

  <ul class="list-group">
    <li class="list-group-item">Nombre: ${infoCliente.nombre}</li>
    <li class="list-group-item">Mail: ${infoCliente.mail}</li>
    <li class="list-group-item">Cuil: ${infoCliente.cuil}</li>
    <li class="list-group-item">Direccion: ${infoCliente.address_street}, ${infoCliente.address_street_number}</li>
  </ul>
  
  `


};


displaySessionStorage()



