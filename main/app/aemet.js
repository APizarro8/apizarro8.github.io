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
                  setInterval(horarios, 60 * 60 * 1000); // 60 minutos * 60 segundos * 1000 milisegundos
                    
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
  
  // Obtener datos meteorológicos
  obtenerDatosMeteorologicos(); //
  
  
  // Función para obtener el array desde el almacenamiento local
  function obtenerArrayDesdeLocalStorage() {
    const arrayGuardado = localStorage.getItem('arrayHorario_1');
    return arrayGuardado ? JSON.parse(arrayGuardado) : null;
  }
  