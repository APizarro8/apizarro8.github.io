
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-img');
const modalWindows = document.querySelectorAll('.modal');
const modal = document.getElementById('myModal');
const modalImg = document.getElementById('modalImg')


const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
let currentIndex = 0;
let intervalId;

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

function showImage(index) {
    galleryImages.forEach((image, i) => {
          image.style.display = i === index ? 'block' : 'none';
      });

}

function nextImage() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage(currentIndex);
  }

  function startCarousel() {
      intervalId = setInterval(nextImage, 2000); // Cambia la imagen cada 2 segundos
  }

  function stopCarousel() {
      clearInterval(intervalId);
  }

  playBtn.addEventListener('click', startCarousel);
  stopBtn.addEventListener('click', stopCarousel);

  // Muestra la primera imagen al cargar la página
  showImage(currentIndex);
 




function redimensionarImagenes(galleryContainer, nuevoAncho, nuevoAlto, callback) {
    var contador = 0;
  
    function redimensionarImagen(imagen, canvas, contexto) {
      canvas.width = nuevoAncho;
      canvas.height = nuevoAlto;
      contexto.drawImage(imagen, 0, 0, nuevoAncho, nuevoAlto);
      contador++;
  
      if (contador === galleryContainer.length) {
        callback();
      }
    }
  
    galleryContainer.forEach(function (url) {
      var imagen = new Image();
      imagen.src = url;
  
      imagen.onload = function () {
        var canvas = document.createElement('canvas');
        var contexto = canvas.getContext('2d');
        redimensionarImagen(imagen, canvas, contexto);
      };
    });
  }
  
  // Uso de la función
  var nuevoAncho = 300; // Especifica el nuevo ancho deseado
  var nuevoAlto = 200; // Especifica el nuevo alto deseado
  
  redimensionarImagenes(galleryContainer, nuevoAncho, nuevoAlto, function () {
    console.log('Todas las imágenes han sido redimensionadas.');
    // Aquí puedes realizar acciones adicionales después de redimensionar todas las imágenes.
  });
  
