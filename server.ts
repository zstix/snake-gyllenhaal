import express from 'express';
import { GameState } from './types';

const PORT = process.env.PORT || 8080;

const SNAKE_INFO = {
  apiversion: "1",
  author: "zstix",
  color: "#ff79c6",
  head: "fang",
  tail: "default"
};

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  console.log('INFO');
  res.send(SNAKE_INFO)
});

app.get("/start", (req, res) => {
  const state = req.body as GameState;
  console.log(`${state.game.id} START`)
  res.send("ok");
});

app.get("/move", (req, res) => {
  // TODO
  res.send({ move: 'down' });
});

app.get("/end", (req, res) => {
  const state = req.body as GameState;
  console.log(`${state.game.id} END`);
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Battlesnake server listening on port ${PORT}...`);
})