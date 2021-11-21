let order = [];
let clickedOrder = [];

//Inicializar score
let score = 0;
document.querySelector("#points").innerHTML = score;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

// Criando ordem aleatório
const shuffleOrder = async () => {
  // console.log("3 shuffle");

  let colorOrder = Math.floor(Math.random() * 3);
  order[order.length] = colorOrder;
  clickedOrder = [];
  console.log("array certo " + order);

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    await lightColor(elementColor);
  }
};

// Acende a próxima cor
const lightColor = async (element) => {
  // console.log("4 lightColor");

  const colorPicked = await element;

  await light(colorPicked);
};

const light = async (color) => {
  // console.log("5 light");

  await timeout(300);
  color.classList.add("selected");
  await timeout(600);
  color.classList.remove("selected");
  await timeout(400);
};

// Função para aguardar tempo
const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

// Checa se os botões clicados são os mesmo da ordem gerada no jogo
const checkOrder = async () => {
  // console.log("8 checkorder");
  console.log("ordem clicada " + clickedOrder);

  for await (let i of clickedOrder) {
    const indexOfClicked = clickedOrder.indexOf(i);
    console.log("i " + indexOfClicked);
    console.log("clicado " + clickedOrder[i]);
    console.log(order[i]);
    if (i != undefined) {
      if (clickedOrder[i] != order[indexOfClicked]) {
        // console.log("jogada errada");
        gameOver();
      }
      if (clickedOrder.length == order.length) {
        // console.log("passou na chegagem");
        console.log("entrou aqui");
        nextLevel();
      }
    }
  }
};

// Função para o clique do usuário
const click = async (color) => {
  // console.log("7 click");

  clickedOrder[clickedOrder.length] = color;
  const colorSelected = createColorElement(color);

  colorSelected.classList.add("selected");
  await timeout(300);

  colorSelected.classList.remove("selected");
  await timeout(100);

  checkOrder();
};

// Função que retorna a cor
const createColorElement = (color) => {
  // console.log("6 createcolorelement");
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

// Função para próximo nível do jogo
const nextLevel = async () => {
  // console.log("2 nextlevel");

  score++;
  document.querySelector("#points").innerHTML = score - 1;
  await shuffleOrder();
};

// Função para game over
const gameOver = () => {
  // console.log("9 gameover");

  alert(
    `Pontuação ${
      score - 1
    }!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`
  );
  order = [];
  clickedOrder = [];
  document.querySelector("#points").innerHTML = 0;
};

// Funação para iniciar jogo
const playGame = async () => {
  // console.log("1 playgame");
  order = [];
  clickedOrder = [];
  score = 0;
  document.querySelector("#points").innerHTML = score;
  await timeout(500);
  await nextLevel();
};

// Eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// Eventos de clique nos botões
const start = document.querySelector("#start");
const restart = document.querySelector("#restart");

start.onclick = () => playGame();
restart.onclick = () => playGame();
