//Creacion de Selectores
const container =document.querySelector('.container');
const resultado =document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// Creamos un evento que escuchara  la ventana de la pagina web
window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(leer){
    leer.preventDefault();


    //Validadcion de formulario
    //Guardamos en una variable el valor de  la cuidad en  una variable con .value
    const cuidad=document.querySelector('#ciudad').value;
    const pais =document.querySelector('#pais').value;

    if(cuidad===''||pais===""){
        mostrarError("Ambos campos son obligarotios");

    }else{
        console.log(cuidad)
        console.log(pais)
    }


    //Consultar la API
    consultarAPI(cuidad,pais);

    console.log("Buscando Clima");

}

function mostrarError(mensaje){
    console.log(mensaje);
    const alerta=document.querySelector('.bandera');
    //Comprobaremos si existe un elemento llamado a alerta si no existe lo creamos y si existe saltamos su cracion para que no se repita
    if(!alerta){
     //Crear Alerta
    const alerta=document.createElement('div');
    alerta.classList.add('bandera','bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center')

    alerta.innerHTML= `
        <strong class="font-bold"> Error!</strong>
        <span>${mensaje}</span>
    `
    container.appendChild(alerta);

    //Eliminar alerta
        setTimeout(()=>{
            alerta.remove()
        },3000)
    }
}

function consultarAPI(ciudad,pais){
    const appId = 'c88d7c985dfdc46752a4e2d8aed54ddc';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    console.log(url)
    //Promesa
    fetch(url)
        .then(respuesta=>respuesta.json)
        .then(datos=>console.log(datos))
}

function consultarAPI(ciudad, pais ) {
    // Consultar la API e imprimir el Resultado...

// leer la url  y agregar el API key
const appId = 'ff7056e94f51c768a63295faff658fc0';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;



// query con fetch api
//Promesa
//Consulta

Spinner();

fetch(url)
  .then(respuesta => {
    return respuesta.json();
  })
  .then(datos => {
    limpiarHTML();
    console.log(datos);
    if(datos.cod=='404'){
        mostrarError("Cuidad no encontrada")
        return;
    }
    //Imprime las respuesta en HTML
    mostrarClima(datos);
  });

  function mostrarClima(datos){
    //Aplicamos dstructuracion de un obejero detron de un objeto de los datos obtenidos
    const {name,main:{humidity,pressure,temp,temp_max,temp_min}}=datos
    console.log(humidity)
    console.log(pressure)
  
    const nombreCiudad= document.createElement('p');
    nombreCiudad.innerHTML=`El clima en ${name}`;
    nombreCiudad.classList.add('font-bold','text-4xl')
    const centigrados= trasformacion_kelvin_centigrados(temp)
    const max=trasformacion_kelvin_centigrados(temp_max);
    const min=trasformacion_kelvin_centigrados(temp_min);
   

    const actual=document.createElement('p');
    actual.innerHTML= `${centigrados} &#8451`;
    actual.classList.add('font-bold','text-6xl');


    const tempMaxima=document.createElement('p');
    tempMaxima.innerHTML=`Max: ${max} &#8451`;
    tempMaxima.classList.add('text-xl');

    const tempMinima=document.createElement('p');
    tempMinima.innerHTML=` Min: ${min} &#8451`
    tempMinima.classList.add('text-xl');
    
    climatico(centigrados)
    const resultadoDiv=document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    resultado.appendChild(resultadoDiv);
    

}
}

function trasformacion_kelvin_centigrados(grados){
    return parseInt(grados-273.15);
}


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){
    limpiarHTML();
    const divSpinner= document.createElement('div');
    divSpinner.classList.add('sk-chase');
    
    divSpinner.innerHTML= `
    
         <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>

    
    `;
    resultado.appendChild(divSpinner);
}
function climatico(temperatura){
    const fondo=document.querySelector('body');
    const container=document.querySelector('container');
    if(temperatura<-10){
        console.log("Artico")
        fondo.style.backgroundImage = "url('../img/Artico.jpg')";
    }else if((temperatura>=-10)&&(temperatura<5)){
        console.log("Invierno")
        fondo.style.backgroundImage = "url('../img/invierno.jpg')";
    }else if((temperatura>=-5)&&(temperatura<15)){
        console.log("Frio")
        fondo.style.backgroundImage = "url('../img/frio.jpg')";
    }else if((temperatura>=15)&&(temperatura<24)){
        
        fondo.style.backgroundImage = "url('../img/luvia.jpg')";
    }else if((temperatura>=24)&&(temperatura<28)){
        console.log("Soleado")
        fondo.style.backgroundImage = "url('../img/summer.jpg')";
        
        
    }else if((temperatura>=28)&&(temperatura<35)){
        console.log("Sumer")
        fondo.style.backgroundImage = "url('../img/soleado.jpg')";
        
        
    }else if(temperatura>=35){
        console.log("Infieno")
        fondo.style.backgroundImage = "url('../img/calor.jpg')";
    }else{
        fondo.style.backgroundImage = "url('../img/fondo.jpg')";
    }
}