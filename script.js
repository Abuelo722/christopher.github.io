// Permite elegir un modo visual y recordar la selección.
const botonesDeporte = document.querySelectorAll(".boton-deporte");
const modosDisponibles = ["futbol", "f1"];
const clavePreferencia = "modo-visual-christopher";

// Lee la selección guardada sin impedir que la página funcione si falla el almacenamiento.
function leerModoGuardado() {
  try {
    const modoGuardado = localStorage.getItem(clavePreferencia);
    return modosDisponibles.includes(modoGuardado) ? modoGuardado : "";
  } catch {
    return "";
  }
}

// Aplica un modo y actualiza el estado accesible de ambos botones.
function aplicarModo(modo) {
  document.body.classList.toggle("modo-futbol", modo === "futbol");
  document.body.classList.toggle("modo-f1", modo === "f1");

  botonesDeporte.forEach((boton) => {
    boton.setAttribute("aria-pressed", String(boton.dataset.modo === modo));
  });
}

// Inicia la página con el último modo elegido.
let modoActual = leerModoGuardado();
aplicarModo(modoActual);

// Al volver a pulsar el modo activo, se restaura el aspecto original.
botonesDeporte.forEach((boton) => {
  boton.addEventListener("click", () => {
    modoActual = modoActual === boton.dataset.modo ? "" : boton.dataset.modo;
    aplicarModo(modoActual);

    try {
      if (modoActual) {
        localStorage.setItem(clavePreferencia, modoActual);
      } else {
        localStorage.removeItem(clavePreferencia);
      }
    } catch {
      // El modo seguirá funcionando durante esta visita.
    }
  });
});