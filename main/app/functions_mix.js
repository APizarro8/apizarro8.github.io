

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


