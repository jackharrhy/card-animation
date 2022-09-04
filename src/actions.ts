import { transformObj } from "./transformObj";
import { forEachCard, vec3 } from "./utils";
import state from "./state";

export const action = {
  center: (time: number) => {
    forEachCard((i) => {
      transformObj(
        state.cards[i],
        vec3(0, 0, i / 52),
        time - 250,
        vec3(0, 0, 0),
        time
      );
    });
  },
  spread: (time: number) => {
    forEachCard((i) => {
      transformObj(
        state.cards[i],
        vec3(i / 7 - 3.5, Math.sin(i / (26 / Math.PI)), i / 52),
        time,
        vec3(0, 0, Math.PI / 1.5 + i / 24.8407),
        time - 500
      );
    });
  },
};
