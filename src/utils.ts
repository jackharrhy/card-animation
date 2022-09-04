import type { Vec3 } from "./types";

export function numToCard(i: number) {
  let suit;
  let toTake = 0;
  if (i < 13) {
    suit = "clubs";
  } else if (i < 26) {
    suit = "diamonds";
    toTake = 13;
  } else if (i < 39) {
    suit = "hearts";
    toTake = 26;
  } else {
    suit = "spades";
    toTake = 39;
  }

  return [suit, toTake] as [string, number];
}

export function vec3(x: number, y: number, z: number): Vec3 {
  return { x: x, y: y, z: z };
}

export function forEachCard(cb: (i: number) => void) {
  for (let i = 0; i < 52; i++) {
    cb(i);
  }
}

export function timeout(time: number, postFunction: () => void) {
  setTimeout(postFunction, time);
}
