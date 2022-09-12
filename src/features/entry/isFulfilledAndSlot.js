export default function isFulfilledAndSlot(status, fetchedEntry) {
  if (
    (status === "fulfilled" || fetchedEntry.word) &&
    fetchedEntry?.noMatchedWord === undefined &&
    status !== "pending"
  )
    return true;
  if (
    (status === "rejected" || fetchedEntry.noMatchedWord) &&
    fetchedEntry?.word === undefined &&
    status !== "pending"
  )
    return false;
}
