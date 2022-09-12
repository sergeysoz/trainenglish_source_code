import React from "react";

export default function Map({
  data = [],
  renderItem = <></>,
  renderEmpty = <></>,
}) {
  return !data.length ? (
    renderEmpty
  ) : (
    <>
      {data.map((item, i = null) => (
        <div key={i.toString()}>{renderItem(item, i)}</div>
      ))}
    </>
  );
}
