

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


// Por defecto, abre la primera pestaña al cargar la página
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


  let currentImageIndex = 0;
        const galleryImages = document.querySelectorAll('.gallery-img');
        const modalWindows = document.querySelectorAll('.modal');
        const modal = document.getElementById('myModal');
        const modalImg = document.getElementById('modalImg')

  function changeImage(step) {
      currentImageIndex += step;
      if (currentImageIndex < 0) {
          currentImageIndex = galleryImages.length - 1;
      } else if (currentImageIndex >= galleryImages.length) {
          currentImageIndex = 0;
      }

      galleryImages.forEach((img, index) => {
          if (index === currentImageIndex) {
              img.style.display = 'block';
          } else {
              img.style.display = 'none';
          }
      });
  }



  // Función para rotar la imagen actual
function rotateImage() {
    const currentImage = modalWindows[currentImageIndex];
    currentImage.style.transform = `rotate(${(currentImage.dataset.rotation || 0) + 90}deg)`;
    currentImage.dataset.rotation = (parseInt(currentImage.dataset.rotation) || 0) + 90;
}


// Función para abrir la ventana modal
function openModal(img) {
  modal.style.display = 'block';
  modalImg.src = img.src;
}

// Función para cerrar la ventana modal
function closeModal() {
  modal.style.display = 'none';
}

// Mostrar la primera imagen al cargar la página
changeImage(0);

// Esta función se llama cuando el usuario selecciona una imagen para cargar
function addImage() {
  const input = document.getElementById('imageInput');
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      // Crea un nuevo elemento de imagen
      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = 'Imagen ' + (document.querySelectorAll('.gallery-img').length + 1);
      img.onclick = function() {
        openModal(this);
      };

      // Agrega la imagen a la galería
      const galleryContainer = document.getElementById('imgTejar');
      galleryContainer.appendChild(img);
    };

    reader.readAsDataURL(file);

    // Limpia el valor del input de carga para permitir múltiples cargas
    input.value = '';
  }
}



