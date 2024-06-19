import './style.css';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const grid = 25;
const snake = [
  [11, 9],
  [10, 9],
  [9, 9],
];
const apple = [5, 5];
let direction = 'e';
let echec = false;
let speed = 1000;
let head;

const gameover = () => {
  if (head[0] > 31 || head[0] < 0 || head[1] > 19 || head[1] < 0) {
    echec = true;
  } else {
    const [head, ...body] = snake;
    for (let bodyElem of body) {
      if (head[0] === bodyElem[0] && head[1] === bodyElem[1]) {
        echec = true;
      }
    }
  }
};

const drawMap = () => {
  context.fillStyle = 'black';
  context.fillRect(0, 0, 800, 500);
};

const drawSnake = () => {
  context.fillStyle = 'green';
  for (let body of snake) {
    context.fillRect(body[0] * grid, body[1] * grid, grid, grid);
  }
};

const drawApple = () => {
  context.fillStyle = 'red';
  context.fillRect(apple[0] * grid, apple[1] * grid, grid, grid);
};

const updatePositionSnake = () => {
  switch (direction) {
    case 'e':
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    case 'o':
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    case 'n':
      head = [snake[0][0], snake[0][1] - 1];
      break;
    case 's':
      head = [snake[0][0], snake[0][1] + 1];
      break;
  }
  snake.unshift(head);
  snake.pop();
  gameover();
};

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight': {
      if (direction === 'n' || direction === 's') {
        direction = 'e';
      }
      break;
    }
    case 'ArrowLeft': {
      if (direction === 'n' || direction === 's') {
        direction = 'o';
      }
      break;
    }
    case 'ArrowDown': {
      if (direction === 'o' || direction === 'e') {
        direction = 's';
      }
      break;
    }
    case 'ArrowUp': {
      if (direction === 'o' || direction === 'e') {
        direction = 'n';
      }
      break;
    }
  }
});

const move = () => {
  updatePositionSnake();
  if (!echec) {
    drawMap();
    drawApple();
    drawSnake();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, speed);
  } else {
    alert('perdu');
  }
};

requestAnimationFrame(move);
