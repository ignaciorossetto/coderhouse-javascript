let infoCliente = {}


const validateInputs = (input) =>{
    for(let i = 0; i < input.length; i++){
        if(input[i].required === true){
            if (input[i].value.length === 0){
                alert(`El campo ${input[i].placeholder} esta vacio!`)
                return false
            } else {
                infoCliente[input[i].getAttribute('datainfo')] = input[i].value
            }
        } 
    } 
    return true

}

document.getElementById('contacto_pagar').addEventListener('click', ()=>{
    const aa = document.getElementsByClassName('input_value')
    let isFormValid = validateInputs(aa)
    if (isFormValid === true){
        sessionStorage.setItem('infocliente', JSON.stringify(infoCliente))
        window.location.href = "./pago.html";
        
    } else {
        
    }
})

