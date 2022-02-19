import { useState, useEffect } from "react";

function Checkbox(props) {
  const [checked, setChecked] = useState(false);
  // Styles
  const basicStyles =
    "absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out";
  const uncheckedStyle = "bg-white";
  const checkedStyle = "bg-purple-600 transform translate-x-full";
  const [styles, setStyles] = useState("");

  useEffect(() => {
    // If props.checked is provided, set value to state
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  const handleChecked = (e) => {
    // Only active if click inside checkbox container
    setChecked(!checked);
  };

  // Toggle active/deactive style
  const toggleStyles = () => {
    if (checked) {
      setStyles(`${basicStyles} ${checkedStyle}`);
    } else setStyles(`${basicStyles} ${uncheckedStyle}`);
  };

  useEffect(() => {
    // Apply styles after user clicked
    toggleStyles();
  }, [checked]);

  return (
    <div className="flex flex-col">
      <label
        htmlFor={props.id}
        className="inline-flex items-center justify-between mt-3"
      >
        <span className={props.text.style}>{props.text.text}</span>
        {/* Checkbox container */}
        <span className="relative cursor-pointer">
          <span className="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
          <span className={`${styles}`}>
            <input
              id={props.id}
              type="checkbox"
              checked={checked}
              onChange={handleChecked}
              className="absolute w-0 h-0 bg-green-600 opacity-0"
            />
          </span>
        </span>
      </label>
    </div>
  );
}

export default Checkbox;
