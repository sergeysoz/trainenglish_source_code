import getRandomInt from "../../auxiliaries/random";

export default function cleaner(phonetics) {
  let result = [];
  for (let item of phonetics) {
    if (
      !item.text ||
      item.text === undefined ||
      item.text === null ||
      item?.text === undefined
    )
      continue;
    result = [...result, item.text];
  }
  return result[getRandomInt(result.length - 1)];
}
