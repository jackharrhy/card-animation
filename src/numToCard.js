export default function numToCard(i) {
  var suit;
  var toTake = 0;
  if(i < 13) {
    suit = 'clubs';
  } else if(i < 26) {
    suit = 'diamonds';
    toTake = 13;
  } else if(i < 39) {
    suit = 'hearts';
    toTake = 26;
  } else {
    suit = 'spades';
    toTake = 39;
  }

  return [suit, toTake];
}

