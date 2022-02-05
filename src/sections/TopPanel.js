import { useState } from "react";

function TopPanel(props) {
  // Top Panel behaviour
  const styles =
    "w-full bg-zinc-900 text-white p-2 flex items-center justify-between";

  return <div className={styles}>{props.children}</div>;
}

export default TopPanel;
