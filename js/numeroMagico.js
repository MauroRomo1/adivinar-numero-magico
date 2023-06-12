const startGame = document.getElementById("startGame");
const textWizard = document.getElementById("textWizard");
const containerBtnPlayGame = document.getElementById("containerBtnPlayGame");

let min = 1;
let max = 10;

const numRandom = (min, max) => {
  return Math.floor(Math.random() * (1 + max - min) + min);
};

const msgGame = (msg) => {
  if (msg === "Ganaste") {
    Swal.fire({
      title: "GANASTE!",
      text: "Veo que eres muy poderoso. PERO NO ME RENDIRE!",
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod/images/el-sen-or-de-los-anillos-gandalf-no-puedes-pasar-1554983768.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Gandalf derrotado",
      confirmButtonColor: "#198754",
    });
  } else {
    Swal.fire({
      title: "PERDISTE!",
      text: "No tienes tanta poder para ganarme",
      imageUrl: "https://media.tenor.com/lPjVxg0BXJ4AAAAC/gandalf-happy.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Gandalf riendo",
      confirmButtonColor: "#198754",
    });
  }
};

const verifyMaxMin = (inputValue) => {
  const msgError = document.getElementById("msgError");

  if (parseInt(inputValue.value) >= min && parseInt(inputValue.value) <= max) {
    return true;
  } else {
    msgError.classList.remove("d-none");
  }
};

const playGame = () => {
  const numWizard = numRandom(min, max);
  const inputUser = document.getElementById("inputUser");

  if (verifyMaxMin(inputUser)) {
    if (parseInt(inputUser.value) === numWizard) {
      msgGame("Ganaste");
    } else {
      msgGame("Perdiste");
    }
  }
  inputUser.addEventListener("focus", () => {
    inputUser.value = "";
    msgError.classList.add("d-none");
  });
};

const start = (min, max) => {
  const containerInputUser = document.getElementById("containerInputUser");

  textWizard.textContent = "¿Cual crees que es el número mágico?";

  containerInputUser.innerHTML =
    /* HTML */
    `<div class="col-12  col-lg-6 col-xl-3 mx-auto">
      <input
        class="form-control"
        id="inputUser"
        placeholder="El número es entre el ${min} y el ${max}"
        min="${min}"
        max="${max}"
        type="number"
      />
      <p class="text-warning d-none" id="msgError">
        <i class="fa-solid fa-triangle-exclamation"></i>
        Ingresa un numero valido.
      </p>
    </div>`;

  containerBtnPlayGame.innerHTML =
    /* HTML */
    `<button class="btn btn-success btnStart" id="btnAdivinar" type="button">
      Adivinar
      <i class="fa-solid fa-wand-sparkles fa-beat"></i>
    </button>`;

  const btnAdivinar = document.getElementById("btnAdivinar");
  btnAdivinar.addEventListener("click", () => {
    playGame();
  });
};

startGame.addEventListener("click", () => {
  startGame.setAttribute("disabled", "");
  startGame.innerHTML =
    /* HTML */
    `
      <span
        class="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Invocando número mágico...
    `;
  setTimeout(() => {
    start(min, max);
  }, 1000);
});
