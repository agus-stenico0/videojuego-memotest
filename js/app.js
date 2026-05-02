// 1. LA BASE DE DATOS (El Array de Cartas). Son pares.
const cartas = [
  { id: 1, icono: "🍎" },
  { id: 2, icono: "🍎" },
  { id: 3, icono: "🍌" },
  { id: 4, icono: "🍌" },
  { id: 5, icono: "🍇" },
  { id: 6, icono: "🍇" },
  { id: 7, icono: "🍉" },
  { id: 8, icono: "🍉" },
];

// 2. EL ALGORITMO SHUFFLE (Para mezclar las cartas al azar)
// Este es un truco matemático hermoso para mezclar Arrays en JS
cartas.sort(() => 0.5 - Math.random());

// 3. ATRAPAMOS EL TABLERO DEL HTML
const tablero = document.querySelector("#tablero");
let cartasElegidas = [];

// 4. LA FÁBRICA (Dibujar las cartas en el DOM)
function crearTablero() {
  // Usamos un forEach para recorrer el array mezclado
  cartas.forEach((carta) => {
    // Creamos un <div> en el aire (RAM)
    const div = document.createElement("div");
    div.classList.add("carta");
    // Le guardamos el índice y el ícono en secreto (Data Attributes)
    div.setAttribute("data-id", carta.id);
    div.setAttribute("data-icono", carta.icono);

    // Le agregamos el evento CLICK
    div.addEventListener("click", voltearCarta);
    div.textContent = "❓";
    // Lo inyectamos en el HTML real
    tablero.appendChild(div);
  })
  
}

// 5. LA LÓGICA DE JUEGO
function voltearCarta(evento) {
  // evento.target es literalmente el <div> exacto que el usuario tocó
  const cartaClickeada = evento.target;

  // Ahora le pedimos los datos a esa carta específica
  let cartaId = cartaClickeada.getAttribute("data-id");
  let icono = cartaClickeada.getAttribute("data-icono");

  // Mostramos el emoji y le agregamos la clase
  cartaClickeada.textContent = icono;
  cartaClickeada.classList.add("volteada");

  // Guardamos la carta en nuestro array temporal
  cartasElegidas.push({
    id: cartaId,
    elemento: cartaClickeada,
    icono: icono,
  });

  // Si ya tocó 2 cartas, verificamos si son iguales
  if (cartasElegidas.length === 2) {
    setTimeout(verificarPareja, 500);
  }
}

function verificarPareja() {
  const carta1 = cartasElegidas[0];
  const carta2 = cartasElegidas[1];

  // Condición de victoria de ese turno
  if (carta1.icono === carta2.icono && carta1.id !== carta2.id) {
    // Son iguales: las dejamos destapadas o las ponemos en verde
    carta1.elemento.classList.add("resuelta");
    carta2.elemento.classList.add("resuelta");
  } else {
    // Se equivocó: las volvemos a dar vuelta
    carta1.elemento.textContent = "";
    carta2.elemento.textContent = "";
    carta1.elemento.classList.remove("volteada");
    carta2.elemento.classList.remove("volteada");
  }

  // Limpiamos el array temporal para el próximo turno
  cartasElegidas = [];
}

// ¡ARRANCAMOS EL JUEGO!
crearTablero();