function obtenerDatosMeteorologicos() {
  // Definir la ubicación y la apiKey
  const ubicacion = '14016';
  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlc3BhY2lvQXp1ZWxAZ21haWwuY29tIiwianRpIjoiYzYxZjJmZjEtYTYyNS00NTc3LWFiYzYtZDcwMjEzMmQzMjFkIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2OTc0NzM4MjMsInVzZXJJZCI6ImM2MWYyZmYxLWE2MjUtNDU3Ny1hYmM2LWQ3MDIxMzJkMzIxZCIsInJvbGUiOiIifQ.W0_dCErCRJ3iG_jlGWfgYskzeDABYp1Udmc2zoUdqBg';

  // Construir la URL de la API
  const apiUrl = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/${ubicacion}?api_key=${apiKey}`;

  // Obtener la hora de los datos 
  var hoy = new Date();
  var hora = hoy.getHours() + ':' + hoy.getMinutes();
  
  // Realizar la llamada AJAX con XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl, true);

  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          // La respuesta se ha recibido correctamente
          const respuesta = JSON.parse(xhr.responseText);

          // Obtener la URL real de los datos horarios
          const urlDatosHorarios = respuesta.datos;

          // Hacer otra llamada para obtener los datos horarios
          const xhrDatosHorarios = new XMLHttpRequest();
          xhrDatosHorarios.open('GET', urlDatosHorarios, true);

          xhrDatosHorarios.onreadystatechange = function () {
              if (xhrDatosHorarios.readyState == 4 && xhrDatosHorarios.status == 200) {
                  // Los datos horarios se han recibido correctamente
                  const datosHorarios = JSON.parse(xhrDatosHorarios.responseText);
                  //console.log(datosHorarios);
                  // Array predicción
                  var datosPrediccion=  datosHorarios[0].prediccion
                  //console.log(datosPrediccion);

                  var datosPrediccionOcaso =  datosPrediccion.dia[0].ocaso
                  var datosPrediccionAmanecer =  datosPrediccion.dia[0].orto

                  const infoAemet = document.getElementById('infoAemet');
                  infoAemet.innerHTML = `
                        <p>Amanecer: ${datosPrediccionAmanecer} horas</p>
                        <p>Ocaso: ${datosPrediccionOcaso} horas</p>
                        `;

                  var datosPrediccionTemperatura=  datosPrediccion.dia[0].temperatura[0].value
                 // console.log(datosPrediccionTemperatura);

                  var datosPrediccionHumedad=  datosPrediccion.dia[0].humedadRelativa[0].value
                 // console.log(datosPrediccionHumedad);

                  var datosPrediccionProbPrecipitacion=  datosPrediccion.dia[0].probPrecipitacion[0].value
                 // console.log(datosPrediccionProbPrecipitacion);

                  var datosPrediccionProbTormenta=  datosPrediccion.dia[0].probTormenta[0].value
                 // console.log(datosPrediccionProbTormenta);

                  // Obtener la referencia de la tabla
                  const tabla = document.getElementById('tablaDatos');

           
                    // Llenar la tabla con los datos
                  const tbody = tabla.querySelector('tbody');
 
                  // Para contruir las filas de los datos
                  const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <th>${hora}</th>
                        <th>${datosPrediccionTemperatura}</th>
                        <th>${datosPrediccionHumedad}</th>
                        <th>${datosPrediccionProbPrecipitacion}</th>
                        <th>${datosPrediccionProbTormenta}</th>
                    `;
                    tbody.appendChild(fila);


                  //
                  
                // Array para almacenar las variables cada 60 minutos
                let arrayHorario_1 = obtenerArrayDesdeLocalStorage() || [];

                // Función para guardar las variables en el array
                
                  // Agregar las variables al array
                  var horarios = arrayHorario_1.push({
                    Hora: hora,
                    HumedadRelativa:datosPrediccionHumedad,
                    Temperatura: datosPrediccionTemperatura,
                    ProbPrecipitacion: datosPrediccionProbPrecipitacion,
                    ProbTormenta: datosPrediccionProbTormenta
                  });

                   // Guardar el array en el almacenamiento local
                  localStorage.setItem('arrayHorario_1', JSON.stringify(arrayHorario_1));

                  // Puedes imprimir el array si lo deseas
                  console.log(arrayHorario_1);
                

                // Configurar la ejecución de la función cada 1 minuto
                //setInterval(horarios, 60 * 1000); // 1 minuto * 60 segundos * 1000 milisegundos
                // Configurar la ejecución de la función cada 60 minutos
                //setInterval(horarios, 60 * 60 * 1000); // 60 minutos * 60 segundos * 1000 milisegundos
                  
                // Obtener el array desde el almacenamiento local
                const arrayHorario = JSON.parse(localStorage.getItem('arrayHorario_1')) || [];

                // Extraer los valores de las variables para el gráfico
                const labels = arrayHorario.map(entry => entry.Hora); 
                const dataTemperatura = arrayHorario.map(entry => entry.Temperatura); 
                const dataHumedadRelativa = arrayHorario.map(entry => entry.HumedadRelativa); 
                const dataProbPrecipitacion = arrayHorario.map(entry => entry.ProbPrecipitacion); 

                // Configurar el contexto del lienzo del gráfico
                  const ctx = document.getElementById('graficoPredicciones').getContext('2d');

                
                  // Crear el gráfico
                  const grafico = new Chart(ctx, {
                      type: 'line',
                      data: {
                          labels: labels,
                          datasets: [
                              {
                                  label: 'Temperatura (ºC)',
                                  data: dataTemperatura,
                                  borderColor: 'rgb(255, 99, 132)',
                                  borderWidth: 2,
                                  fill: false,
                              },
                              {
                                  label: 'Humedad (%)',
                                  data: dataHumedadRelativa,
                                  borderColor: '#04962E',
                                  borderWidth: 2,
                                  fill: false,
                              },
                              {
                                  label: 'Probabilidad de Precipitacion (%)',
                                  data: dataProbPrecipitacion,
                                  borderColor: 'rgb(75, 192, 192)',
                                  borderWidth: 2,
                                  fill: false,
                              },
                              {
                                  label: 'Probabilidad de tormenta(%)',
                                  data: datosPrediccionProbTormenta,
                                  borderColor: '#96048D',
                                  borderWidth: 2,
                                  fill: false,
                            },
                          ],
                      },
                      options: {
                          scales: {
                              x: {
                                  type: 'category',
                                  title: {
                                      display: true,
                                      text: 'Hora',
                                  },
                              },
                              y: {
                                  title: {
                                      display: true,
                                      text: 'Valor',
                                  },
                              },
                          },
                      },
                  });

                            }
                        };

                        xhrDatosHorarios.send();

                    }
                };
// Enviar la primera solicitud
xhr.send();
}

// Llama a la función para obtener datos meteorológicos para una ubicación específica
obtenerDatosMeteorologicos(); // código de municipio de tu ubicación deseada


// Función para obtener el array desde el almacenamiento local
function obtenerArrayDesdeLocalStorage() {
  const arrayGuardado = localStorage.getItem('arrayHorario_1');
  return arrayGuardado ? JSON.parse(arrayGuardado) : null;
}


