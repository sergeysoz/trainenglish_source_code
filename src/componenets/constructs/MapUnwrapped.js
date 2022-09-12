import React from "react";

export default function MapUnwrapped({
  data = [],
  renderItem = <></>,
  renderEmpty = <></>,
}) {
  return !data.length ? (
    renderEmpty
  ) : (
    <>{data.map((item, i) => renderItem(item, i))}</>
  );
}
