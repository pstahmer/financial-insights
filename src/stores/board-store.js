import { boardSize } from '../config/constants';
import { board } from "../config/initial";

var components = [];

const createTower = (row, col) => {
  if (!board[row][col].isPath) {
    board[row][col].tower = {
      type: "normal"
    };

    updateComponents();
  }
};

// todo: move timer to action or something
const enemies = [{col: 1, row: 0, hp: 10}];
board[0][1].enemy = { status: "EXIT"};

const moveEnemies = () => {
  enemies.forEach((e) => {
    board[e.row][e.col].enemy = null;
    var enterDirection = null;

    switch(board[e.row][e.col].exit) {
      case "DOWN":
        enterDirection = "UP"
        e.row++;
        break;
      case "UP":
        enterDirection = "DOWN"
        e.row--;
        break;
      case "LEFT":
        enterDirection = "RIGHT"
        e.col--;
        break;
      case "RIGHT":
        enterDirection = "LEFT"
        e.col++;
        break;
    }

    if (e.row === boardSize || e.col === boardSize) {
      const index = enemies.indexOf(e);
      enemies.splice(index, 1);
      e = null;
    }

    if (e) {
      e.enterDirection = enterDirection,
      e.exitDirection = board[e.row][e.col].exit
      e.status = "ENTER";
      board[e.row][e.col].enemy = e;
    }
  });

  updateComponents();
  setTimeout(clearEnemyStatuses, 5);
  setTimeout(flipEnemies, MOVEMENT_INTERVAL/2);
}

const clearEnemyStatuses = () => {
  enemies.forEach((e) => {
    e.status = null;
  })
  updateComponents();
};

const flipEnemies = () => {
  enemies.forEach((e) => {
    e.status = !e.status ? "EXIT" : "ENTER";
  })
  updateComponents();
}

const MOVEMENT_INTERVAL = 1000;
const enemyTimer = setInterval(moveEnemies, MOVEMENT_INTERVAL);

// todo: extract these to a store generator, have generator import all stores,
// run all these kinds of things to separate the concerns
const registerComponent = (component) => {
  components.push(component);
};
const unregisterComponent = (component) => {
  const index = components.indexOf(component);
  components.splice(index, 1);
};

const updateComponents = () => {
  components.forEach((c) => c.update({board}));
}

export { board, createTower, registerComponent, unregisterComponent, updateComponents };
