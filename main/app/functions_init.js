

// Funciones para abrir paneles 
function openLayerTree(){
   

    const toggleButton = document.getElementById("toggleButton");
const panel = document.getElementById("panel");




toggleButton.addEventListener('click', () => {
    if (panel.style.display == 'none') {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
 
});

// Evitar la propagación del evento click al panel
panel.addEventListener('click', (e) => {
    e.stopPropagation();
});
// Evitar la propagación del evento click al botón
toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
});


    
   
    
/*
 if (displayLayerTree   == 'block'){
        $("#panelLayerTree").css({"display":

    var displayLayerTree = $("#panelLayerTree").css('display')

    if (displayLayerTree   == 'block'){
    $("#panelLayerTree").css({"display": "none"});
        }
        else{
            $("#panelLayerTree").css({"display": "block"});
        }

   
*/


}

//Funciones para contraer las leyendas 
function contraerLeyendaLineaDeclaracion() {

var displayLeyendaLineaDeclaracion = $("#contenedorLeyendaLineaDeclaracion").css('display')
if (displayLeyendaLineaDeclaracion   == 'block'){
    $("#contenedorLeyendaLineaDeclaracion").css({"display": "none"});
}
else{
    $("#contenedorLeyendaLineaDeclaracion").css({"display": "block"});
}
}

/*
function saveCoordenate(crs){
    var crs = map.options.crs.code;
    console.log(crs)

    var coordenada = click.latlng;
        var latitud = coordenada.lat; // lat  es una propiedad de latlng
        var longitud = coordenada.lng; // lng también es una propiedad de latlng
    
		
    console.log(latitud);


}
*/
function imprimirMapaComoPDF() {
    // Obtener el elemento HTML del visor de mapas (ajusta el selector según tu estructura de página)
    const visorMapas = document.getElementById("map");
   // const visorMapas2 = document.getElementById("tituloPrincipal");
  
    // Opciones de configuración para html2pdf
    const opciones = {
      margin: 0.5,
      top:2,
      filename: 'mapaVisor.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // Habilitar el uso de CORS
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
  
    var txt = " texto"

     // Obtener el ancho y alto del visor
 // const visorAncho = visorMapas.offsetWidth;
 // const visorAlto = visorMapas.offsetHeight;
      // Obtener la URL de la imagen del visor
     // const imagenURL = canvas.toDataURL("image/png");
     // Agregar la imagen al PDF
     //pdf.addImage(imagenURL, "PNG", 0, 0, visorAncho, visorAlto);
    // Utilizar html2pdf para generar el archivo PDF
    html2pdf().from(visorMapas).set(opciones).save();
  }
  
// Ejecutar la función cuando se presione un botón o en cualquier otro evento deseado
document.getElementById("botonImprimirPDF").addEventListener("click", imprimirMapaComoPDF);




function realizarLlamadaAPI() {
    // Obtén los valores de usuario y contraseña
    var usuario = $("#usuario").val();
    var contrasena = $("#contrasena").val();
  
    // Define la URL de la API
    var apiUrl = "https://api.meteomatics.com/2023-09-03T00:00:00Z/t_2m:C/52.520551,13.461804/html";
  
    // Realiza la solicitud AJAX
    $.ajax({
        url: apiUrl,
        type: "POST", // o "GET" dependiendo de tu API
        data: {
            usuario: usuario,
            contrasena: contrasena
        },
        success: function (data) {
            // Manipula la respuesta de la API aquí
            $("#resultado").html("Respuesta de la API: " + data);
        },
        error: function (error) {
            // Maneja los errores aquí
            $("#resultado").html("Error en la solicitud: " + error.statusText);
        }
    });
  }