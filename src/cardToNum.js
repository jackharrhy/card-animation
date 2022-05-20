export default function cardToNum(suit, num) {
  let toAdd = 0;
  if (suit === "diamonds") {
    toAdd = 13;
  } else if (suit === "hearts") {
    toAdd = 26;
  } else if (suit === "spades") {
    toAdd = 39;
  }

  return toAdd + parseInt(num);
}
