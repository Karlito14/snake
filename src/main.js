import './style.css';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const grid = 25;
const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];

const drawMap = () => {
  context.fillStyle = 'black';
  context.fillRect(0, 0, 800, 500);
};

const drawSnake = () => {
    context.fillStyle = 'green';
    for(let body of snake) {
        context.fillRect(body[0] * grid, body[1] * grid, grid, grid)
    }
}

drawMap();
drawSnake()
