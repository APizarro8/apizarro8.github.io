

function agregarId() {
    // Obtener el elemento por su ID actual
    var elemento = document.getElementById("game-panel-buttons");
  
    // Verificar si el elemento existe
    if (elemento) {
      // Agregar un nuevo ID al elemento
      elemento.id += " nuevoId";
  
      // Actualizar el contenido del elemento (solo para demostración)
      elemento.innerHTML = "Contenido actualizado con nuevo ID: " + elemento.id;
    } else {
      console.error("El elemento no fue encontrado");
    }
  }