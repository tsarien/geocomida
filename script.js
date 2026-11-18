// Geocomida · landing
(function () {
  "use strict";

  // Año en el pie de página
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Stickers: si existe la imagen generada (assets/doodles/*.png) se muestra;
  // si no existe, se queda el dibujo SVG.
  document.querySelectorAll(".sticker img").forEach(function (img) {
    var box = img.parentNode;
    function ok() { box.classList.add("has-img"); }
    function fail() { img.remove(); }

    if (img.complete) {
      img.naturalWidth > 0 ? ok() : fail();
    } else {
      img.addEventListener("load", ok, { once: true });
      img.addEventListener("error", fail, { once: true });
    }
  });

  // Aviso pequeño
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  // Botón compartir: usa el menú nativo del celular o copia el enlace
  var shareBtn = document.getElementById("share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var data = {
        title: "Geocomida",
        text: "Mira los videos de Geocomida: la geografía que te comes 🌎🍌🥔",
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(data).catch(function () { /* el usuario canceló */ });
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(data.url)
          .then(function () { showToast("¡Enlace copiado!"); })
          .catch(function () { showToast(data.url); });
      } else {
        showToast(data.url);
      }
    });
  }
})();
