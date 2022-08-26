let carrito = 0;
let totalBool = true;
let producto = 0


while (totalBool) {
  producto = Number(
    prompt(
      "Valor del producto ingresado al carrito o -1 cuando haya terminado."
    )
  );
  if (producto === -1) {
    totalBool = false;
  } else {
  carrito += producto;
  }
}
alert(`El total a cobrar es ${carrito}`);
