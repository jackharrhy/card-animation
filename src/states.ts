import { action } from "./actions";
import type { State } from "./types";
import { forEachCard } from "./utils";
import state from "./state";

function stateChangeAfterDelay(delay: number, newState: State) {
  forEachCard((i) => {
    state.cards[i].state = newState;
  });
}

const swirlState: State = {
  init: () => {
    stateChangeAfterDelay(2000, states.swirl);
    forEachCard((i) => {
      action.center(1750);
    });
  },
  pos: (obj, i) => {
    if (!obj.consts.delay) {
      obj.obj.position.x +=
        Math.cos(state.frame / 50 - i / 1.2 + Math.random() / 10) / 20;
      obj.obj.position.y -=
        Math.sin(state.frame / 50 - i / 1.2 + Math.random() / 10) / 25;
      obj.obj.position.z += Math.sin(state.frame / 50 - i / 2) / 30;
    } else {
      obj.consts.delay -= 1;
      if (obj.consts.delay <= 0) {
        delete obj.consts.delay;
      }
    }
  },
  rot: (obj, i) => {
    if (!obj.consts.delay) {
      obj.obj.rotation.y += Math.cos(state.frame / 100 + i / 10) / 40;
      obj.obj.rotation.z += Math.cos(state.frame / 100 + i / 10) / 50;
      obj.obj.rotation.x += Math.cos(state.frame / 100 + i / 10) / 60;
    }
  },
};

const staticState: State = {
  init: () => {},
  pos: () => {},
  rot: () => {},
};

export const states = {
  swirl: swirlState,
  static: staticState,
};
