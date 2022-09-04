import type { Object } from "./types";

class State {
  cards: Object[] = [];
  frame: number = -1;
}

export default new State();
