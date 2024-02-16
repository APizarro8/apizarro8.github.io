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
  
    initTabApp(tabName);
  }
  
  

  // Abre la primera pestaña al cargar la página
  document.querySelector(".tablinks").click();
  
  function initAppMap(){
    window.onload = function () {
        // Cargar el mapa aquí
        callmisCapasWMTS();
        callmisCapasWMS();
        addControlsMap();

    };
    //Funcion que inicia la app después de haber cargado los dtos. 
  
  }

  function initAppRutas(){
    window.onload = function () {
        // Cargar el mapa aquí
       

    };
    //Funcion que inicia la app después de haber cargado los dtos. 
  
  }


  function initTabApp(tabName){

    switch (tabName) {
      case 'pagina1':
        console.log("entra en pagina 1");
        startCarousel();
          break;
      case 'pagina2':
        console.log("entra en pagina 2");
        setTimeout(function () {
          document.getElementById("loader").style.display = "none";
          initAppMap();
        // document.getElementById("content").style.display = "block";
        }, 2000);

          break;
      case 'pana3':
        console.log("entra en pagina 3");
        initAppRutas();
          break;
      case 'paga4':
        console.log("entra en pagina 4");
          break;
      case 'pina5':
        console.log("entra en pagina 5");
          break;
      case 'paga6':
        console.log("entra en pagina 6");
          break;
    }
  }