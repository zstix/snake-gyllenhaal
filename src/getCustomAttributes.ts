import { Battlesnake, GameState } from "./types";

const encodeObject = (obj: any) =>
  Buffer.from(JSON.stringify(obj), "utf8").toString("base64");

const getSnakeData = ({ body, head, customizations }: Battlesnake) =>
  encodeObject({ body, head, color: customizations.color }).slice(0, 255);

const getCustomAttributes = ({ game, board, turn, you }: GameState) => {
  const opponents = board.snakes
    .filter((snake) => snake.id !== you.id)
    .reduce(
      (snakes, snake, i) => ({
        ...snakes,
        [`snakeOpponent_${i + 1}_Name`]: snake.name,
        [`snakeOpponent_${i + 1}_Id`]: snake.id,
        [`snakeOpponent_${i + 1}_Health`]: snake.health,
        [`snakeOpponent_${i + 1}_Length`]: snake.length,
        [`snakeOpponent_${i + 1}_Data`]: getSnakeData(snake),
      }),
      {}
    );

  return {
    snakeGameId: game.id,
    snakeRules: game.ruleset.name,
    snakeTurn: turn,

    snakeBoardHeight: board.height,
    snakeBoardWidth: board.width,
    snakeBoardFood: encodeObject(board.food),
    snakeBoardHazards: encodeObject(board.hazards),

    snakeName: you.name,
    snakeId: you.id,
    snakeHealth: you.health,
    snakeLength: you.length,
    snakeData: getSnakeData(you),

    ...opponents,
  };
};

export default getCustomAttributes;
