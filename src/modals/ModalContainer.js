import { useState, useEffect } from "react";
// Icons
import { ReactComponent as CloseIcon } from "../icons/close-icon.svg";

function CloseButton(props) {
  return (
    <div className="flex justify-end p-2">
      <button
        onClick={props.handleCloseModal}
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

function ModalContainer(props) {
  const basicStyles = "fixed left-0 top-0 right-0 bottom-0 overflow-auto z-50 h-full bg-black/60 md:inset-0 transition-all duration-300 ease-in-out"
  const hiddenStyle = "mt-[-250px]";
  const showStyle = "mt-0";
  const [styles, setStyles] = useState(`${basicStyles} ${hiddenStyle}`);

  const applyAnim = () => {
    setStyles(`${basicStyles} ${showStyle}`)
  }

  // Apply anim style
  useEffect(() => {
    applyAnim();
  }, [])

  // Hide body scrollbar
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Hide modal if user click outside
  const handleOutsideClick = (e) => {
    const target = e.target;

    if (target.id === "modal-container") {
      props.handleCloseModal();
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
    // Modal container
    <div
      id="modal-container"
      className={styles}
    >
      {/* Modal content */}
      <div className="relative bg-white rounded-lg my-24 mx-auto shadow w-fit dark:bg-gray-700">
        {/* Close button */}
        <CloseButton handleCloseModal={props.handleCloseModal} />
        {props.children}
      </div>
    </div>
  );
}

export default ModalContainer;
