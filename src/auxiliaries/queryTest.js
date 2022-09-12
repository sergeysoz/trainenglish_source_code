const re = /[\\\/\<\>\,\.\:\;\?\~\`\'\"\!\@\#\$\%\^\&\*\(\)\[\]\_\+\=\{\}0-9]/g;
export default function queryTest(query) {
  if (query.toString().match(re) && query.toString().match(re).length)
    return true;
  return false;
}
