import { useState, useEffect } from "react";
// Icons
import { ReactComponent as SampleUser } from "../icons/sampleUser.svg";

function DropdownButton(props) {
  return (
    <button
      onClick={props.handleClick}
      className="block w-full px-4 py-2 text-left text-gray-900 rounded transition-colors duration-200 text-normal hover:bg-purple-500 hover:text-white"
    >
      {props.text}
    </button>
  );
}

function DropdownBody(props) {
  const styles = `absolute right-0 w-40 min-h-[2rem] mt-2 bg-white border rounded shadow-xl z-10`;

  const buttons = props.buttons?.map((button, i) => {
    // Call parent provided function
    // and user provided function
    const handleClick = () => {
      props.handleClick();
      button.handleClick();
    };

    return (
      <DropdownButton key={i} handleClick={handleClick} text={button.text} />
    );
  });

  return <div className={`${props.toggleShow} ${styles}`}>{buttons}</div>;
}

function UserLogo(props) {
  return (
    <button
      onClick={props.handleClick}
      className="block w-10 h-10 overflow-hidden rounded-full focus:outline-none"
    >
      <img
        className="object-cover w-full h-full"
        src="https://eu.ui-avatars.com/api/?name=John&size=1000"
        alt="avatar"
      />
    </button>
  );
}

function UserOptions(props) {
  const [show, setShow] = useState("hidden");

  // Show/hide dropdown menu
  const handleClickToggle = (e) => {
    if (show === "hidden") {
      setShow("");
    } else setShow("hidden");
  };

  // Hide dropdown if user click outside
  // dropdown or user icon
  const handleOutsideClick = (e) => {
    const target = e.target.closest("#user-container");

    if (!target) {
      setShow("hidden");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    // Unmount listener
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div id="user-container" className="relative">
      <UserLogo handleClick={handleClickToggle} />
      <DropdownBody
        buttons={props.buttons}
        handleClick={handleClickToggle}
        toggleShow={show}
      />
    </div>
  );
}

export default UserOptions;
