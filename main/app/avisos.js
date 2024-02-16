/*
function mostrarAviso(gravedad, mensaje) {
  var avisoPanel = document.getElementById("aviso-panel");
  var avisoTexto = document.getElementById("aviso-texto");

  avisoTexto.innerText = mensaje;

  // Removemos las clases existentes
  avisoPanel.className = "aviso";

  // Añadimos la clase de acuerdo a la gravedad
  switch (gravedad) {
    case "negro":
      avisoPanel.classList.add("aviso-negro");
      break;
    case "verde":
      avisoPanel.classList.add("aviso-verde");
      break;
    case "amarillo":
      avisoPanel.classList.add("aviso-amarillo");
      break;
    case "rojo":
      avisoPanel.classList.add("aviso-naranja");
      break;
    default:
      break;
  }

  avisoPanel.style.display = "block";
}

function cerrarAviso() {
  var avisoPanel = document.getElementById("aviso-panel");
  avisoPanel.style.display = "none";
}

// Ejemplo de uso:
// mostrarAviso("verde", "Este es un aviso de gravedad verde.");
*/