
// Funcion generica para el la fecha y la hora
function dateAndtime(){
  // Funcion que te da el dia y la hora actual
  var today = new Date();
  
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  options.timeZone = 'UTC';
  options.timeZoneName = 'short';
  
  var now = today.toLocaleString('es-ES', options);
  now.toUpperCase();
  console.log(now);

      
  var hoy = new Date();
      
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

  dateHora = now.toString();

  document.getElementById("barraTopFecha").innerHTML = dateHora;	
  document.getElementById("styloFecha").innerHTML = hora;	


}

dateAndtime(); 

// abre cada una de las peñanas, activando la primera
function openTab(tabName) {
  var i, tabcontent, tablinks;
  
  // Oculta todos los elementos con la clase "tabcontent"
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  
  // Desactiva la clase "active" de todos los elementos con la clase "tablinks"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
  }
  
  // Muestra el contenido de la pestaña actual y agrega la clase "active" al botón de la pestaña
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");
}


// Abre la primera pestaña al cargar la página
document.querySelector(".tablinks").click();

function descargarArchivo(nombreArchivo) {
  // Crear un enlace de descarga oculto
  var enlaceDescarga = document.createElement("a");
  enlaceDescarga.href = nombreArchivo;
  enlaceDescarga.download = nombreArchivo;
  enlaceDescarga.style.display = "none";

  // Agregar el enlace de descarga al cuerpo del documento
  document.body.appendChild(enlaceDescarga);

  // Simular el clic en el enlace de descarga
  enlaceDescarga.click();

  // Eliminar el enlace de descarga después de la descarga
  document.body.removeChild(enlaceDescarga);
}


// FUNCIÓN JAVASCRIPT
 // Esta función se encargará de ajustar el tamaño de fuente del párrafo en función del ancho de la pantalla.
 function adjustFontSize() {
  // Se obtiene el ancho de la pantalla utilizando window.innerWidth.
  // Esto nos da la cantidad de píxeles disponibles horizontalmente en la ventana del navegador.
  const screenWidth = window.innerWidth;
  // baseFontSize es (por ejemplo) el tamaño de fuente base que hemos definido en el estilo p (30px).
  const baseFontSize = 30;
  // scaleFactor es un valor arbitrario que determina cuánto cambiará el tamaño de fuente en relación
  // con el ancho de la pantalla.
  // En este caso, se utiliza un scaleFactor de 2, lo que significa que el tamaño de fuente se
  // incrementará en 2 píxeles por cada 100 píxeles de ancho de pantalla.
  const scaleFactor = 2;
  // Se calcula el nuevo tamaño de fuente (newSize) agregando baseFontSize al resultado de
  // (screenWidth / 100) * scaleFactor.
  // Esto significa que el nuevo tamaño de fuente será el tamaño base más un aumento proporcional
  // al ancho de la pantalla.
  const newSize = baseFontSize + (screenWidth / 100) * scaleFactor;
  // Se obtiene el elemento del párrafo
  const responsiveText = document.getElementById('styloTitle');
  // Se establece el tamaño de fuente
  styloTitle.style.fontSize = `${newSize}px`;
  }

  // Se añade un evento resize a la ventana.
  // Esto significa que cada vez que el usuario redimensiona la ventana del navegador, se ejecutará
  // la función adjustFontSize() para ajustar el tamaño del texto en consecuencia.
  window.addEventListener('resize', adjustFontSize);
  // Llamamos a la función adjustFontSize() una vez al cargar la página, para ajustar el tamaño
  //del texto inicialmente.
  adjustFontSize(); 


function enviarMensaje() {
// Configurar Email.js con tu clave pública
emailjs.init('l1VQlotcJGYXrK-6w');

  // Obtener los valores de los campos
  var nombre = document.getElementById('name').value;
  var mensaje = document.getElementById('message').value;

  // Simplemente imprimimos los valores en la consola para este ejemplo
  console.log('Nombre:', nombre);
  console.log('Mensaje:', mensaje);

  // Aquí podrías agregar la lógica para enviar el mensaje por correo
  // Puedes usar servicios como Email.js o integrar con tu propio backend para enviar correos

  
  // Configuración de Email.js
  var serviceID = 'espacioazuel@gmail.com';
  var templateID = 'template_gcitfjk';
  var userID = 'Alicia';

  // Configurar el mensaje
  var templateParams = {
      nombre: nombre,
      mensaje: mensaje
  };

  // Enviar el correo usando Email.js
  emailjs.send(serviceID, templateID, templateParams, userID)
      .then(function(response) {
          console.log('Correo enviado con éxito:', response);
      }, function(error) {
          console.log('Error al enviar el correo:', error);
      });

  // Reiniciar los campos después de enviar
  document.getElementById('name').value = '';
  document.getElementById('message').value = '';

}
