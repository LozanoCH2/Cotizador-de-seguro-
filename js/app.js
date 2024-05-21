//Construimos el objeto del seguro 
function Seguro(marca, year, tipo){
    this.marca=marca;
    this.year=year;
    this.tipo=tipo;
}

//Realizamos la cotización con los datos
Seguro.prototype.cotizarSeguro=function(){
    let cantidad;
    const base= 2000;
    switch(this.marca){
        case '1':
            cantidad=base*1.15;
        break;
        case '2':
            cantidad=base*1.05;
        break;
        case '3':
            cantidad=base*1.35;
        break;
        default:
            break;
    }

    //Leer el año actual y restarle el año que recibimos
    const diferencia=new Date().getFullYear()-this.year;

    //Se calcula la reduccion del  costo  ya que este reduce 3% por cada año
    cantidad-=((diferencia*3)*cantidad)/100;

    if(this.tipo==='basico'){
        cantidad *=1.30;
    }else{
        cantidad*=1.50;
    }

    return cantidad;

}

//Creamos una objeto para la interfaz del usuario, sin embargo lo dejamos vacia
function UI(){

}

//Funcion para obtener los valores de la UI
UI.prototype.llenarOpcines=()=>{
    const max=new Date().getFullYear(),     
          min= max-20;
    
    const selectYear= document.querySelector('#year');

    for(let i=max; i>min; i--){
        let optiion =document.createElement('option');
        optiion.value=i;
        optiion.textContent=i;
        selectYear.appendChild(optiion);
    }

}

UI.prototype.mostrasMensaje=(texto, tipo)=>{
    const mensaje= document.createElement('div');
    if(tipo==='error'){
        mensaje.classList.add('error');
    }else{
        mensaje.classList.add( 'correcto');
    }

    mensaje.classList.add('mensaje', 'mt-10');
    mensaje.textContent=texto;

    //Insertar el div del mensaje que acabamos de crear en el HTML
    const formulario= document.querySelector('#cotizar-seguro');
    formulario.insertBefore(mensaje,document.querySelector('#resultado'))

    setTimeout(()=>{
        mensaje.remove();
    },3000)
}


UI.prototype.mostrarResultado=(seguro, total)=>{

    const {marca, year, tipo}=seguro;

    let textoMarca;

    switch(marca){
        case '1':
            textoMarca='Americano'
        break;
        case '2':
            textoMarca='Asiatico'
        break;
        case '1':
            textoMarca='Europeo'
        break;
        default:
            break;
    }

    const div=document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML=`
    <p class="header">Tu resumen</p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span> </p>
    <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo}</span> </p>
    <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span> </p>
    <p class="font-bold">Total: <span class="font-normal">$ ${total}</span> </p>
    `;

    const resultadoDiv=document.querySelector('#resultado');
   

    const spinner=document.querySelector('#cargando');
    spinner.style.display='block';
    setTimeout(()=>{
        spinner.style.display='none';
        resultadoDiv.appendChild(div);
    }, 3000)
}


const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpcines();
})

eventListeners();
function eventListeners(){
    const formulario= document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault();

    //Leer la marca seleccionada
    const marca=document.querySelector('#marca').value;
    //Leer el año seleccionado
    const year=document.querySelector('#year').value;
    //Leer el tipo de cobertura
    const tipo=document.querySelector('input[name="tipo"]:checked').value;

    if(marca===''|| year===''||tipo===''){
        ui.mostrasMensaje('Todos los campos son obligatorios','error');
        return;
    }
    ui.mostrasMensaje('Cotizando.....', 'exito');

    const resultados=document.querySelector('#resultado div');
    if (resultados!=null){
        resultados.remove();
    }

    //Intanciando el seguro
    const seguro=new Seguro(marca, year, tipo);
    const total= seguro.cotizarSeguro();
    //Utilizar el prototype que va a cotizar

    ui.mostrarResultado(seguro,total);
    
    
}

