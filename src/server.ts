import express from "express";
import newrelic from "newrelic";
import { chooseMove } from "./snakeLogic";
import { GameState } from "./types";
import getCustomAttributes from "./getCustomAttributes";

const PORT = process.env.PORT || 8080;

const SNAKE_INFO = {
  apiversion: "1",
  author: "zstix",
  color: "#ff79c6",
  head: "pixel",
  tail: "block-bum",
};

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  console.log("INFO");
  res.send(SNAKE_INFO);
});

app.post("/start", (req, res) => {
  const state = req.body as GameState;
  console.log(`${state.game.id} START`);
  res.send("ok");
});

app.post("/move", (req, res) => {
  const state = req.body as GameState;
  newrelic.addCustomAttributes(getCustomAttributes(state));
  res.send({ move: chooseMove(state, true) });
});

app.post("/end", (req, res) => {
  const state = req.body as GameState;
  console.log(`${state.game.id} END`);
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Battlesnake server listening on port ${PORT}...`);
});
