import { useState, useEffect } from "react";
function TopPanel(props) {
  // Manage scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;

    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Top Panel behaviour
  const base =
    "w-full py-2 px-2 sm:py-4 flex flex-col items-end sm:flex-row sm:justify-end sm:justify-between transition-all duration-300 ease-out z-10";
  const home = "bg-black/50 text-white";
  const inactive = "sm:bg-black/20 sm:text-white/20 sm:text-xs";
  const active =
    "sm:hover:text-base sm:hover:py-4 sm:hover:bg-black/50 sm:hover:text-white ";

  let styles = "";

  if (scrollPosition === 0) {
    styles = `${base} ${home}`;
  } else {
    styles = `${base} ${inactive} ${active}`;
  }

  return <div className={styles}>{props.children}</div>;
}

export default TopPanel;
