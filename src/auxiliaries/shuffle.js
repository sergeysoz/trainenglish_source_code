const getRandomInt = (max) => Math.floor(Math.random() * max);

/**
 * Durstenfeld's algorithm for shuffling array
 */

export default function shuffle(arrayToShuffle) {
  const resultArray = [...arrayToShuffle];
  let i = 0;
  let t, index;
  while (i != resultArray.length) {
    index = getRandomInt(resultArray.length);
    t = resultArray[i];
    resultArray[i] = resultArray[index];
    resultArray[index] = t;
    ++i;
  }
  return resultArray;
}
