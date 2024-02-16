/**************/
/* Este script contiene las funciones que dan paso al inicio del visor*/

// Variables inniciales
var versionMovil = false;


/*Funciones para el inicio de la app*/
document.addEventListener("DOMContentLoaded", function () {
    // Simular un retraso para propósitos de demostración
    detectTouch();
});

function detectTouch(){
    if (navigator.maxTouchPoints > 0){
        const estiloMovil = document.querySelector('link[href="/main/css/css/responsive.css"]');
		estiloMovil.media = 'screen'; // Habilitar la hoja de estilo móvil
		versionMovil=true;
        console.log("Entra en táctil")
    }
    else{
        const estiloEscritorio = document.querySelector('link[href="/main/css/css/styloIndex.css"]');
		estiloEscritorio.media = 'screen'; // Habilitar la hoja de estilo escritorio
        console.log("Entra e escritorio")
    }
}

// Funcion que determina el entorno 
function selectMediaPanel(){
    // Mostrar la ventana modal después de cargar
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Obtener los botones y la ventana modal
    var mobileBtn = document.getElementById("mobileBtn");
    var desktopBtn = document.getElementById("desktopBtn");

    // Agregar eventos a los botones
    mobileBtn.onclick = function () {
        modal.style.display = "none";
        showContent("movil");
    };

    desktopBtn.onclick = function () {
        modal.style.display = "none";
        showContent("ordenador");
        document.getElementById("game-panel-buttons").style.display = "none";
    };

// Función para mostrar el contenido después de la selección
function showContent(tipoDispositivo) {

    if (tipoDispositivo=="movil"){
        // Si hay puntos de contacto táctil, cargamos el estilo móvil
		const estiloMovil = document.querySelector('link[href="/main/css/css/responsive.css"]');
		estiloMovil.media = 'screen'; // Habilitar la hoja de estilo móvil
		versionMovil=true;
        document.getElementById("loader").style.display = "none";

        // Ahora puedes usar la variable tipoDispositivo según tus necesidades
        console.log("Tipo de dispositivo seleccionado para CSS: " + tipoDispositivo);
    }
       

    else{
        // Si no hay puntos de contacto táctil, eliminamos la hoja de estilo móvil (si existe)
		const estiloEscritorio = document.querySelector('link[href="/main/css/css/styloIndex.css"]');
		estiloEscritorio.media = 'screen'; // Habilitar la hoja de estilo escritorio

        // Ahora puedes usar la variable tipoDispositivo según tus necesidades
        console.log("Tipo de dispositivo seleccionado para CSS: " + tipoDispositivo);
        document.getElementById("loader").style.display = "none";
    }
       
    }
   
}

function changeModeMedia(){
    document.addEventListener('DOMContentLoaded', function () {
        // Botón para cambiar entre modos
        var modoBoton = document.getElementById('modalMediaButton');
    
        modoBoton.addEventListener('click', function () {
            selectMediaPanel();
        });
    

    });
}





if (navigator.maxTouchPoints > 0){
    $(document).ready(function() {
       // initCoords();
    });	
   // L.control.locate().addTo(map);
    }

    